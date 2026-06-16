import { NextResponse } from "next/server";
import db from "@/app/lib/db"
import queryString from "query-string";

export async function GET(req: Request) {
  try {
    const { query } = queryString.parseUrl(req.url);
    const {
      industry_type_id,
      organization_type_id,
      country_id,
      state_id,
      city_id,
      companySize,
      keyword,
      category
    } = query || {};

    // Prisma filtreleme objesi
    const filters: any = {};

    if (organization_type_id) filters.organizationTypeId = String(organization_type_id);
    if (industry_type_id) filters.industryTypeId = String(industry_type_id);
    if (country_id) filters.country = { name: String(country_id) };
    if (state_id) filters.state = { statename: String(state_id) };
    if (city_id) filters.city = { name: String(city_id) };
    if (companySize) filters.companySize = String(companySize);
    if (keyword) filters.name = { contains: String(keyword), mode: "insensitive" };
    if (category && category !== "all") filters.category = String(category);

    const companies = await db.company.findMany({
      where: filters,
      include: {
        industryType: true,
        organizationType: true,
        teamType: true,
        country: true,
        state: true,
        city: true,
        Jobs: true,
      },
    });

    return NextResponse.json(companies);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
}
