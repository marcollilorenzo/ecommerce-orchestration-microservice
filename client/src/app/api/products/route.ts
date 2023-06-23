import { NextRequest, NextResponse } from 'next/server'
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { Product } from '@/types/generic';

type ResponseBody = {
  error: boolean,
  body: Product[] | string | any,
  message?: string,
};



const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() : Promise<NextResponse<ResponseBody>> {
  
  

  try {

    const scanCommand = new ScanCommand({ TableName: 'Inventory', ConsistentRead: true });
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

    // create array of product
    const items: Product[] = scanResult.Items.map((item) => {
      const formattedItem: { [key: string]: any } = {};
      Object.keys(item).forEach((key) => {
        formattedItem[key] = getItemValue(item[key]);
      });
      return formattedItem as Product;
    });

    console.log(items)


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