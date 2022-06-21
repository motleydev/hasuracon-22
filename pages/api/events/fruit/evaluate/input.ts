import type { NextApiRequest, NextApiResponse } from "next";
import Fuse from "fuse.js";
import client from "../../../_utils/client";
import {
  UpsertFruitMutation,
  UpsertFruit,
  UpsertFruitMutationVariables,
} from "../../../../../generated/graphql";

import { fruits } from "../../../_utils/listOfFruit";

const options = {
  includeScore: true,
};

const fuse = new Fuse(fruits, options);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { fruit, id }: { fruit?: string; id: string } = req.body;
  if (fruit) {
    const result = fuse.search(fruit);
    const { score } = result[0];

    client
      .mutation<UpsertFruitMutation, UpsertFruitMutationVariables>(
        UpsertFruit,
        { score, id, fruit }
      )
      .toPromise()
      .then((result) => {
        if (result?.error) {
          console.log(result.error.graphQLErrors);
          res.status(200).send(`query not ok`);
        } else {
          res.status(200).send(`ok`);
        }
      })
      .catch((e: any) => {
        console.log(e);
        res.status(200).send(`server not ok`);
      });
  } else {
    res.status(400).send("no input provided");
  }
}
