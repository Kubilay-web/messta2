import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

interface Params {
  params: { sectionId: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const images = await db.landingPageImage.findMany({
      where: { sectionId: params.sectionId },
      orderBy: { order: "asc" }
    });
    
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}





export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sectionId = params.id;
    const body = await request.json();

    const { url, alt, type = 'gallery', order = 0 } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const image = await db.landingPageImage.create({
      data: {
        sectionId,
        url,
        alt: alt || 'Image',
        type,
        order
      }
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('POST Image Error:', error);
    return NextResponse.json(
      { error: 'Failed to add image' },
      { status: 500 }
    );
  }
}