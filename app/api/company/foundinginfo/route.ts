import { NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    industryTypeId,
    organizationTypeId,
    teamTypeId,
    establishmentDate,
    website,
    email,
    phone,
    countryId,
    stateId,
    cityId,
    address,
    mapLink,
  } = body;

  const { user } = await validateRequest();

  if (!user?.id) {
    return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
  }

  try {
    // Make sure the date is a valid date object
    const formattedEstablishmentDate = establishmentDate
      ? new Date(establishmentDate)
      : null;

    // Try to upsert the company data (update or create)
    const upsertedCompany = await db.company.upsert({
      where: { userId: user.id },
      update: {
        industryTypeId,
        organizationTypeId,
        teamTypeId: teamTypeId || null,
        establishmentDate: formattedEstablishmentDate,
        website: website || null,
        email: email || null,
        phone: phone || null,
        countryId: countryId || null,
        stateId: stateId || null,
        cityId: cityId || null,
        address: address || null,
        mapLink: mapLink || null,
      },
      create: {
        userId: user.id,
        name: "Company Name Placeholder",
        slug: `${user.id}-company`,
        industryTypeId,
        organizationTypeId,
        teamTypeId,
        establishmentDate: formattedEstablishmentDate,
        website,
        email,
        phone,
        countryId,
        stateId,
        cityId,
        address,
        mapLink,
      },
    });

    return NextResponse.json(upsertedCompany);
  } catch (err: any) {
    console.error(err); // Log the error for debugging
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const { user } = await validateRequest();

  if (!user?.id) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const company = await db.company.findFirst({
      where: { userId: user.id },
      include: {
        country: true,
        state: true,
        city: true,
        industryType: true,
        organizationType: true,
        teamType: true,
      },
    });

    return NextResponse.json(company);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
