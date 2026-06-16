import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { updateUserSchema } from "@/app/lib/validation";

// GET /api/user/[id]
export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "User ID is required." }, { status: 400 });
  }

  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("GET /user/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch user." }, { status: 500 });
  }
}

// DELETE /api/user/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "User ID is required." }, { status: 400 });
  }

  try {
    const user = await db.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    console.error("DELETE /user/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
  }
}

// PUT /api/user/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "User ID is required." }, { status: 400 });
  }

  try {
    const body = await request.json();

    // Zod validation (partial update)
    const validateData = updateUserSchema.partial().parse(body);

    const updatedUser = await db.user.update({
      where: { id },
      data: validateData,
    });

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 },
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Zod validation error
    if (error?.errors) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 });
    }

    console.error("PUT /user/[id] error:", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}
