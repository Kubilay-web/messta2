// import { NextRequest, NextResponse } from "next/server";
// import db from "@/app/lib/db"; // Prisma Client
// import { ObjectId } from "mongodb";
// import { validateRequest } from "@/app/auth";

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const news_id = params.id;

//   if (!ObjectId.isValid(news_id)) {
//     return NextResponse.json({ message: "Invalid news ID" }, { status: 400 });
//   }

//   try {
//     const body = await req.json();
//     const { status } = body;

//     if (!status) {
//       return NextResponse.json(
//         { message: "Status is required" },
//         { status: 400 },
//       );
//     }

//     const { user } = await validateRequest();
//     if (!user || user?.role !== "ADMIN") {
//       return NextResponse.json(
//         { message: "You cannot access this API" },
//         { status: 401 },
//       );
//     }

//     // Haber güncelle
//     const updated = await db.news.update({
//       where: { id: news_id },
//       data: { status },
//     });

//     return NextResponse.json(
//       { message: "News status updated successfully", news: updated },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Update status error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }








// app/api/news/status/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    if (!status || !["pending", "active", "deactive"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    // Haberi bul
    const news = await db.news.findUnique({
      where: { id: params.id }
    });

    if (!news) {
      return NextResponse.json(
        { message: "News not found" },
        { status: 404 }
      );
    }

    // Yetki kontrolü: Sadece Admin status güncelleyebilir
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Only admin can change news status" },
        { status: 403 }
      );
    }

    // Status güncelle
    const updatedNews = await db.news.update({
      where: { id: params.id },
      data: { status }
    });

    return NextResponse.json({
      success: true,
      message: `News status updated to ${status}`,
      news: updatedNews
    });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
