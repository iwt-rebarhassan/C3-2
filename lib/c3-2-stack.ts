import * as dynamoDB from '@aws-cdk/aws-dynamodb';
import * as apiGatewayV2 from '@aws-cdk/aws-apigatewayv2';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';

export class C32Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, `${this.stackName}-lambdaFunction`,{
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'function.handler'
    })

    const functionIntegration = new apiGatewayV2.LambdaProxyIntegration({
      handler: lambdaFunction
    })

    const httpApi = new apiGatewayV2.HttpApi(this, `${this.stackName}-httpApi`, {
      apiName: `${this.stackName}-httpApi`,
      defaultIntegration: functionIntegration
    })

    const dynamoDBTable = new dynamoDB.Table(this, `${this.stackName}-dynamoDB-table`, {
      partitionKey: {name: 'key', type: dynamoDB.AttributeType.STRING}
    })

    lambdaFunction.addEnvironment('tableName', dynamoDBTable.tableName)
  }
}
