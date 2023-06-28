import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

export const handler = async(event) => {
    const errorMessage = JSON.parse(JSON.parse(event.Cause).errorMessage)
    const orderId = errorMessage.orderId
    const message = errorMessage.message
    
    try {
        const lambda = new LambdaClient({ region: 'eu-central-1' });

        const params = {
            FunctionName: 'SendWebsocketMessage',
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify({ orderId: orderId, messageObj: { status: "cancelled", message: message } }) // Input payload for the target Lambda function
        };

        const command = new InvokeCommand(params);
        const data = await lambda.send(command);

        if (data.StatusCode === 200) {
            console.log(data.Payload)

            // TODO implement
            const response = {
                statusCode: 200,
                body: JSON.stringify('Messaggio inviato con successo!'),
            };
            return response;
        }
        else {
            throw new Error("Errore invio WS message")
        }
    }
    catch (error) {
        console.log(error)
    }
};
