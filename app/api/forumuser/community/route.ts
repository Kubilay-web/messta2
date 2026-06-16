import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import Joi from "joi";

const prisma = new PrismaClient();

// Joi validasyon şeması
const PaginatedSearchParamsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).default(10),
  query: Joi.string().allow("").optional(), // Boş query değerine izin veriliyor
  filter: Joi.string().valid("newest", "oldest", "popular").optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Parametreleri validate et
    const { error, value } = PaginatedSearchParamsSchema.validate(queryParams);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.details[0].message },
        { status: 400 },
      );
    }

    const { page, pageSize, query, filter } = value;

    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // Eğer query parametresi varsa, onu ekliyoruz, yoksa boş bir değer gönderiyoruz
    const where =
      query && query.trim() !== "" // query boş değilse
        ? {
            OR: [
              { username: { contains: query, mode: "insensitive" } },
              { email: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}; // query boşsa tüm kullanıcılar alınır

    let orderBy: any = {}; // Eğer filter parametresi yoksa, sıralama yapılmasın.

    // Filter parametresi varsa sıralama yapılacak.
    if (filter) {
      switch (filter) {
        case "newest":
          orderBy = { createdAt: "desc" };
          break;
        case "oldest":
          orderBy = { createdAt: "asc" };
          break;
        case "popular":
          orderBy = { upvotes: "desc" };
          break;
        default:
          orderBy = { createdAt: "desc" };
          break;
      }
    }

    // Kullanıcıları alıyoruz
    const users = await prisma.user.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    // Toplam kullanıcı sayısını alıyoruz
    const totalUsers = await prisma.user.count({ where });

    // Bir sonraki sayfa var mı?
    const isNext = totalUsers > skip + users.length;

    return NextResponse.json({
      success: true,
      data: {
        users,
        isNext,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
