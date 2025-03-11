import { checkEmailAndPassword, getUserByEmail } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const isPasswordTrue = await checkEmailAndPassword({
    email: data.email,
    password: data.password,
  });

  if (!isPasswordTrue) {
    return NextResponse.json(
      {
        errors: "Email or password is wrong, please try again",
      },
      { status: 400 }
    );
  }

  const credential = await getUserByEmail(data.email);

  const token = jwt.sign(data, process.env.JWT_SECRET_KEY!, {
    expiresIn: 60 * 60 * 1,
  });

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 1,
  });

  return NextResponse.json(
    {
      data: {
        email: credential?.email,
        isAdmin: credential?.isAdmin,
      },
    },
    {
      status: 200,
    }
  );
}
