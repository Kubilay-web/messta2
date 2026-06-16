import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (!query) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const messages = await prisma.messages.findMany({
      where: {
        message: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Mesaj arama hatası:", err);
    return new Response(JSON.stringify({ error: "Mesajlar alınamadı" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
