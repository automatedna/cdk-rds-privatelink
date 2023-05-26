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

new rdsPrivateLink.RdsPrivateLink(stack, 'privateLink', {
  db,
  vpc,
  dbPort: rdsPrivateLink.CommonDBPorts.MSSQL,
  vpcSubnets: {
    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
  },
});
```

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

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
| <code><a href="#@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.nlbManagementTopic">nlbManagementTopic</a></code> | <code>aws-cdk-lib.aws_sns.Topic</code> | The SNS topic created to send notifications to. |
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

##### `nlbManagementTopic`<sup>Required</sup> <a name="nlbManagementTopic" id="@automatedna/cdk-rds-privatelink.RdsPrivateLink.property.nlbManagementTopic"></a>

```typescript
public readonly nlbManagementTopic: Topic;
```

- *Type:* aws-cdk-lib.aws_sns.Topic

The SNS topic created to send notifications to.

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

