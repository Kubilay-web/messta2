import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma Client

export async function DELETE(
  req: Request,
  context: { params: { id: string } },
) {
  try {
    const deletedEdu = await db.jobEducation.delete({
      where: { id: context.params.id },
    });

    return NextResponse.json(deletedEdu);
  } catch (err: any) {
    console.error("DELETE /education/:id error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const body = await req.json();

    const { id, ...cleanData } = body;

    const updatedEdu = await db.jobEducation.update({
      where: { id: context.params.id },
      data: {
        ...cleanData,
      },
    });

    return NextResponse.json(updatedEdu);
  } catch (err: any) {
    console.error("PUT /education/:id error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
