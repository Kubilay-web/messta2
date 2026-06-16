// // app/api/users/route.ts

// import prisma from "@/app/lib/prisma"; // Prisma Client'ı içe aktar

// // Kullanıcıları baş harfe göre gruplamak için yardımcı fonksiyon
// function groupUsersByFirstLetter(users: any[]) {
//   const groupedUsers: { [key: string]: any[] } = {};

//   users.forEach((user) => {
//     const firstLetter = user.username[0].toUpperCase(); // Username'in ilk harfini alıyoruz
//     if (!groupedUsers[firstLetter]) {
//       groupedUsers[firstLetter] = [];
//     }
//     groupedUsers[firstLetter].push(user);
//   });

//   return groupedUsers;
// }

// // GET isteği için named export
// export async function GET(req: Request) {
//   try {
//     // Tüm kullanıcıları çekiyoruz, sadece belirli alanları seçiyoruz
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,            // Kullanıcı id'si
//         username: true,      // Kullanıcı adı
//         bio:true,
//         displayName: true,   // Görünen ad
//         email: true,         // Email
//         avatarUrl: true,     // Avatar URL'si
//         reputation: true,    // İtibar
//       },
//     });

//     // Kullanıcıları baş harfe göre grupla
//     const groupedUsers = groupUsersByFirstLetter(users);

//     // Başarılı yanıt
//     return new Response(JSON.stringify(groupedUsers), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     // Hata durumunda
//     return new Response(JSON.stringify({ error: "Bir hata oluştu." }), {
//       status: 500,
//     });
//   }
// }











// app/api/chat/contacts/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

// Kullanıcıları baş harfe göre gruplamak için yardımcı fonksiyon
function groupUsersByFirstLetter(users: any[]) {
  const groupedUsers: { [key: string]: any[] } = {};

  users.forEach((user) => {
    // username null veya undefined ise displayName veya email kullan
    let displayName = user.username;
    if (!displayName) {
      displayName = user.displayName;
    }
    if (!displayName) {
      displayName = user.email?.split('@')[0];
    }
    if (!displayName) {
      displayName = "Unknown";
    }
    
    const firstLetter = displayName.charAt(0).toUpperCase();
    if (!groupedUsers[firstLetter]) {
      groupedUsers[firstLetter] = [];
    }
    groupedUsers[firstLetter].push(user);
  });

  return groupedUsers;
}

export async function GET(req: Request) {
  try {
    const { user } = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Mevcut kullanıcı hariç tüm kullanıcıları çek
    const users = await db.user.findMany({
      where: {
        id: {
          not: user.id,
        },
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        avatarUrl: true,
        bio: true,
        reputation: true,
        createdAt: true,
      },
    });

    // Kullanıcıları formatla
    const formattedUsers = users.map((u) => ({
      id: u.id,
      name: u.displayName || u.username || u.email?.split('@')[0] || "Unknown User",
      username: u.username,
      displayName: u.displayName,
      email: u.email,
      avatar: u.avatarUrl,
      bio: u.bio,
      reputation: u.reputation,
      createdAt: u.createdAt,
    }));

    // Kullanıcıları baş harfe göre grupla
    const groupedUsers = groupUsersByFirstLetter(formattedUsers);

    return NextResponse.json(groupedUsers);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}