import { NextResponse } from 'next/server'
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const AWS_REGION = "YOUR_AWS_REGION";
const AWS_ACCESS_KEY_ID = "YOUR_AWS_ACCESS_KEY_ID";
const AWS_SECRET_ACCESS_KEY = "YOUR_AWS_SECRET_ACCESS_KEY";

const client = new DynamoDBClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(res: NextResponse, req: Request) {

  try {

    const scanCommand = new ScanCommand({ TableName: 'products' });
    const scanResult = await client.send(scanCommand);

    if (!scanResult.Items) {
      return NextResponse.json({
        error: true,
        body: 'no_items_found',
        message: 'No items found',
      }, {
        status: 404,
      })
    }

    const items = scanResult.Items.map((item) => {
      const formattedItem: { [key: string]: any } = {};

      for (const key of Object.keys(item)) {
        formattedItem[key] = getItemValue(item[key]);
      }

      return formattedItem;
    });


    return NextResponse.json({
      error: false,
      body: items,
    }, {
      status: 200,
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: true,
      body: error,
    }, {
      status: 500,
    })

  }

  function getItemValue(attribute: any) {
    const dataType = Object.keys(attribute)[0];
    const value = attribute[dataType];

    switch (dataType) {
      case "N":
        return parseFloat(value);
      case "S":
        return value;
      case "BOOL":
        return value === "true";
      // Handle other data types as needed
      default:
        return null;
    }
  }
}