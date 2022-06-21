import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../_utils/client";
import normalize from "../../../_utils/normalize";
import {
  InsertFruitMutation,
  InsertFruitMutationVariables,
  InsertFruit,
} from "../../../../../generated/graphql";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { fruit }: { fruit?: string } = req.query;
  const value = normalize(fruit);

  client
    .mutation<InsertFruitMutation, InsertFruitMutationVariables>(InsertFruit, {
      fruit: value,
    })
    .toPromise()
    .then((result) => {
      if (result?.error) {
        console.log(result.error);
        res.status(200).send(`query not ok`);
      } else {
        res.status(200).send(`ok`);
      }
    })
    .catch((e: any) => {
      console.log(e);
      res.status(200).send(`server not ok`);
    });
}
