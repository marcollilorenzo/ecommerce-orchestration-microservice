export const handler = async(event) => {

    let response;

    // TODO implement
    response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
