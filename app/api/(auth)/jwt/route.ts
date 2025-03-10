import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 403 }
    );
  }

  try {
    const jwtDecode = jwt.verify(token.value, process.env.JWT_SECRET_KEY!);
    return NextResponse.json(
      {
        user: jwtDecode,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: e,
      },
      { status: 403 }
    );
  }
}
