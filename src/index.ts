import * as path from 'path';
import {
  Stack,
  aws_ec2 as ec2,
  aws_rds as rds,
  aws_iam as iam,
  aws_lambda as lambda,
  aws_elasticloadbalancingv2 as elbv2,
  aws_sns as sns,
  aws_sns_subscriptions as sns_subscriptions,
  aws_events_targets as targets,
  custom_resources as cr,
  TagManager,
  TagType,
  Duration,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';


export enum CommonDBPorts {
  MSSQL = 1433,
  MYSQL = 3306,
  POSTGRES = 5432,
}

export interface DbFailureTopicProps extends sns.TopicProps {
  /**
   * The RDS database to monitor for failure events.
   */
  readonly db: rds.IDatabaseInstance;
}

/**
 * Creates an SNS topic subscribed to the RDS database for
 * failure events.
 */
export class DbFailureTopic extends sns.Topic {
  constructor(scope: Construct, id: string, props: DbFailureTopicProps) {
    super(scope, id, { ...props });

    props.db.onEvent('rdsPrivateLinkDatabaseFailureEvent', {
      target: new targets.SnsTopic(this, {}),
      eventPattern: {
        detail: {
          EventCategories: ['failover', 'failure'],
        },
      },
    });
  }
}

export interface RdsPrivateLinkProps {
  /**
   * The RDS database endpoint address to connect to.
   */
  readonly db: rds.IDatabaseInstance;
  /**
   * The port of the database instance to connect to.
   */
  readonly dbPort: number | CommonDBPorts;
  /**
   * The VPC to create the endpoint in.
   */
  readonly vpc: ec2.IVpc;
  /**
   * The VPC subnets to create the endpoint in.
   */
  readonly vpcSubnets: ec2.SubnetSelection;
  /**
   * Whether requests from the service consumers to
   * connect to the service through an endpoint must be
   * accepted.
   *
   * @default true
   */
  readonly acceptanceRequired?: boolean;
  /**
   * IAM users, IAM roles, or AWS accounts to allow
   * inbound connections from.
   *
   * @default - no connections allowed
   */
  readonly allowedPrincipals?: iam.ArnPrincipal[];
  /**
   * The SNS topic used by the DB to notify
   * of failure events.
   *
   * You can use the `DbFailureTopic` construct to create
   * this topic.
   */
  readonly dbFailureTopic: sns.ITopic;
  /**
   * Handler name for working with Lambda extensions that
   * require a specific handler. Such as Sentry.
   *
   * Should only be used if you know exactly what you are doing.
   */
  readonly lambdaHandlerName?: string;
}

export class RdsPrivateLink extends Construct {
  public readonly tags: TagManager = new TagManager(TagType.KEY_VALUE, 'Custom');
  /**
   * The NLB created to front the RDS private link.
   */
  public readonly nlb: elbv2.NetworkLoadBalancer;
  /**
   * The target group created to register the RDS DB.
   */
  public readonly targetGroup: elbv2.NetworkTargetGroup;
  /**
   * The Lambda function created to manage the NLB.
   */
  public readonly nlbManagementLambda: lambda.Function;
  /**
   * The Lambda role created to manage the NLB.
   */
  public readonly nlbManagementLambdaRole: iam.Role;
  /**
   * The underlying VPC Endpoint Service created.
   */
  public readonly vpcEndpointService: ec2.VpcEndpointService;

  constructor(scope: Construct, id: string, props: RdsPrivateLinkProps) {
    super(scope, id);

    this.nlb = new elbv2.NetworkLoadBalancer(this, 'rdsPrivateLinkNlb', {
      vpc: props.vpc,
      internetFacing: false,
      crossZoneEnabled: true,
      vpcSubnets: props.vpcSubnets,
    });

    this.targetGroup = new elbv2.NetworkTargetGroup(this, 'rdsPrivateLinkTargetGroup', {
      vpc: props.vpc,
      port: props.dbPort,
      protocol: elbv2.Protocol.TCP,
      targetType: elbv2.TargetType.IP,
      healthCheck: {
        interval: Duration.seconds(10),
        port: props.dbPort.toString(),
        protocol: elbv2.Protocol.TCP,
        healthyThresholdCount: 3,
        timeout: Duration.seconds(10),
      },
      deregistrationDelay: Duration.seconds(0),
    });

    this.nlbManagementLambdaRole = new iam.Role(this, 'nlbManagementLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        new iam.ManagedPolicy(this, 'rdsPrivateLinkNlbManagementPolicy', {
          description: 'Allows management of NLB for RDS private link setup',
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              sid: 'DescribeTargetHealth',
              actions: [
                'elasticloadbalancing:DescribeTargetHealth',
              ],
              resources: ['*'],
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              sid: 'TargetRegistration',
              actions: [
                'elasticloadbalancing:RegisterTargets',
                'elasticloadbalancing:DeregisterTargets',
              ],
              resources: [this.targetGroup.targetGroupArn],
            }),
          ],
        }),
      ],
    });

    this.nlb.addListener('rdsPrivateLinkNlbListener', {
      port: props.dbPort,
      protocol: elbv2.Protocol.TCP,
      defaultAction: elbv2.NetworkListenerAction.forward([this.targetGroup]),
    });

    this.nlbManagementLambda = new lambda.Function(this, 'nlbUpdateLambda', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../handler/src')),
      handler: props.lambdaHandlerName ?? 'index.handler',
      runtime: lambda.Runtime.PYTHON_3_8,
      role: this.nlbManagementLambdaRole,
    });

    this.nlbManagementLambda.addEnvironment('TARGET_GROUP_ARN', this.targetGroup.targetGroupArn);
    this.nlbManagementLambda.addEnvironment('RDS_ENDPOINT', props.db.instanceEndpoint.hostname);
    this.nlbManagementLambda.addEnvironment('RDS_PORT', props.dbPort.toString());

    props.dbFailureTopic.addSubscription(new sns_subscriptions.LambdaSubscription(this.nlbManagementLambda));

    this.vpcEndpointService = new ec2.VpcEndpointService(this, 'rdsPrivateLinkVpcEndpointService', {
      vpcEndpointServiceLoadBalancers: [this.nlb],
      acceptanceRequired: props.acceptanceRequired ?? true,
      allowedPrincipals: props.allowedPrincipals,
    });

    new cr.AwsCustomResource(this, 'PrivateLinkTagging', {
      onUpdate: {
        action: 'createTags',
        parameters: {
          Resources: [
            this.vpcEndpointService.vpcEndpointServiceId,
          ],
          Tags: this.tags.renderedTags,
        },
        service: 'EC2',
        physicalResourceId: cr.PhysicalResourceId.of('rdsPrivateLinkTagging'),
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: [
          `arn:aws:ec2:${Stack.of(this).region}:${Stack.of(this).account}:vpc-endpoint-service/${this.vpcEndpointService.vpcEndpointServiceId}`,
        ],
      }),
    });
  }
}
