import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client'ını import ediyorum
import slugify from "slugify";

// PUT: Skill güncelleme
export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params; // URL'den id parametresini alıyoruz
  const body = await req.json(); // İstekten gelen JSON verisini alıyoruz

  try {
    // Skill verisini güncelliyoruz
    const updatingSkill = await db.skill.update({
      where: { id }, // id'ye göre güncelleme yapıyoruz
      data: {
        name: body.name, // Name'i güncelliyoruz
        slug: slugify(body.name, { lower: true }), // Slug'ı güncelliyoruz
        updatedAt: new Date(), // Güncellenme tarihini güncelliyoruz (isteğe bağlı)
      },
    });

    return NextResponse.json(updatingSkill);
  } catch (err) {
    console.error(err); // Hata loglama (geliştirme aşamasında yararlı olabilir)
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE: Skill silme
export async function DELETE(
  req: Request,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  try {
    // Skill verisini siliyoruz
    const deletingSkill = await db.skill.delete({
      where: { id },
    });

    return NextResponse.json(deletingSkill);
  } catch (err) {
    console.error(err); // Hata loglama (geliştirme aşamasında yararlı olabilir)
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
