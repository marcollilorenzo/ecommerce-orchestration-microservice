export const handler = async (event, context, callback) => {
    try {
        let response;
        const bodyObj = event.body;

        // check if shippingAddress is empty
        if (!bodyObj.shippingAddress) {
            response = {
                statusCode: 400,
                body: JSON.stringify({ "message": "empty_shipping_address" }),
            }
            return response
        }

        // make some operaton to create fake shipping cost
        let shippingAddress = bodyObj.shippingAddress
        let shippingCost = 0
        if (shippingAddress.city === "spagna") {
            shippingCost = 10
        }
        else {
            shippingCost = 20
        }

        bodyObj.shippingCost = shippingCost

        response = {
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
