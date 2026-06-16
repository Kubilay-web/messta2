import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";

// GET: Fetch all organizations
export async function GET() {
  try {
    const organizations = await db.organization.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(organizations);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Create a new organization
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

    const organization = await db.organization.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(organization);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
