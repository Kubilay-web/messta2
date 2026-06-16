import { NextResponse } from "next/server";
import db from "@/app/lib/db";

// DELETE: Delete experience
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deletedExperience = await db.experience.delete({
      where: { id: params.id },
    });
    return NextResponse.json(deletedExperience);
  } catch (error: any) {
    console.error("DELETE /api/candidate/experience/[id] error:", error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: error.message || "Failed to delete experience" },
      { status: 500 },
    );
  }
}

// PUT: Update experience

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();

    // `id` alanını data'dan çıkart
    const { id: _ignored, ...data } = body;

    const updatedExperience = await db.experience.update({
      where: { id: params.id },
      data: {
        ...data,
        start: data.start ? new Date(data.start) : undefined,
        end: data.end ? new Date(data.end) : undefined,
        currently_working: Boolean(data.currently_working),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedExperience);
  } catch (error: any) {
    console.error("PUT /api/candidate/experience/[id] error:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to update experience" },
      { status: 500 },
    );
  }
}
