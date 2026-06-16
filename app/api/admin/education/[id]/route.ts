import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

// UPDATE
export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();

  try {
    const updated = await db.educationid.update({
      where: { id },
      data: {
        name: body.name,
        slug: slugify(body.name, { lower: true }),
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  req: Request,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    const deleted = await db.educationid.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
