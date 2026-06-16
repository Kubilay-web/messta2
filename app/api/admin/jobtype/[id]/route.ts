import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "@/app/lib/db";

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { err: "Name is required and must be at least 3 characters long." },
        { status: 400 },
      );
    }

    const slug = slugify(name, { lower: true });

    const updatedJobtype = await db.jobtype.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(updatedJobtype);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Delete job type
export async function DELETE(_: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const deletedJobType = await db.jobtype.delete({
      where: { id },
    });

    return NextResponse.json(deletedJobType);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
