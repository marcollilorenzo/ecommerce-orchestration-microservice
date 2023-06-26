import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient();

export const handler = async (event, context, callback) => {
    const orderId = event.body.orderId

    try {
        const updateItemParams = {
            TableName: 'Order',
            Key: {
                orderId: { S: orderId }
            },
            UpdateExpression: 'SET orderStatus = :statusString',
            ExpressionAttributeValues: {
                ':statusString': { S: 'completed' }
            }
        };

        const command = new UpdateItemCommand(updateItemParams);
        const data = await dynamoDBClient.send(command);
    }
    catch (error) {
        console.error('Error:', error);

        const myErrorObj = {
            message: error.message,
            orderId: orderId,
            errorType: "InternalServerError",
            httpStatus: 500,
            requestId: context.awsRequestId,
        };
        callback(JSON.stringify(myErrorObj));
    }



    try {
        const lambda = new LambdaClient({ region: 'eu-central-1' });

        const params = {
            FunctionName: 'SendWebsocketMessage',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify({ orderId: orderId, messageObj: { status: "completed", message: "Ordine avvenuto con successo" } }) // Input payload for the target Lambda function
        };

        const command = new InvokeCommand(params);
        const data = await lambda.send(command);

        if (data.StatusCode === 200) {
            console.log(data.Payload)

            const response = {
                statusCode: 200,
                body: JSON.stringify('Ordine avvenuto con successo!'),
            };
            return response;
        }
        else {
            throw new Error("Errore invio WS message")
        }
    }
    catch (error) {
        const myErrorObj = {
            message: error.message,
            orderId: orderId,
            errorType: "InternalServerError",
            httpStatus: 500,
            requestId: context.awsRequestId,
        };
        callback(JSON.stringify(myErrorObj));
    }
};
