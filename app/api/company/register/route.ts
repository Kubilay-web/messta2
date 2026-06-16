import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import slugify from "slugify";
import { validateRequest } from "@/app/auth";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user?.id) {
      return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
    }

    const company = await db.company.findFirst({
      where: { userId: user.id },
    });

    return NextResponse.json(company);
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, bio, vision, logo, banner } = body;

    const { user } = await validateRequest();
    if (!user?.id) {
      return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
    }

    const logoPublicId = logo?.public_id || "";
    const bannerPublicId = banner?.public_id || "";
    const logoSecureUrl = logo?.secure_url || "";
    const bannerSecureUrl = banner?.secure_url || "";

    const existingCompany = await db.company.findFirst({
      where: { userId: user.id },
    });

    if (existingCompany) {
      const updatedCompany = await db.company.update({
        where: { id: existingCompany.id },
        data: {
          name,
          slug: slugify(name),
          bio,
          vision,
          logoPublicId,
          logoSecureUrl,
          bannerPublicId,
          bannerSecureUrl,
        },
      });

      return NextResponse.json(updatedCompany);
    } else {
      const newCompany = await db.company.create({
        data: {
          userId: user.id,
          name,
          slug: slugify(name),
          bio,
          vision,
          logoPublicId,
          logoSecureUrl,
          bannerPublicId,
          bannerSecureUrl,
        },
      });

      return NextResponse.json(newCompany);
    }
  } catch (err: any) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
