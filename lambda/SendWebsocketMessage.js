import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';

// DynamoDB client initialization
const dynamoDBClient = new DynamoDBClient();

export const handler = async (event) => {
    const orderId = event.orderId;
    const messageObj = event.messageObj;

    const params = {
        TableName: 'CallbackDB',
        Key: {
            'orderId': { S: orderId }
        }
    };

    const command = new GetItemCommand(params);
    const data = await dynamoDBClient.send(command);

    // Retrieve the connection ID from the DynamoDB response
    const connectionId = data.Item.connectionId.S;

    // API Gateway Management API client initialization
    const apigatewaymanagementapi = new ApiGatewayManagementApiClient({
        apiVersion: '2018-11-29',
        endpoint: 'https://wkr7p95088.execute-api.eu-central-1.amazonaws.com/production/'
    });

    // Prepare and send the WebSocket message using the connection ID
    const paramsApiGateway = {
        ConnectionId: connectionId,
        Data: JSON.stringify(messageObj)
    };
    const postToConnectionCommand = new PostToConnectionCommand(paramsApiGateway);
    await apigatewaymanagementapi.send(postToConnectionCommand);

    return {
        statusCode: 200,
        body: 'Message sent to WebSocket API Gateway'
    };
};
