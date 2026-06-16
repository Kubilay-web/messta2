import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { ParentCreateProps } from '../types/types';
import { convertDateToIso } from '../exams/convertDateToIso';
// import bcrypt from 'bcrypt';


import { hash } from "@node-rs/argon2";

import { UserRoleSchool } from '@prisma/client';

// ==================== YARDIMCI FONKSİYONLAR ====================


async function createUserService(data: {
  email: string;
  password: string;
  role: UserRoleSchool;
  name: string;
  phone: string;
  image?: string;
  schoolId: string;
  schoolName: string;
  username:string;
}) {
  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash password
  // const hashedPassword = await bcrypt.hash(data.password, 10);


  const hashedPassword = await hash(data.password);

  // User data - role alanını ve roleschool alanını doğru şekilde ayır
  const userData = {
    name: data.name,
    username:data.name,
    email: data.email,
    phone: data.phone,
    passwordHash: hashedPassword,
    image: data.image,
    schoolId: data.schoolId,
    schoolName: data.schoolName,
    role: "USER", // Role enum'unda USER olmalı
    roleschool: data.role, // "PARENT", "TEACHER", "STUDENT", "SECRETARY", "LIBRARIAN"
  };

  const newUser = await db.user.create({
    data: userData,
  });

  console.log(`User created successfully: ${newUser.name} (${newUser.id})`);
  return newUser;
}




// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const parentId = searchParams.get('id');
    const type = searchParams.get('type'); // 'detail', 'brief', 'list'

    // Tek bir parent getir (id ile)
    if (parentId && type === 'detail') {
      const parent = await db.parent.findUnique({
        where: { id: parentId },
        include: {
          user: {
            select: {
              email: true,
              image: true,
              createdAt: true,
            },
          },
          students: {
            select: {
              id: true,
              name: true,
              regNo: true,
              class: {
                select: { title: true },
              },
            },
          },
          schoolFeesPayments: {
            include: {
              schoolFee: true,
              period: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 10,
          },
        },
      });

      if (!parent) {
        return NextResponse.json(
          { error: 'Parent not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: parent,
        error: null,
      });
    }

    // Brief parents (sadece id, firstName, lastName)
    if (type === 'brief' && schoolId) {
      const parents = await db.parent.findMany({
        where: { schoolId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
        orderBy: {
          firstName: 'asc',
        },
      });

      return NextResponse.json({
        data: parents,
        error: null,
      });
    }

    // School'a göre parent'ları getir
    if (schoolId) {
      const parents = await db.parent.findMany({
        where: { schoolId },
        include: {
          user: {
            select: {
              email: true,
              image: true,
            },
          },
          students: {
            select: {
              id: true,
              name: true,
              regNo: true,
            },
          },
          _count: {
            select: {
              students: true,
              schoolFeesPayments: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json({
        data: parents,
        error: null,
      });
    }

    // Tüm parent'lar (filtresiz)
    const parents = await db.parent.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            email: true,
            image: true,
          },
        },
        students: {
          select: {
            id: true,
            name: true,
            regNo: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: parents,
      error: null,
    });
  } catch (error) {
    console.error('GET parents error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni Parent Oluştur) ====================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as ParentCreateProps;
    
    // Tarih formatını dönüştür
    if (data.dob) {
      data.dob = convertDateToIso(data.dob);
    }

    // Gerekli alanları kontrol et
    if (!data.email || !data.password || !data.NIN || !data.phone) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields: email, password, NIN, phone',
        },
        { status: 400 }
      );
    }

    // Benzersiz alanları kontrol et
    const [existingEmail, existingNIN, existingPhone] = await Promise.all([
      db.parent.findUnique({ where: { email: data.email } }),
      db.parent.findUnique({ where: { NIN: data.NIN } }),
      db.parent.findUnique({ where: { phone: data.phone } }),
    ]);

    if (existingNIN) {
      return NextResponse.json(
        {
          data: null,
          error: 'Parent with this NIN already exists',
        },
        { status: 409 }
      );
    }

    if (existingEmail) {
      return NextResponse.json(
        {
          data: null,
          error: 'Parent with this email already exists',
        },
        { status: 409 }
      );
    }

    if (existingPhone) {
      return NextResponse.json(
        {
          data: null,
          error: 'Parent with this Phone already exists',
        },
        { status: 409 }
      );
    }

    // User data hazırla
    const userData = {
      email: data.email,
      password: data.password,
      role: "PARENT" as UserRoleSchool,
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      image: data.imageUrl,
      schoolId: data.schoolId,
      schoolName: data.schoolName,
    };

    // User oluştur
    const user = await createUserService(userData);
    data.userId = user.id;

    // Parent oluştur
    const newParent = await db.parent.create({
      data,
      include: {
        user: {
          select: {
            email: true,
            image: true,
          },
        },
        students: true,
      },
    });

    console.log(
      `Parent created successfully: ${newParent.firstName} ${newParent.lastName} (${newParent.id})`
    );

    return NextResponse.json(
      {
        data: newParent,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST parent error:', error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== PUT İŞLEMLERİ (Tam Güncelleme) ====================
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('id');

    if (!parentId) {
      return NextResponse.json(
        { error: 'Parent ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json() as ParentCreateProps;

    // Tarih formatını dönüştür
    if (data.dob) {
      data.dob = convertDateToIso(data.dob);
    }

    // Parent'ı güncelle
    const updatedParent = await db.parent.update({
      where: { id: parentId },
      data,
      include: {
        user: {
          select: {
            email: true,
            image: true,
          },
        },
        students: true,
      },
    });

    // User bilgilerini de güncelle
    if (data.firstName || data.lastName || data.phone || data.imageUrl) {
      await db.user.update({
        where: { id: updatedParent.userId },
        data: {
          name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : undefined,
          phone: data.phone,
          image: data.imageUrl,
        },
      });
    }

    return NextResponse.json({
      data: updatedParent,
      error: null,
    });
  } catch (error) {
    console.error('PUT parent error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== PATCH İŞLEMLERİ (Kısmi Güncelleme) ====================
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('id');

    if (!parentId) {
      return NextResponse.json(
        { error: 'Parent ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Tarih varsa dönüştür
    if (data.dob) {
      data.dob = convertDateToIso(data.dob);
    }

    // Parent'ı güncelle
    const updatedParent = await db.parent.update({
      where: { id: parentId },
      data,
      include: {
        user: {
          select: {
            email: true,
            image: true,
          },
        },
      },
    });

    // User bilgilerini de güncelle (eğer varsa)
    if (data.firstName || data.lastName || data.phone || data.imageUrl) {
      await db.user.update({
        where: { id: updatedParent.userId },
        data: {
          name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : undefined,
          phone: data.phone,
          image: data.imageUrl,
        },
      });
    }

    return NextResponse.json({
      data: updatedParent,
      error: null,
    });
  } catch (error) {
    console.error('PATCH parent error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== DELETE İŞLEMLERİ ====================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('id');

    if (!parentId) {
      return NextResponse.json(
        { error: 'Parent ID is required' },
        { status: 400 }
      );
    }

    // Parent bilgilerini al (userId için)
    const parent = await db.parent.findUnique({
      where: { id: parentId },
      select: { userId: true },
    });

    if (!parent) {
      return NextResponse.json(
        { error: 'Parent not found' },
        { status: 404 }
      );
    }

    // Transaction ile parent ve user'ı sil
    await db.$transaction([
      db.schoolFeePayment.deleteMany({
        where: { parentProfileId: parentId },
      }),
      db.parent.delete({
        where: { id: parentId },
      }),
      db.user.delete({
        where: { id: parent.userId },
      }),
    ]);

    return NextResponse.json(
      {
        data: { message: 'Parent deleted successfully' },
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE parent error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}