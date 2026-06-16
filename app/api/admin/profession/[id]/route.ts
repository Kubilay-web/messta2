import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();
  const { name } = body;

  try {
    // Update existing profession by ID
    const updatedProfession = await db.profession.update({
      where: { id },
      data: {
        name,
        slug: slugify(name, { lower: true }),
        updatedAt: new Date(), // Opsiyonel: Eğer modelinizde varsa
      },
    });

    return NextResponse.json(updatedProfession);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  const { id } = context.params; // Extract the id from the URL params

  try {
    // Delete the profession using Prisma
    const deletingProfession = await db.profession.delete({
      where: { id }, // Match the profession by ID
    });

    return NextResponse.json(deletingProfession); // Return the deleted profession data
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 }); // Handle errors
  }
}
