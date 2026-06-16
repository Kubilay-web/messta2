import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

// PUT isteği: Var olan tag'i güncelle
export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ err: "Name is required" }, { status: 400 });
    }

    // Slug'ı güncelliyoruz
    const slug = slugify(name, { lower: true });

    // Tag'i güncelliyoruz
    const updatedTag = await db.tag.update({
      where: {
        id: context.params.id, // Parametreden gelen id'yi kullanıyoruz
      },
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(updatedTag);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// DELETE isteği: Tag'i sil
export async function DELETE(
  req: Request,
  context: { params: { id: string } },
) {
  try {
    // Tag'i siliyoruz
    const deletedTag = await db.tag.delete({
      where: {
        id: context.params.id, // Parametreden gelen id'yi kullanıyoruz
      },
    });

    return NextResponse.json(deletedTag);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
