export const handler = async(event) => {

    let response;

    // check if shippingAddress is empty
    if (!event.shippingAddress) {
        response = {
            statusCode: 400,
            body: JSON.stringify({ "message": "empty_shipping_address" }),
        }
        return response
    }

    // make some operaton to create fake shipping cost
    let shippingAddress = event.shippingAddress
    let shippingCost = 0
    if (shippingAddress.country === "Brazil") {
        shippingCost = 10
    }
    else {
        shippingCost = 20
    }

    // TODO implement
    response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
