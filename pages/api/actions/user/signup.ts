import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import client from "../../_utils/client";
import { generateJWT } from "../../../../utils/jwt";

import checkMessage from "../../../../utils/checkMessage";
import {
  InsertUserOne,
  InsertUserOneMutation,
  InsertUserOneMutationVariables,
} from "../../../../generated/graphql";

const notUnique = checkMessage("Uniqueness violation");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password }: { username?: string; password: string } =
    req.body;

  const hashedPass = await bcrypt.hash(password, 10);

  return client
    .mutation<InsertUserOneMutation, InsertUserOneMutationVariables>(
      InsertUserOne,
      {
        username,
        password: hashedPass,
        refresh_token: uuid(),
      }
    )
    .toPromise()
    .then((result) => {
      if (result?.error) {
        if (notUnique(result.error.graphQLErrors)) {
          return res.status(400).json({ message: "Not Permitted" });
        } else {
          console.log("Bad Query", result.error.graphQLErrors);
          return res.status(400).json({ message: "Error with query" });
        }
      } else {
        const user = result.data?.insert_user_one;
        if (!user)
          return res.status(400).json({ message: "Something went wrong" });

        const token = generateJWT({
          otherClaims: {
            "X-Hasura-User-Id": user.id.toString(),
          },
        });

        return res.json({
          token,
          username: user.username,
          refreshToken: user.refresh_token,
        });
      }
    })
    .catch((e: any) => {
      console.log("server error");
      return res.status(400).json({ code: e.name, message: e.message });
    });
}
