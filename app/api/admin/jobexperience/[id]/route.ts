import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma Client yoluna göre değiştir
import slugify from "slugify";

// PUT: Job experience ID güncelle
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { name } = body;

    const slug = slugify(name, { lower: true });

    const updatedJobExperience = await db.jobexperienceId.update({
      where: { id: params.id },
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(updatedJobExperience);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Job experience ID sil
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const deletedJobExperience = await db.jobexperienceId.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedJobExperience);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
