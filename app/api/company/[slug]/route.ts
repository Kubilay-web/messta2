import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const company = await db.company.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        country: {
          select: {
            name: true,
          },
        },
        state: {
          select: {
            statename: true,
          },
        },
        city: {
          select: {
            name: true,
          },
        },
        industryType: {
          select: {
            name: true,
          },
        },
        organizationType: {
          select: {
            name: true,
          },
        },
        teamType: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!company) {
      return NextResponse.json({ error: "No company found" }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error: any) {
    console.error("Hata:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
