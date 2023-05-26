import {
  App,
  Stack,
  aws_rds as rds,
  aws_ec2 as ec2,
} from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { RdsPrivateLink, CommonDBPorts } from '../src/index';

test('Check expected resources are created', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  const vpc = new ec2.Vpc(stack, 'VPC');

  const db = new rds.DatabaseInstance(stack, 'DB', {
    engine: rds.DatabaseInstanceEngine.SQL_SERVER_SE,
    vpc,
  });

  new RdsPrivateLink(stack, 'STACK_NAME', {
    db,
    vpc,
    dbPort: CommonDBPorts.MSSQL,
    vpcSubnets: {
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    },

  });

  // Check resources
  Template.fromStack(stack).hasResourceProperties('AWS::ElasticLoadBalancingV2::LoadBalancer', {
    Scheme: 'internal',
    Type: 'network',
  });

  Template.fromStack(stack).hasResource('AWS::RDS::DBInstance', 1);
  Template.fromStack(stack).hasResource('AWS::Lambda::Function', 1);
  Template.fromStack(stack).hasResource('AWS::SNS::Topic', 1);
  Template.fromStack(stack).hasResource('AWS::IAM::Role', 1);
  Template.fromStack(stack).hasResource('Custom::AWS', 1);
});

test('Check CloudFormation template matches snapshot', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  const vpc = new ec2.Vpc(stack, 'VPC');

  const db = new rds.DatabaseInstance(stack, 'DB', {
    engine: rds.DatabaseInstanceEngine.SQL_SERVER_SE,
    vpc,
  });

  new RdsPrivateLink(stack, 'STACK_NAME', {
    db,
    vpc,
    dbPort: CommonDBPorts.MSSQL,
    vpcSubnets: {
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    },

  });

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
