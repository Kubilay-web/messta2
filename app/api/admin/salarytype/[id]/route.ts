import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

interface Context {
  params: {
    id: string;
  };
}

// PUT: Update salarytype
export async function PUT(req: Request, context: Context) {
  const { id } = context.params;

  try {
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { err: "Name must be at least 3 characters long." },
        { status: 400 },
      );
    }

    const updatedSalarytype = await db.salarytype.update({
      where: { id },
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });

    return NextResponse.json(updatedSalarytype);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE: Delete salarytype
export async function DELETE(req: Request, context: Context) {
  const { id } = context.params;

  try {
    const deletedSalarytype = await db.salarytype.delete({
      where: { id },
    });

    return NextResponse.json(deletedSalarytype);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
