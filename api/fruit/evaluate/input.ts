import type { VercelRequest, VercelResponse } from "@vercel/node";
import Fuse from "fuse.js";
import client from "../../_utils/client";

import { fruits } from "../../_utils/listOfFruit";

const MUTATION = `mutation UpsertFruit($id: uuid, $score: numeric, $fruit: String) {
  insert_fruit_one(object: {
    id: $id,
    score: $score,
    name: $fruit
  }, on_conflict: {
    constraint: fruit_pkey,
    update_columns: score
  }) {
    score
  }
}
`;

const options = {
  includeScore: true,
};

const fuse = new Fuse(fruits, options);

export default (request: VercelRequest, response: VercelResponse) => {
  const { fruit, id }: { fruit?: string; id: string } = request.body;
  if (fruit) {
    const result = fuse.search(fruit);
    const { score } = result[0];

    client
      .mutation(MUTATION, { score, id, fruit })
      .toPromise()
      .then((result) => {
        if (result?.error) {
          console.log(result.error);
          response.status(200).json({ message: `query not ok` });
        } else {
          response.status(200).json({ message: `ok` });
        }
      })
      .catch((e) => {
        console.log(e);
        response.status(200).json({ message: `server not ok` });
      });
  } else {
    response.status(400).json({ message: "no input provided" });
  }
};
