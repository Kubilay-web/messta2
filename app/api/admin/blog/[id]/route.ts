import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: any) {
  const body = await req.json();
  const { id } = context?.params; // id parametresi

  try {
    // Blogu güncelle
    const updatedBlog = await db.blog.update({
      where: { id: id }, // `id` üzerinden arama yapıyoruz
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (err: any) {
    console.error(err);

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  const { id } = context?.params; // id parametresi

  try {
    // Blogu sil
    const deletedBlog = await db.blog.delete({
      where: { id: id },
    });

    return NextResponse.json(deletedBlog);
  } catch (err: any) {
    console.error(err);

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// Get single blog by ID
export async function GET(req: Request, context: any) {
  const { id } = context?.params; // id parametresi

  try {
    // Tek bir blogu getir
    const blog = await db.blog.findUnique({
      where: { id: id },
    });

    if (!blog) {
      return NextResponse.json({ err: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (err: any) {
    console.error(err);

    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
