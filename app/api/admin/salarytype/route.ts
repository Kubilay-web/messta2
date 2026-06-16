import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "@/app/lib/db"; // Prisma client'ınızın import edildiği dosya

// GET: Fetch all salary types
export async function GET() {
  try {
    const salarytypes = await db.salarytype.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(salarytypes);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Create new salary type
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { err: "Name must be at least 3 characters long." },
        { status: 400 },
      );
    }

    const slug = slugify(name, { lower: true });

    const salarytype = await db.salarytype.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(salarytype);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
