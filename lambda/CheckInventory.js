import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient();


export const handler = async (event, context, callback) => {
    let response;
    const basket = event.basket;

    const orderId = event.orderId;

    console.log(orderId)

    try {
        const lambda = new LambdaClient({ region: 'eu-central-1' });

        const params = {
            FunctionName: 'SendWebsocketMessage',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify({ orderId: orderId, messageObj: { status: "pending", message: "Controllo disponibilità prodotti" } }) // Input payload for the target Lambda function
        };

        const command = new InvokeCommand(params);
        const data = await lambda.send(command);

        console.log(data)

        if (data.StatusCode === 200) {
            console.log(data.Payload)
        }
        else {
            throw new Error("Errore invio WS message")
        }
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }

    try {
        const hasInvalidQuantity = await Promise.all(
            basket.map(async (product) => {
                console.log(typeof product.id);

                const params = {
                    TableName: 'Inventory',
                    Key: {
                        'productId': { N: product.id.toString() }
                    }
                };



                const command = new GetItemCommand(params);
                const data = await dynamoDBClient.send(command);

                // Check if the item exists
                if (!data.Item) {
                    throw new Error(`Product with ID ${product.id} not found in the inventory.`);
                }

                const retrievedItem = data.Item;

                const availability = parseInt(retrievedItem.quantity.N);

                if (product.quantity > availability) {
                    return true; // Found an invalid quantity, exit the loop
                }

                return false;
            })
        );

        console.log(hasInvalidQuantity)

        if (hasInvalidQuantity.some(Boolean)) {
            try {
                const updateItemParams = {
                    TableName: 'Order',
                    Key: {
                        orderId: { S: orderId }
                    },
                    UpdateExpression: 'SET orderStatus = :statusString',
                    ExpressionAttributeValues: {
                        ':statusString': { S: 'cancelled' }
                    }
                };

                const command = new UpdateItemCommand(updateItemParams);
                const data = await dynamoDBClient.send(command);
            }
            catch (error) {
                console.error('Error:', error);
                throw error;
            }
            throw new Error("Quantità non disponibile");
        }
        else {
            basket.map(async (product) => {
                console.log(typeof product.id);

                const updateItemParams = {
                    TableName: 'Inventory',
                    Key: {
                        productId: { N: product.id.toString() }
                    },
                    UpdateExpression: 'SET quantity = quantity - :decreaseAmount',
                    ExpressionAttributeValues: {
                        ':decreaseAmount': { N: product.quantity.toString() }, // Specify the amount to decrease
                        ':quantityitem': { N: '0' }
                    },
                    ConditionExpression: 'quantity > :quantityitem',
                };

                const command = new UpdateItemCommand(updateItemParams);
                const data = await dynamoDBClient.send(command);
            })

            response = {
                statusCode: 200,
                body: event,
            };
        }

        return response;
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
