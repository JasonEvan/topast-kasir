import { NextResponse } from "next/server";

export async function DELETE() {
  return NextResponse.json(
    {
      message: "Logout Successful",
    },
    {
      headers: {
        "Set-Cookie":
          "token=; Path=/; HttpOnly; Secure; SameSite=None; Expires=Thu, 01 Jan 1970 00:00:00 UTC",
      },
      status: 200,
    }
  );
}
