import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient();

export const handler = async (event, context, callback) => {
    let response;
    const basket = event.basket;

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
                
                console.log(params)

                const command = new GetItemCommand(params);

                console.log(command);

                const data = await dynamoDBClient.send(command);

                console.log(data);

                // Check if the item exists
                if (!data.Item) {
                    throw new Error(`Product with ID ${product.id} not found in the inventory.`);
                }

                const retrievedItem = data.Item;

                console.log(retrievedItem);

                const availability = parseInt(retrievedItem.quantity.N);

                if (product.quantity > availability) {
                    return true; // Found an invalid quantity, exit the loop
                }

                return false;
            })
        );
        
        console.log(hasInvalidQuantity)

        if (hasInvalidQuantity.some(Boolean)) {
            throw new Error("error_quantity");
        } else {
            response = {
                statusCode: 200,
                body: event,
            };
        }

        return response;
    } catch (error) {
        const myErrorObj = {
            message: error.message,
            errorType: "InternalServerError",
            httpStatus: 500,
            requestId: context.awsRequestId,
        };
        callback(JSON.stringify(myErrorObj));
    }
};
