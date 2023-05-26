import os
import socket
import boto3
import pytest
from moto import mock_elbv2
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import src.index as index
from unittest.mock import patch

@mock_elbv2
@patch('socket.gethostbyname_ex')
def test_handler(mock_gethostbyname_ex):
    # Define your environment variables
    os.environ['RDS_ENDPOINT'] = "rds-endpoint"
    os.environ['RDS_PORT'] = "1433"
    os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'

    # Mock the RDS endpoint
    mock_gethostbyname_ex.return_value = ('', [], ['10.0.2.46', '10.0.2.47'])

    # Create an elbv2 client and create a target group
    client = boto3.client('elbv2')
    response = client.create_target_group(
        Name='my-targets',
        Protocol='TCP',
        Port=1433,
        VpcId='vpc-3ac0fb5f',
        HealthCheckProtocol='TCP',
        HealthCheckPort='1433'
    )
    assert response['ResponseMetadata']['HTTPStatusCode'] == 200

    os.environ['TARGET_GROUP_ARN'] = response['TargetGroups'][0]['TargetGroupArn']

    # Register targets
    response = client.register_targets(
        TargetGroupArn=os.environ['TARGET_GROUP_ARN'],
        Targets=[
            {
                'Id': '10.0.2.44',
                'Port': 1433
            },
            {
                'Id': '10.0.2.45',
                'Port': 1433
            },
        ]
    )
    assert response['ResponseMetadata']['HTTPStatusCode'] == 200

    # Mock an event and context, call the handler
    event = {}  # Mock event
    context = {}  # Mock context
    index.handler(event, context)

    # Check that the old targets were deregistered and new targets registered
    response = client.describe_target_health(TargetGroupArn=os.environ['TARGET_GROUP_ARN'])
    target_ips = [target['Target']['Id'] for target in response['TargetHealthDescriptions']]
    assert '10.0.2.44' not in target_ips
    assert '10.0.2.45' not in target_ips
    assert '10.0.2.46' in target_ips
    assert '10.0.2.47' in target_ips
