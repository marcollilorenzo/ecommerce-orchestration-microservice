const db = [
    { "id": 1, "availability": 10, "price": 10 },
    { "id": 2, "availability": 2, "price": 5 },
    { "id": 3, "availability": 5, "price": 3 }
];


export const handler = async(event) => {

    let response;
    console.log(event)

    // check if basket is empty
    if (!event.body) {
        response = {
            statusCode: 400,
            body: JSON.stringify({ "message": "empty_basket" }),
        }
        return response
    }

    // check if body have basket
    if (!JSON.parse(event.body).basket) {
        response = {
            statusCode: 400,
            body: JSON.stringify({ "message": "empty_basket" }),
        }
        return response
    }

    const bodyObj = event.body
    const basket = bodyObj.basket;
    let totalCost = 0
    
    basket.map(product => {
        totalCost = totalCost +  db.find(o => o.id === product.id).price * product.quantity;
    })
    
    bodyObj.totalCost = totalCost
    
    // TODO implement
    response = {
        statusCode: 200,
        body: bodyObj,
    };
    return response;
};
