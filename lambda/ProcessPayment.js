import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

export const handler = async (event, context, callback) => {
    const orderId = event[0].body.orderId;

    try {
        const lambda = new LambdaClient({ region: 'eu-central-1' });

        const params = {
            FunctionName: 'SendWebsocketMessage',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify({ orderId: orderId, messageObj: { status: "payment", message: "Pagamento in esecuzione di € " + (event[0].body.totalCost + event[1].body.shippingCost) } }) // Input payload for the target Lambda function
        };

        const command = new InvokeCommand(params);
        const data = await lambda.send(command);

        console.log('Response:', data.Payload);

        const objResponse = event[0].body
        objResponse.productsCost = event[0].body.totalCost
        objResponse.shippingCost = event[1].body.shippingCost
        objResponse.totalCost = event[0].body.totalCost + event[1].body.shippingCost

        if (event[0].body.paymentDetails.ccv !== 123) {
            throw new Error("Codice CCV non corretto!")
        }

        const response = {
            statusCode: 200,
            body: (objResponse),
        };

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
