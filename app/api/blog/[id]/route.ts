// app/api/blog/[id]/route.ts

import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await params;
    
    console.log("Fetching blog with id:", id);

    // id ile sorgulama
    const blog = await db.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const latest = await db.blog.findMany({
      where: {
        id: { not: id } // Kendisi hariç
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return NextResponse.json({ blog, latest });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}