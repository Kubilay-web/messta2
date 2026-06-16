import db from "@/app/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, text, images, background, userId } = body;

    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Prisma ile yeni post oluştur
    const post = await db.postSocial.create({
      data: {
        type: type || null,
        text: text || "",
        images: images || [],        // Cloudinary linkleri
        background: background || "",
        user: { connect: { id: userId } },
      },
    });

    return new Response(JSON.stringify(post), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
