import { NextResponse } from "next/server";
import slugify from "slugify";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      fullName,
      title,
      birthDate,
      imagePublicId,
      imageSecureUrl,
      cv,
      website,
      experienceLabel,
    } = body;

    if (!imagePublicId || !imageSecureUrl) {
      return NextResponse.json(
        { error: "Image public ID and secure URL are required" },
        { status: 400 },
      );
    }

    const existingCandidate = await db.candidate.findUnique({
      where: { userId: user.id },
    });

    if (existingCandidate) {
      const updated = await db.candidate.update({
        where: { userId: user.id },
        data: {
          full_name: fullName ?? existingCandidate.full_name,
          title: title ?? existingCandidate.title,
          birth_date: birthDate
            ? new Date(birthDate)
            : existingCandidate.birth_date,
          image_public_id: imagePublicId ?? existingCandidate.image_public_id,
          image_secure_url:
            imageSecureUrl ?? existingCandidate.image_secure_url,
          cv: cv ?? existingCandidate.cv,
          website: website ?? existingCandidate.website,
          experience_lable:
            experienceLabel ?? existingCandidate.experience_lable,
          slug: slugify(title ?? existingCandidate.title),
        },
      });

      return NextResponse.json(
        { msg: "Updated successfully", candidate: updated },
        { status: 200 },
      );
    }

    // Yeni kayıt oluşturma
    const newCandidate = await db.candidate.create({
      data: {
        full_name: fullName,
        title,
        birth_date: birthDate ? new Date(birthDate) : null,
        image_public_id: imagePublicId,
        image_secure_url: imageSecureUrl,
        cv,
        website,
        experience_lable: experienceLabel,
        slug: slugify(title),
        user: { connect: { id: user.id } },
      },
    });

    return NextResponse.json(
      { msg: "Successfully registered", candidate: newCandidate },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("Candidate POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userWithCandidate = await db.user.findUnique({
      where: { email: user.email },
      include: { Candidate: true },
    });

    if (!userWithCandidate?.Candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(userWithCandidate.Candidate);
  } catch (err: any) {
    console.error("Candidate GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
