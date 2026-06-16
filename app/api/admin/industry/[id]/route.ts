import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

// UPDATE (PUT)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { err: "Invalid industry name" },
        { status: 400 },
      );
    }

    const updatedIndustry = await db.industry.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });

    return NextResponse.json(updatedIndustry);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deletedIndustry = await db.industry.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(deletedIndustry);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
