import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"; // ES Modules import

const dynamoDBClient = new DynamoDBClient();

export const handler = async (event) => {
    const orderId = event.queryStringParameters.orderId
    const connectionId = event.requestContext.connectionId

    console.log(orderId)
    console.log(connectionId)

    const params = {
        TableName: 'CallbackDB',
        Item: {
            orderId: { S: orderId },
            connectionId: { S: connectionId }
        }
    }

    const command = new PutItemCommand(params);

    try {
        const res = await dynamoDBClient.send(command);

        console.log(res)
        return {
            statusCode: 200,
            body: JSON.stringify('Record added successfully')
        };
    }
    catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify('Error adding record')
        };
    }
};
