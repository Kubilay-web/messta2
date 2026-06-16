import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

interface Context {
  params: {
    id: string;
  };
}

// PUT: Update jobcategory
export async function PUT(req: Request, context: Context) {
  const { id } = context.params;

  try {
    const body = await req.json();
    const { name, icon } = body;

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { err: "Name must be at least 3 characters long" },
        { status: 400 },
      );
    }

    if (!icon || icon.trim() === "") {
      return NextResponse.json({ err: "Icon is required" }, { status: 400 });
    }

    const slug = slugify(name, { lower: true });

    const updated = await db.jobcategory.update({
      where: { id },
      data: {
        name,
        icon,
        slug,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE: Delete jobcategory
export async function DELETE(req: Request, context: Context) {
  const { id } = context.params;

  try {
    const deleted = await db.jobcategory.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
