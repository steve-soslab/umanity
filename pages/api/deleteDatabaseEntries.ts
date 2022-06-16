import type { NextApiRequest, NextApiResponse } from "next";
import { Tip } from "../../types/tips";
import awsExports from "../../src/aws-exports";
import AWS from "aws-sdk";

AWS.config.update({
  region: awsExports.aws_project_region,
});

/**
 * Deletes all the tip's from Dynamo, used when you click the CLEAR button
 * @param req
 * @param res
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dynamo = new AWS.DynamoDB();
    const results: Tip[] = [];
    const partiqlStmnt = {
      Statement: `SELECT * FROM "umanitydb-${process.env.USER_BRANCH}"`,
    };
    const response = await dynamo.executeStatement(partiqlStmnt).promise();
    response.Items?.forEach((item) => {
      const row = AWS.DynamoDB.Converter.unmarshall(item) as Tip;

      results.push(row);
    });

    for (let x = 0; x < results.length; x++) {
      const partiqlStmnt = {
        Statement: `DELETE FROM "umanitydb-${process.env.USER_BRANCH}" WHERE "UUID" = ${results[x].UUID}`,
      };
      const result = await dynamo.executeStatement(partiqlStmnt).promise();
    }

    res.status(201).json({ results });
  } catch (e) {
    const result = JSON.stringify((e as Error).message);
    res.status(500).json(result);
  }
}
