import db from "@/app/lib/db";

export async function GET(req: Request) {
  try {
    const [industries, organizations, teams, countries, states, cities] = await Promise.all([
      db.industry.findMany({
        include: { _count: { select: { Company: true } } }, // companies değil Company
        orderBy: { name: "asc" },
      }),
      db.organization.findMany({
        include: { _count: { select: { Company: true } } },
        orderBy: { name: "asc" },
      }),
      db.team.findMany({
        include: { _count: { select: { Company: true } } },
        orderBy: { name: "asc" },
      }),
      db.countryJob.findMany({
        orderBy: { name: "asc" },
      }),
      db.state.findMany({
        orderBy: { statename: "asc" },
      }),
      db.city.findMany({
        orderBy: { name: "asc" },
      }),
    ]);

    return new Response(
      JSON.stringify({ industries, organizations, teams, countries, states, cities }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Filtre seçenekleri getirilirken hata:", error);
    return new Response(
      JSON.stringify({ error: "Sunucu hatası" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
