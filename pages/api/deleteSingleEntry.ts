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
  try {
    const dynamo = new AWS.DynamoDB();
    const results: Tip[] = [];
    const { UUID } = req.body;
    const partiqlStmnt = {
      Statement: `DELETE FROM "umanitydb-${process.env.USER_BRANCH}" WHERE "UUID" = ${UUID}`,
    };
    const result = await dynamo.executeStatement(partiqlStmnt).promise();

    res.status(201).json({ result });
  } catch (e) {
    const result = JSON.stringify((e as Error).message);
    res.status(500).json(result);
  }
}
