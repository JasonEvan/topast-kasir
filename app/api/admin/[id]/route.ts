import { deleteAdmin, getAdminById, updateAdmin } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = await getAdminById(id);

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();

  const success = await updateAdmin(id, data);

  return NextResponse.json(
    {
      data: {
        success,
      },
    },
    { status: success ? 200 : 500 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await deleteAdmin(id);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        errors: "Gagal delete admin",
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
