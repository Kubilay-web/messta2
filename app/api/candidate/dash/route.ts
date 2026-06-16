import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client
import { validateRequest } from "@/app/auth";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Kullanıcıyı mail ile al
    const users = await db.user.findUnique({
      where: { email: user.email },
    });
    if (!users) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Candidate kaydı al
    const candidate = await db.candidate.findUnique({
      where: { userId: user.id },
    });
    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    // Başvurulan ve kaydedilen iş sayıları
    const appliedjob = await db.applyjob.count({
      where: { candidateId: candidate.id },
    });
    const jobbookmark = await db.jobbookmark.count({
      where: { candidateId: candidate.id },
    });

    // Gerekli alanları kontrol et
    const requiredFields = [
      "title",
      "full_name",
      "slug",
      "email",
      "phone_one",
      "bio",
      "website",
      "cv",
      "cityId",
      "stateId",
      "countryId",
      // Gerekirse buraya dil, skill gibi alanlar eklenebilir
    ];

    const profileComplete = requiredFields.every((field) => {
      const v = candidate[field as keyof typeof candidate];
      return v !== null && v !== "";
    });

    return NextResponse.json({ profileComplete, jobbookmark, appliedjob });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
