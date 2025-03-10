import { deleteMenu, getMenuById, updateMenu } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let data;
  try {
    data = await getMenuById(id);
  } catch (error) {
    return NextResponse.json({ errors: error }, { status: 500 });
  }

  if (data) {
    return NextResponse.json({ data }, { status: 200 });
  } else {
    return NextResponse.json(
      { errors: "Error fetching data, try again " },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();

  const ok = await updateMenu(id, data);

  if (!ok) {
    return NextResponse.json(
      {
        errors: "Cannot update data",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      data: {
        success: true,
      },
    },
    { status: 200 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await deleteMenu(id);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        errors: "Gagal delete menu",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      data: {
        success: true,
      },
    },
    { status: 200 }
  );
}
