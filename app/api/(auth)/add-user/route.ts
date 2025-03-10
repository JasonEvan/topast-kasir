import { addNewUser } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const schema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(8),
    isAdmin: z.boolean(),
  });

  let validatedData;
  try {
    validatedData = schema.parse(data);
  } catch (e: unknown) {
    return NextResponse.json(
      {
        errors: e instanceof ZodError ? e.errors[0].message : "Unknown error",
      },
      { status: 400 }
    );
  }

  const insertedData = await addNewUser(validatedData);

  return NextResponse.json(
    {
      data: {
        id: insertedData.id,
      },
    },
    { status: 201 }
  );
}
