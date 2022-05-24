import type { NextApiRequest, NextApiResponse } from "next";
import {Tip} from "../../types/tips";
import awsExports from "../../src/aws-exports";
import AWS from "aws-sdk";

AWS.config.update({
    region: awsExports.aws_project_region,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const tip: Tip = req.body;
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: "tips",
        Item: tip,
    };
    try {
        const data = await docClient.put(params).promise();        
        res.status(201).json(data);
    } catch (e) {
        res.status(500).json(e);
    }
}


