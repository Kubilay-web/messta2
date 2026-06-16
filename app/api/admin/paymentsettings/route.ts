import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if a document already exists
    let existing = await db.paymentSettings.findFirst();

    if (existing) {
      const updated = await db.paymentSettings.update({
        where: { id: existing.id },
        data: {
          settings: {
            ...existing.settings,
            ...body, // Merge with existing settings
          },
        },
      });

      return NextResponse.json({ success: true, data: updated });
    } else {
      const created = await db.paymentSettings.create({
        data: {
          settings: body,
        },
      });

      return NextResponse.json({ success: true, data: created });
    }
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const paymentSettings = await db.paymentSettings.findFirst();
    return NextResponse.json(paymentSettings);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
