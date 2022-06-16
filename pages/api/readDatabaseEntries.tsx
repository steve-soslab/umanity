import type { NextApiRequest, NextApiResponse } from "next";
import { Tip } from "../../types/tips";
import awsExports from "../../src/aws-exports";
import AWS from "aws-sdk";

AWS.config.update({
  region: awsExports.aws_project_region,
});

/**
 * Retrieves a list of all the tips from the Database
 * @param req
 * @param res
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dynamo = new AWS.DynamoDB();
  const results = [];
  const partiqlStmnt = {
    Statement: `SELECT * FROM "umanitydb-${process.env.USER_BRANCH}"`,
  };
  try {
    const response = await dynamo.executeStatement(partiqlStmnt).promise();
    response.Items?.forEach((item) => {
      const row = AWS.DynamoDB.Converter.unmarshall(item) as Tip;
      results.push(row);
    });
    res.status(201).json(results);
  } catch (e) {
    res.status(500).json(e);
  }
}
