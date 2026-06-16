import { NextResponse } from "next/server";
import db from "@/app/lib/db";
// POST: Save or update settings
export async function POST(req) {
  const body = await req.json();

  try {
    // Find first settings doc
    let siteSettings = await db.siteSettings.findFirst();

    if (siteSettings) {
      // Update existing
      siteSettings = await db.siteSettings.update({
        where: { id: siteSettings.id },
        data: {
          settings: {
            ...siteSettings.settings,
            ...body,
          },
        },
      });
    } else {
      // Create new
      siteSettings = await db.siteSettings.create({
        data: {
          settings: body,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET: Retrieve settings
export async function GET() {
  try {
    const siteSettings = await db.siteSettings.findFirst();
    return NextResponse.json(siteSettings || {});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
