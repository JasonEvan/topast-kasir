import { addNewMenu, getAllData } from "@/lib/firebase/service";
import { Menu } from "@/lib/types/type";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  const data = await getAllData<Menu>("menus");

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as File;
  const flavour = data.get("flavour") as string;
  const description = data.get("description") as string;
  const price = Number(data.get("price"));

  if (!file) {
    await addNewMenu({
      flavour,
      description,
      price,
    });

    return NextResponse.json(
      { data: { flavour, description, price } },
      { status: 200 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // write file to public
  const path = join(process.env.FILE_PATH_IMAGE!, "img", file.name);
  await writeFile(path, buffer);

  await addNewMenu({
    flavour,
    description,
    price,
    imagePath: `/img/${file.name}`,
  });

  return NextResponse.json(
    { data: { flavour, description, price, imagePath: path } },
    { status: 200 }
  );
}
