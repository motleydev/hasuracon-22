import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let response = NextResponse.next();

  let accessToken = request.cookies["hs-access-token"];
  let refreshToken = request.cookies["hs-refresh-token"];

  // If no access token (is expired)

  // If no refresh token

  // Redirect to login

  // else request new access token

  response.cookie("hello", "world", {
    path: "/",
    maxAge: 1000,
    httpOnly: false,
    sameSite: "strict",
  });

  // clear the `cookie`
  //   response.clearCookie("hello");

  return response;
}
