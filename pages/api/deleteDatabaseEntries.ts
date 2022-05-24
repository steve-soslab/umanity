import type { NextApiRequest, NextApiResponse } from "next";
import { Tip } from "../../types/tips";
import awsExports from "../../src/aws-exports";
import AWS from "aws-sdk";

AWS.config.update({
    region: awsExports.aws_project_region,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const dynamo = new AWS.DynamoDB();
    const results = []
    const partiqlStmnt = {
        Statement: `DELETE * FROM "umanitydb-${process.env.USER_BRANCH}"`,
    };
    try {
        const response = await dynamo.executeStatement(partiqlStmnt).promise();        
        res.status(201).json({});
    } catch (e) {
        res.status(500).json(e);
    }
}