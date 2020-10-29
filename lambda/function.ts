import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { DynamoDB } from 'aws-sdk'

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const tableName = process.env.tableName
    const date = new Date().toISOString();

    const client = new DynamoDB.DocumentClient()

    if (!tableName) {
        return {
            statusCode: 500,
            body: `Well, there is no table name..`
        }
    }

    const result = await client.put({
        TableName: tableName,
        Item: {
            key: date,
            body: event.body
        }
    }).promise();

    if (result.$response.error) {
        return {
            statusCode: 500,
            body: `Ok, this is serious!`
        }
    }

    return {
        statusCode: 200,
        body: `I received and saved ${event.body}`
    }
}