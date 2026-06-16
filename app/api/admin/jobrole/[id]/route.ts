import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { name } = body;

    const slug = slugify(name, { lower: true });

    const updatedJobrole = await db.jobrole.update({
      where: { id: params.id },
      data: { name, slug },
    });

    return NextResponse.json(updatedJobrole);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deletedJobrole = await db.jobrole.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedJobrole);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
