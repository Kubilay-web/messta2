import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { generateSlug } from "../generateSlug";




// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");
    const type = searchParams.get("type"); // 'titles', 'detail', 'list'

    // Tek bir school getir (id veya slug ile)
    if (id || slug) {
      const where = id ? { id } : { slug: slug as string };

      const school = await db.school.findUnique({
        where,
        select: {
          id: true,
          name: true,
          logo: true,
          slug: true,
          sectionCount: true,
          siteEnabled: true,
          siteCompletion: true,
          primaryEmail: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              students: true,
              teachers: true,
              classes: true,
              subjects: true,
              parents: true,
              events: true,
            },
          },
        },
      });

      if (!school) {
        return NextResponse.json(
          { error: "School not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(school);
    }

    // Sadece school title'larını getir (id ve name)
    if (type === "titles") {
      const schools = await db.school.findMany({
        orderBy: {
          name: "asc",
        },
        select: {
          id: true,
          name: true,
        },
      });

      return NextResponse.json(schools);
    }

    // Tüm school'ları getir
    const schools = await db.school.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        logo: true,
        slug: true,
        primaryEmail: true,
        sectionCount: true,
        siteEnabled: true,
        siteCompletion: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            students: true,
            teachers: true,
            classes: true,
          },
        },
      },
    });

    return NextResponse.json(schools);
  } catch (error) {
    console.error("GET schools error:", error);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 },
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni School Oluştur) ====================
// export async function POST(request: NextRequest) {
//   try {
//     const { name, logo, primaryEmail } = await request.json();

//     // Gerekli alanları kontrol et
//     if (!name) {
//       return NextResponse.json(
//         {
//           data: null,
//           error: 'School name is required',
//         },
//         { status: 400 }
//       );
//     }

//     // Slug oluştur
//     const slug = generateSlug(name);

//     // Aynı isimde school var mı kontrol et
//     const existingSchool = await db.school.findUnique({
//       where: { slug },
//     });

//     if (existingSchool) {
//       return NextResponse.json(
//         {
//           data: null,
//           error: 'School with this name already exists',
//         },
//         { status: 409 }
//       );
//     }

//     // Yeni school oluştur
//     const newSchool = await db.school.create({
//       data: {
//         name,
//         slug,
//         logo,
//         primaryEmail,
//       },
//     });

//     console.log(
//       `School created successfully: ${newSchool.name} (${newSchool.id})`
//     );

//     // Oluşturma zamanını çıkar
//     const { createdAt, updatedAt, ...schoolData } = newSchool;

//     return NextResponse.json(
//       {
//         data: schoolData,
//         error: null,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('POST school error:', error);
//     return NextResponse.json(
//       {
//         data: null,
//         error: 'Something went wrong',
//       },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  try {

    const { name, logo, primaryEmail,userId } = await request.json();



    // Gerekli alanları kontrol et
    if (!name) {
      return NextResponse.json(
        {
          data: null,
          error: "School name is required",
        },
        { status: 400 },
      );
    }

    // Oturum açmış kullanıcıyı kontrol et (isteğe bağlı: token ile doğrula)
    if (!userId) {
      return NextResponse.json(
        {
          data: null,
          error: "User ID is required to create a school",
        },
        { status: 400 },
      );
    }

    // Slug oluştur
    const slug = generateSlug(name);

    // Aynı isimde school var mı kontrol et
    const existingSchool = await db.school.findUnique({
      where: { slug },
    });

    if (existingSchool) {
      return NextResponse.json(
        {
          data: null,
          error: "School with this name already exists",
        },
        { status: 409 },
      );
    }

    const result = await db.$transaction(async (tx) => {
      // 1. Yeni school oluştur
      const newSchool = await tx.school.create({
        data: {
          name,
          slug,
          logo,
          primaryEmail,
        },
      });

      // 2. Kullanıcıyı bu okula bağla (schoolId ve schoolName güncelle)
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          schoolId: newSchool.id,
          schoolName: newSchool.name,
        },
      });

      return { newSchool, updatedUser };
    });

    console.log(
      `School created successfully: ${result.newSchool.name} (${result.newSchool.id}) and linked to user ${userId}`,
    );

    // Oluşturma zamanını çıkar
    const { createdAt, updatedAt, ...schoolData } = result.newSchool;

    return NextResponse.json(
      {
        data: {
          school: schoolData,
          user: {
            id: result.updatedUser.id,
            schoolId: result.updatedUser.schoolId,
            schoolName: result.updatedUser.schoolName,
          },
        },
        error: null,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST school error:", error);
    return NextResponse.json(
      {
        data: null,
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

// ==================== PUT İŞLEMLERİ (Tam Güncelleme) ====================
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { error: "School ID or slug is required" },
        { status: 400 },
      );
    }

    const data = await request.json();
    const where = id ? { id } : { slug: slug as string };

    // Eğer isim değiştiyse slug'ı güncelle
    if (data.name) {
      data.slug = generateSlug(data.name);
    }

    const updatedSchool = await db.school.update({
      where,
      data,
      select: {
        id: true,
        name: true,
        logo: true,
        slug: true,
        primaryEmail: true,
        sectionCount: true,
        siteEnabled: true,
        siteCompletion: true,
      },
    });

    return NextResponse.json({
      data: updatedSchool,
      error: null,
    });
  } catch (error) {
    console.error("PUT school error:", error);
    return NextResponse.json(
      {
        data: null,
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

// ==================== PATCH İŞLEMLERİ (Kısmi Güncelleme) ====================
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { error: "School ID or slug is required" },
        { status: 400 },
      );
    }

    const data = await request.json();
    const where = id ? { id } : { slug: slug as string };

    // Eğer isim değiştiyse slug'ı güncelle
    if (data.name) {
      data.slug = generateSlug(data.name);
    }

    const updatedSchool = await db.school.update({
      where,
      data,
      select: {
        id: true,
        name: true,
        logo: true,
        slug: true,
        primaryEmail: true,
        sectionCount: true,
        siteEnabled: true,
        siteCompletion: true,
      },
    });

    return NextResponse.json({
      data: updatedSchool,
      error: null,
    });
  } catch (error) {
    console.error("PATCH school error:", error);
    return NextResponse.json(
      {
        data: null,
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

// ==================== DELETE İŞLEMLERİ ====================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { error: "School ID or slug is required" },
        { status: 400 },
      );
    }

    const where = id ? { id } : { slug: slug as string };

    // School'u sil
    const deletedSchool = await db.school.delete({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    console.log(`School deleted successfully: ${deletedSchool.name}`);

    return NextResponse.json(
      {
        data: {
          message: "School deleted successfully",
          school: deletedSchool,
        },
        error: null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE school error:", error);
    return NextResponse.json(
      {
        data: null,
        error: "Failed to delete school",
      },
      { status: 500 },
    );
  }
}
