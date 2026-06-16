// app/api/languages/route.js

import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "@/app/lib/db";

// GET method - Fetch all languages sorted by createdAt in descending order
export async function GET(req) {
  try {
    // Fetching languages from the database using Prisma
    const languages = await db.language.findMany({
      orderBy: {
        createdAt: "desc", // Sorting by createdAt in descending order
      },
    });

    return NextResponse.json(languages);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

// POST method - Create a new language
export async function POST(req) {
  const body = await req.json();
  const { name } = body;

  // Generate slug using slugify
  const slug = slugify(name, { lower: true });

  try {
    // Creating a new language in the database using Prisma
    const language = await db.language.create({
      data: {
        name,
        slug, // Use the generated slug
      },
    });

    return NextResponse.json(language);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
