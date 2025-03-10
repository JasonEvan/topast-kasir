import { getAllData } from "@/lib/firebase/service";
import { User } from "@/lib/types/type";
import { NextResponse } from "next/server";

export async function GET() {
  let data;
  try {
    data = await getAllData<User>("users");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        errors: error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
}
