import boto3
import json

def lambda_handler(event, context):
    try:
        stepFunctions = boto3.client('stepfunctions')
        
        sqs_message = event['Records'][0]['body']
        
        print(sqs_message)

        state_machine_arn = 'arn:aws:states:eu-central-1:495456954059:stateMachine:OrderOrchestrator'
      
        response = stepFunctions.start_execution(
            stateMachineArn=state_machine_arn,
            input = sqs_message
        )

        execution_arn = response['executionArn']
        print('Step Function execution started:', execution_arn)
        return execution_arn
    except Exception as e:
        print('Failed to start Step Function execution:', str(e))
        raise e