import db from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const industryTypeId = searchParams.get("industryTypeId");
    const organizationTypeId = searchParams.get("organizationTypeId");
    const teamTypeId = searchParams.get("teamTypeId");
    const countryId = searchParams.get("countryId");
    const stateId = searchParams.get("stateId");
    const cityId = searchParams.get("cityId");
    const searchTerm = searchParams.get("searchTerm");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const where: any = {};

    if (industryTypeId) where.industryTypeId = industryTypeId;
    if (organizationTypeId) where.organizationTypeId = organizationTypeId;
    if (teamTypeId) where.teamTypeId = teamTypeId;
    if (countryId) where.countryId = countryId;
    if (stateId) where.stateId = stateId;
    if (cityId) where.cityId = cityId;

    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { bio: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    const skip = (page - 1) * limit;

    const companies = await db.company.findMany({
      where,
      include: {
        industryType: true,
        organizationType: true,
        teamType: true,
        country: true,
        state: true,
        city: true,
        _count: { select: { Jobs: true } },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalCount = await db.company.count({ where });

    return new Response(
      JSON.stringify({
        companies,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Şirketler getirilirken hata:", error);
    return new Response(
      JSON.stringify({ error: "Sunucu hatası" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
