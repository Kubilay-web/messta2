import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "@/app/lib/db";

// PUT: Update language
export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const updatedLanguage = await db.language.update({
      where: { id },
      data: {
        ...body,
        slug: slugify(body.name, { lower: true }), // Generate slug from the name
      },
    });

    return NextResponse.json(updatedLanguage);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Remove language
export async function DELETE(_: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const deletedLanguage = await db.language.delete({
      where: { id },
    });

    return NextResponse.json(deletedLanguage);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
