import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient();


export const handler = async (event, context, callback) => {

    try {
        const bodyObj = event.body

        const basket = bodyObj.basket;
        let totalCost = 0

        await Promise.all(
            basket.map(async (product) => {
                console.log(product)
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
                const price = parseInt(retrievedItem.price.N);

                totalCost = totalCost + price * product.quantity;
            })
        )

        bodyObj.totalCost = totalCost

        const response = {
            statusCode: 200,
            body: bodyObj,
        };
        return response;

    }
    catch (error) {
        const myErrorObj = {
            message: error.message,
            errorType: "InternalServerError",
            httpStatus: 500,
            requestId: context.awsRequestId,
        };
        callback(JSON.stringify(myErrorObj));
    }
};
