import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { client } from "../../utils/client";
import {
  UpdateUserCity,
  UpdateUserCityMutation,
  UpdateUserCityMutationVariables,
} from "../../generated/graphql";

export function middleware(request: NextRequest) {
  let response = NextResponse.next();

  let accessToken = request.cookies["hs-access-token"];

  if (!accessToken) {
    return NextResponse.redirect("/");
  }

  let id = request.cookies["hs-user-id"];
  const city = request.geo?.city;

  client
    .mutation<UpdateUserCityMutation, UpdateUserCityMutationVariables>(
      UpdateUserCity,
      {
        id,
        city,
      },
      {
        fetch,
        fetchOptions: () => {
          return {
            headers: {
              "x-hasura-admin-secret": process.env
                .HASURA_ADMIN_SECRET as string,
            },
          };
        },
      }
    )
    .toPromise()
    .then((d) => d);

  return response;
}
