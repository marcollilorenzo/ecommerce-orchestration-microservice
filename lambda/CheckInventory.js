const db = [
    { "id": 1, "availability": 10, "price": 10 },
    { "id": 2, "availability": 2, "price": 5 },
    { "id": 3, "availability": 5, "price": 3 }
];

export const handler = async (event, context, callback) => {

    try {
        let response;

        // check if basket is empty
        if (!event.basket) {
            throw new Error("empty_basket")
        }

        const basket = event.basket;
        const hasInvalidQuantity = basket.some((product) => {
            const availability = db.find(o => o.id === product.id).availability;
            if (product.quantity > availability) {
                return true; // Found an invalid quantity, exit the loop
            }
            return false;
        });

        if (hasInvalidQuantity) {
            throw new Error("error_quantity")
        }
        
        else {
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
            errorType: "InternalServerError",
            httpStatus: 500,
            requestId: context.awsRequestId,
        }
        callback(JSON.stringify(myErrorObj));
    }
};
