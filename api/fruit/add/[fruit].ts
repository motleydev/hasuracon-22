import type { VercelRequest, VercelResponse } from "@vercel/node";
import client from "../../_utils/client";
import normalize from "../../_utils/normalize";

const MUTATION = `mutation InsertFruit($fruit: String) {
    insert_fruit_one(object: {
      name: $fruit
    }) {
      name
    }
  }`;

export default (request: VercelRequest, response: VercelResponse) => {
  const { fruit }: { fruit?: string } = request.query;
  const value = normalize(fruit);

  client
    .mutation(MUTATION, { fruit: value })
    .toPromise()
    .then((result) => {
      if (result?.error) {
        console.log(result.error);
        response.status(200).send(`query not ok`);
      } else {
        response.status(200).send(`ok`);
      }
    })
    .catch((e) => {
      console.log(e);
      response.status(200).send(`server not ok`);
    });
};
