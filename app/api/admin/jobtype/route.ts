import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

// GET: Fetch all job types
export async function GET() {
  try {
    const jobtypes = await db.jobtype.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobtypes);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Create a new job type
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { err: "Name is required and must be at least 3 characters long." },
        { status: 400 },
      );
    }

    const slug = slugify(name, { lower: true });

    const jobtype = await db.jobtype.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(jobtype);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
