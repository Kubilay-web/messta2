// app/api/blog/route.ts
import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Tüm blogları en yeni tarihe göre getir
    const blogs = await db.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ blogs });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { err: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
