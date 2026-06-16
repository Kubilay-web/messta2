// app/api/candidate/my-jobs/route.ts
import { NextResponse } from "next/server";

import db from "@/app/lib/db"; // Prisma client
import { validateRequest } from "@/app/auth";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Kullanıcının Candidate kaydını çek
    const candidate = await db.candidate.findUnique({
      where: { userId: user.id },
    });
    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    // Başvurulan işler ve bookmarkları getir ve ilişkili job & company & country bilgileriyle populate et
    const myJobs = await db.applyjob.findMany({
      where: { candidateId: candidate.id },
      include: {
        job: {
          include: {
            company: {
              include: {
                country: true,
              },
            },
          },
        },
      },
    });

    // profileComplete hesaplaması
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
    ];
    const profileComplete = requiredFields.every((key) => {
      const val = (candidate as any)[key];
      return val !== null && val !== "";
    });

    return NextResponse.json({ profileComplete, data: myJobs });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
