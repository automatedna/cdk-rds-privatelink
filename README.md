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
