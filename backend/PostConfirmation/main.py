import boto3
import os
import time
import json
      
dynamodb = boto3.resource('dynamodb')
TABLE_NAME = os.environ['TABLE_NAME']
table = dynamodb.Table(TABLE_NAME)


def handler(event, context):
    """
    Post Confirmation - this functions expects an Cognito post confirmation input event
    """
    try:
        table.put_item(
            Item={
                'Id': event["userName"],
                'Key': os.urandom(64).hex(),
                'Count': 0,
            }
          )

    except Exception as err:
        print("ERR: ", err)
    
    return event
