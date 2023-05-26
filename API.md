# RDS PrivateLink Construct for AWS CDK

[![build](https://github.com/automatedna/cdk-rds-privatelink/actions/workflows/build.yml/badge.svg)](https://github.com/automatedna/cdk-rds-privatelink/actions/workflows/build.yml)

## Features

- Creates a VPC Endpoint for PrivateLink with RDS using a network load balancer to front the connection to RDS
- Supports tagging the VPC Endpoint that is created through a custom resource

## API Doc

See [API](API.md)

## References

- [Blog: Access Amazon RDS across VPCs using AWS PrivateLink and Network Load Balancer](https://aws.amazon.com/blogs/database/access-amazon-rds-across-vpcs-using-aws-privatelink-and-network-load-balancer/)
- [AWS Sample: Access Amazon RDS across VPCs using AWS PrivateLink and Network Load Balancer](https://github.com/aws-samples/amazon-rds-crossaccount-access/tree/main)

## Example

```typescript
const vpc = new ec2.Vpc(stack, 'VPC');

const db = new rds.DatabaseInstance(stack, 'DB', {
  engine: rds.DatabaseInstanceEngine.SQL_SERVER_SE,
  vpc,
});

const topic = new DbFailureTopic(stack, 'DBFailureTopic', {
  db,
});

new rdsPrivateLink.RdsPrivateLink(stack, 'privateLink', {
  db,
  vpc,
  dbPort: rdsPrivateLink.CommonDBPorts.MSSQL,
  vpcSubnets: {
    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
  },
  dbFailureTopic: topic,
});
```

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### DbFailureTopic <a name="DbFailureTopic" id="@automatedna/cdk-rds-privatelink.DbFailureTopic"></a>

Creates an SNS topic subscribed to the RDS database for failure events.

#### Initializers <a name="Initializers" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.Initializer"></a>

```typescript
import { DbFailureTopic } from '@automatedna/cdk-rds-privatelink'

new DbFailureTopic(scope: Construct, id: string, props: DbFailureTopicProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.Initializer.parameter.props">props</a></code> | <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopicProps">DbFailureTopicProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.Initializer.parameter.props"></a>

- *Type:* <a href="#@automatedna/cdk-rds-privatelink.DbFailureTopicProps">DbFailureTopicProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.addSubscription">addSubscription</a></code> | Subscribe some endpoint to this topic. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.addToResourcePolicy">addToResourcePolicy</a></code> | Adds a statement to the IAM resource policy associated with this topic. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.bindAsNotificationRuleTarget">bindAsNotificationRuleTarget</a></code> | Represents a notification target That allows SNS topic to associate with this rule target. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.grantPublish">grantPublish</a></code> | Grant topic publishing permissions to the given identity. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.metric">metric</a></code> | Return the given named metric for this Topic. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfMessagesPublished">metricNumberOfMessagesPublished</a></code> | The number of messages published to your Amazon SNS topics. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsDelivered">metricNumberOfNotificationsDelivered</a></code> | The number of messages successfully delivered from your Amazon SNS topics to subscribing endpoints. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFailed">metricNumberOfNotificationsFailed</a></code> | The number of messages that Amazon SNS failed to deliver. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFilteredOut">metricNumberOfNotificationsFilteredOut</a></code> | The number of messages that were rejected by subscription filter policies. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFilteredOutInvalidAttributes">metricNumberOfNotificationsFilteredOutInvalidAttributes</a></code> | The number of messages that were rejected by subscription filter policies because the messages' attributes are invalid. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFilteredOutNoMessageAttributes">metricNumberOfNotificationsFilteredOutNoMessageAttributes</a></code> | The number of messages that were rejected by subscription filter policies because the messages have no attributes. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.metricPublishSize">metricPublishSize</a></code> | Metric for the size of messages published through this topic. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.metricSMSMonthToDateSpentUSD">metricSMSMonthToDateSpentUSD</a></code> | The charges you have accrued since the start of the current calendar month for sending SMS messages. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.metricSMSSuccessRate">metricSMSSuccessRate</a></code> | The rate of successful SMS message deliveries. |

---

##### `toString` <a name="toString" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addSubscription` <a name="addSubscription" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.addSubscription"></a>

```typescript
public addSubscription(topicSubscription: ITopicSubscription): Subscription
```

Subscribe some endpoint to this topic.

###### `topicSubscription`<sup>Required</sup> <a name="topicSubscription" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.addSubscription.parameter.topicSubscription"></a>

- *Type:* aws-cdk-lib.aws_sns.ITopicSubscription

---

##### `addToResourcePolicy` <a name="addToResourcePolicy" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.addToResourcePolicy"></a>

```typescript
public addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult
```

Adds a statement to the IAM resource policy associated with this topic.

If this topic was created in this stack (`new Topic`), a topic policy
will be automatically created upon the first call to `addToPolicy`. If
the topic is imported (`Topic.import`), then this is a no-op.

###### `statement`<sup>Required</sup> <a name="statement" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.addToResourcePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `bindAsNotificationRuleTarget` <a name="bindAsNotificationRuleTarget" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.bindAsNotificationRuleTarget"></a>

```typescript
public bindAsNotificationRuleTarget(_scope: Construct): NotificationRuleTargetConfig
```

Represents a notification target That allows SNS topic to associate with this rule target.

###### `_scope`<sup>Required</sup> <a name="_scope" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.bindAsNotificationRuleTarget.parameter._scope"></a>

- *Type:* constructs.Construct

---

##### `grantPublish` <a name="grantPublish" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.grantPublish"></a>

```typescript
public grantPublish(grantee: IGrantable): Grant
```

Grant topic publishing permissions to the given identity.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.grantPublish.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `metric` <a name="metric" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metric"></a>

```typescript
public metric(metricName: string, props?: MetricOptions): Metric
```

Return the given named metric for this Topic.

###### `metricName`<sup>Required</sup> <a name="metricName" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metric.parameter.metricName"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metric.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricNumberOfMessagesPublished` <a name="metricNumberOfMessagesPublished" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfMessagesPublished"></a>

```typescript
public metricNumberOfMessagesPublished(props?: MetricOptions): Metric
```

The number of messages published to your Amazon SNS topics.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfMessagesPublished.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricNumberOfNotificationsDelivered` <a name="metricNumberOfNotificationsDelivered" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsDelivered"></a>

```typescript
public metricNumberOfNotificationsDelivered(props?: MetricOptions): Metric
```

The number of messages successfully delivered from your Amazon SNS topics to subscribing endpoints.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsDelivered.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricNumberOfNotificationsFailed` <a name="metricNumberOfNotificationsFailed" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFailed"></a>

```typescript
public metricNumberOfNotificationsFailed(props?: MetricOptions): Metric
```

The number of messages that Amazon SNS failed to deliver.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFailed.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricNumberOfNotificationsFilteredOut` <a name="metricNumberOfNotificationsFilteredOut" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFilteredOut"></a>

```typescript
public metricNumberOfNotificationsFilteredOut(props?: MetricOptions): Metric
```

The number of messages that were rejected by subscription filter policies.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFilteredOut.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricNumberOfNotificationsFilteredOutInvalidAttributes` <a name="metricNumberOfNotificationsFilteredOutInvalidAttributes" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFilteredOutInvalidAttributes"></a>

```typescript
public metricNumberOfNotificationsFilteredOutInvalidAttributes(props?: MetricOptions): Metric
```

The number of messages that were rejected by subscription filter policies because the messages' attributes are invalid.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFilteredOutInvalidAttributes.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricNumberOfNotificationsFilteredOutNoMessageAttributes` <a name="metricNumberOfNotificationsFilteredOutNoMessageAttributes" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFilteredOutNoMessageAttributes"></a>

```typescript
public metricNumberOfNotificationsFilteredOutNoMessageAttributes(props?: MetricOptions): Metric
```

The number of messages that were rejected by subscription filter policies because the messages have no attributes.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricNumberOfNotificationsFilteredOutNoMessageAttributes.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricPublishSize` <a name="metricPublishSize" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricPublishSize"></a>

```typescript
public metricPublishSize(props?: MetricOptions): Metric
```

Metric for the size of messages published through this topic.

Average over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricPublishSize.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricSMSMonthToDateSpentUSD` <a name="metricSMSMonthToDateSpentUSD" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricSMSMonthToDateSpentUSD"></a>

```typescript
public metricSMSMonthToDateSpentUSD(props?: MetricOptions): Metric
```

The charges you have accrued since the start of the current calendar month for sending SMS messages.

Maximum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricSMSMonthToDateSpentUSD.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

##### `metricSMSSuccessRate` <a name="metricSMSSuccessRate" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricSMSSuccessRate"></a>

```typescript
public metricSMSSuccessRate(props?: MetricOptions): Metric
```

The rate of successful SMS message deliveries.

Sum over 5 minutes

###### `props`<sup>Optional</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.metricSMSSuccessRate.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.fromTopicArn">fromTopicArn</a></code> | Import an existing SNS topic provided an ARN. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.isConstruct"></a>

```typescript
import { DbFailureTopic } from '@automatedna/cdk-rds-privatelink'

DbFailureTopic.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.isOwnedResource"></a>

```typescript
import { DbFailureTopic } from '@automatedna/cdk-rds-privatelink'

DbFailureTopic.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.isResource"></a>

```typescript
import { DbFailureTopic } from '@automatedna/cdk-rds-privatelink'

DbFailureTopic.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromTopicArn` <a name="fromTopicArn" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.fromTopicArn"></a>

```typescript
import { DbFailureTopic } from '@automatedna/cdk-rds-privatelink'

DbFailureTopic.fromTopicArn(scope: Construct, id: string, topicArn: string)
```

Import an existing SNS topic provided an ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.fromTopicArn.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct.

---

###### `id`<sup>Required</sup> <a name="id" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.fromTopicArn.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `topicArn`<sup>Required</sup> <a name="topicArn" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.fromTopicArn.parameter.topicArn"></a>

- *Type:* string

topic ARN (i.e. arn:aws:sns:us-east-2:444455556666:MyTopic).

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.property.fifo">fifo</a></code> | <code>boolean</code> | Whether this topic is an Amazon SNS FIFO queue. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.property.topicArn">topicArn</a></code> | <code>string</code> | The ARN of the topic. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopic.property.topicName">topicName</a></code> | <code>string</code> | The name of the topic. |

---

##### `node`<sup>Required</sup> <a name="node" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `fifo`<sup>Required</sup> <a name="fifo" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.property.fifo"></a>

```typescript
public readonly fifo: boolean;
```

- *Type:* boolean

Whether this topic is an Amazon SNS FIFO queue.

If false, this is a standard topic.

---

##### `topicArn`<sup>Required</sup> <a name="topicArn" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.property.topicArn"></a>

```typescript
public readonly topicArn: string;
```

- *Type:* string

The ARN of the topic.

---

##### `topicName`<sup>Required</sup> <a name="topicName" id="@automatedna/cdk-rds-privatelink.DbFailureTopic.property.topicName"></a>

```typescript
public readonly topicName: string;
```

- *Type:* string

The name of the topic.

---


### RdsPrivateLink <a name="RdsPrivateLink" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink"></a>

#### Initializers <a name="Initializers" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.Initializer"></a>

```typescript
import { RdsPrivateLink } from '@automatedna/cdk-rds-privatelink'

new RdsPrivateLink(scope: Construct, id: string, props: RdsPrivateLinkProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.Initializer.parameter.props">props</a></code> | <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps">RdsPrivateLinkProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.Initializer.parameter.props"></a>

- *Type:* <a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps">RdsPrivateLinkProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.isConstruct"></a>

```typescript
import { RdsPrivateLink } from '@automatedna/cdk-rds-privatelink'

RdsPrivateLink.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.nlb">nlb</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.NetworkLoadBalancer</code> | The NLB created to front the RDS private link. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.nlbManagementLambda">nlbManagementLambda</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | The Lambda function created to manage the NLB. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.nlbManagementLambdaRole">nlbManagementLambdaRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | The Lambda role created to manage the NLB. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | *No description.* |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.targetGroup">targetGroup</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.NetworkTargetGroup</code> | The target group created to register the RDS DB. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.vpcEndpointService">vpcEndpointService</a></code> | <code>aws-cdk-lib.aws_ec2.VpcEndpointService</code> | The underlying VPC Endpoint Service created. |

---

##### `node`<sup>Required</sup> <a name="node" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `nlb`<sup>Required</sup> <a name="nlb" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.nlb"></a>

```typescript
public readonly nlb: NetworkLoadBalancer;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.NetworkLoadBalancer

The NLB created to front the RDS private link.

---

##### `nlbManagementLambda`<sup>Required</sup> <a name="nlbManagementLambda" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.nlbManagementLambda"></a>

```typescript
public readonly nlbManagementLambda: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

The Lambda function created to manage the NLB.

---

##### `nlbManagementLambdaRole`<sup>Required</sup> <a name="nlbManagementLambdaRole" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.nlbManagementLambdaRole"></a>

```typescript
public readonly nlbManagementLambdaRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

The Lambda role created to manage the NLB.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

---

##### `targetGroup`<sup>Required</sup> <a name="targetGroup" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.targetGroup"></a>

```typescript
public readonly targetGroup: NetworkTargetGroup;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.NetworkTargetGroup

The target group created to register the RDS DB.

---

##### `vpcEndpointService`<sup>Required</sup> <a name="vpcEndpointService" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.vpcEndpointService"></a>

```typescript
public readonly vpcEndpointService: VpcEndpointService;
```

- *Type:* aws-cdk-lib.aws_ec2.VpcEndpointService

The underlying VPC Endpoint Service created.

---


## Structs <a name="Structs" id="Structs"></a>

### DbFailureTopicProps <a name="DbFailureTopicProps" id="@automatedna/cdk-rds-privatelink.DbFailureTopicProps"></a>

#### Initializer <a name="Initializer" id="@automatedna/cdk-rds-privatelink.DbFailureTopicProps.Initializer"></a>

```typescript
import { DbFailureTopicProps } from '@automatedna/cdk-rds-privatelink'

const dbFailureTopicProps: DbFailureTopicProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.contentBasedDeduplication">contentBasedDeduplication</a></code> | <code>boolean</code> | Enables content-based deduplication for FIFO topics. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.displayName">displayName</a></code> | <code>string</code> | A developer-defined string that can be used to identify this SNS topic. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.fifo">fifo</a></code> | <code>boolean</code> | Set to true to create a FIFO topic. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.masterKey">masterKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | A KMS Key, either managed by this CDK app, or imported. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.topicName">topicName</a></code> | <code>string</code> | A name for the topic. |
| <code><a href="#@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.db">db</a></code> | <code>aws-cdk-lib.aws_rds.IDatabaseInstance</code> | The RDS database to monitor for failure events. |

---

##### `contentBasedDeduplication`<sup>Optional</sup> <a name="contentBasedDeduplication" id="@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.contentBasedDeduplication"></a>

```typescript
public readonly contentBasedDeduplication: boolean;
```

- *Type:* boolean
- *Default:* None

Enables content-based deduplication for FIFO topics.

---

##### `displayName`<sup>Optional</sup> <a name="displayName" id="@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.displayName"></a>

```typescript
public readonly displayName: string;
```

- *Type:* string
- *Default:* None

A developer-defined string that can be used to identify this SNS topic.

---

##### `fifo`<sup>Optional</sup> <a name="fifo" id="@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.fifo"></a>

```typescript
public readonly fifo: boolean;
```

- *Type:* boolean
- *Default:* None

Set to true to create a FIFO topic.

---

##### `masterKey`<sup>Optional</sup> <a name="masterKey" id="@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.masterKey"></a>

```typescript
public readonly masterKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* None

A KMS Key, either managed by this CDK app, or imported.

---

##### `topicName`<sup>Optional</sup> <a name="topicName" id="@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.topicName"></a>

```typescript
public readonly topicName: string;
```

- *Type:* string
- *Default:* Generated name

A name for the topic.

If you don't specify a name, AWS CloudFormation generates a unique
physical ID and uses that ID for the topic name. For more information,
see Name Type.

---

##### `db`<sup>Required</sup> <a name="db" id="@automatedna/cdk-rds-privatelink.DbFailureTopicProps.property.db"></a>

```typescript
public readonly db: IDatabaseInstance;
```

- *Type:* aws-cdk-lib.aws_rds.IDatabaseInstance

The RDS database to monitor for failure events.

---

### RdsPrivateLinkProps <a name="RdsPrivateLinkProps" id="@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps"></a>

#### Initializer <a name="Initializer" id="@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.Initializer"></a>

```typescript
import { RdsPrivateLinkProps } from '@automatedna/cdk-rds-privatelink'

const rdsPrivateLinkProps: RdsPrivateLinkProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.db">db</a></code> | <code>aws-cdk-lib.aws_rds.IDatabaseInstance</code> | The RDS database endpoint address to connect to. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.dbFailureTopic">dbFailureTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The SNS topic used by the DB to notify of failure events. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.dbPort">dbPort</a></code> | <code>number</code> | The port of the database instance to connect to. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC to create the endpoint in. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | The VPC subnets to create the endpoint in. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.acceptanceRequired">acceptanceRequired</a></code> | <code>boolean</code> | Whether requests from the service consumers to connect to the service through an endpoint must be accepted. |
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.allowedPrincipals">allowedPrincipals</a></code> | <code>aws-cdk-lib.aws_iam.ArnPrincipal[]</code> | IAM users, IAM roles, or AWS accounts to allow inbound connections from. |

---

##### `db`<sup>Required</sup> <a name="db" id="@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.db"></a>

```typescript
public readonly db: IDatabaseInstance;
```

- *Type:* aws-cdk-lib.aws_rds.IDatabaseInstance

The RDS database endpoint address to connect to.

---

##### `dbFailureTopic`<sup>Required</sup> <a name="dbFailureTopic" id="@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.dbFailureTopic"></a>

```typescript
public readonly dbFailureTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic

The SNS topic used by the DB to notify of failure events.

You can use the `DbFailureTopic` construct to create
this topic.

---

##### `dbPort`<sup>Required</sup> <a name="dbPort" id="@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.dbPort"></a>

```typescript
public readonly dbPort: number;
```

- *Type:* number

The port of the database instance to connect to.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC to create the endpoint in.

---

##### `vpcSubnets`<sup>Required</sup> <a name="vpcSubnets" id="@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

The VPC subnets to create the endpoint in.

---

##### `acceptanceRequired`<sup>Optional</sup> <a name="acceptanceRequired" id="@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.acceptanceRequired"></a>

```typescript
public readonly acceptanceRequired: boolean;
```

- *Type:* boolean
- *Default:* true

Whether requests from the service consumers to connect to the service through an endpoint must be accepted.

---

##### `allowedPrincipals`<sup>Optional</sup> <a name="allowedPrincipals" id="@automatedna/cdk-rds-privatelink.RdsPrivateLinkProps.property.allowedPrincipals"></a>

```typescript
public readonly allowedPrincipals: ArnPrincipal[];
```

- *Type:* aws-cdk-lib.aws_iam.ArnPrincipal[]
- *Default:* no connections allowed

IAM users, IAM roles, or AWS accounts to allow inbound connections from.

---



## Enums <a name="Enums" id="Enums"></a>

### CommonDBPorts <a name="CommonDBPorts" id="@automatedna/cdk-rds-privatelink.CommonDBPorts"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@automatedna/cdk-rds-privatelink.CommonDBPorts.MSSQL">MSSQL</a></code> | *No description.* |
| <code><a href="#@automatedna/cdk-rds-privatelink.CommonDBPorts.MYSQL">MYSQL</a></code> | *No description.* |
| <code><a href="#@automatedna/cdk-rds-privatelink.CommonDBPorts.POSTGRES">POSTGRES</a></code> | *No description.* |

---

##### `MSSQL` <a name="MSSQL" id="@automatedna/cdk-rds-privatelink.CommonDBPorts.MSSQL"></a>

---


##### `MYSQL` <a name="MYSQL" id="@automatedna/cdk-rds-privatelink.CommonDBPorts.MYSQL"></a>

---


##### `POSTGRES` <a name="POSTGRES" id="@automatedna/cdk-rds-privatelink.CommonDBPorts.POSTGRES"></a>

---

