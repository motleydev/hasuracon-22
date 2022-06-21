import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import client from "../../_utils/client";
import { generateJWT } from "../../../../utils/jwt";
import { setCookie } from "../../../../utils/cookie";

import {
  CheckUser,
  CheckUserQuery,
  CheckUserQueryVariables,
} from "../../../../generated/graphql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password }: { username?: string; password: string } =
    req.body;

  return client
    .query<CheckUserQuery, CheckUserQueryVariables>(CheckUser, {
      username,
    })
    .toPromise()
    .then(async (result) => {
      if (result?.error) {
        return res
          .status(400)
          .json({
            message: "Error with query",
            payload: result.error.graphQLErrors,
          });
      } else {
        const user = result.data?.user[0];
        if (!user)
          return res.status(400).json({ message: "Something went wrong" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid" });

        const token = generateJWT({
          otherClaims: {
            "X-Hasura-User-Id": user.id.toString(),
          },
        });

        setCookie(res, "hasura-user-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 60 * 60,
          sameSite: "strict",
          path: "/",
        });

        return res.status(200).json({
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
