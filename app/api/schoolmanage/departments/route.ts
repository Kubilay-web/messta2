import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { generateSlug } from '../generateSlug';
import { DepartmentCreateProps } from '../types/types';

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const type = searchParams.get('type'); // 'brief' veya 'full'
    const id = searchParams.get('id');

    // Tek bir department getir (id ile)
    if (id) {
      const department = await db.department.findUnique({
        where: { id },
        include: {
          teachers: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              designation: true,
            },
          },
          subjects: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      });

      if (!department) {
        return NextResponse.json(
          { error: 'Department not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(department);
    }

    // Brief departments (sadece id ve name)
    if (type === 'brief' && schoolId) {
      const departments = await db.department.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          schoolId,
        },
        select: {
          id: true,
          name: true,
        },
      });
      return NextResponse.json(departments);
    }

    // School'a göre department'ları getir
    if (schoolId) {
      const departments = await db.department.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          schoolId,
        },
        include: {
          teachers: true,
          subjects: true,
        },
      });
      return NextResponse.json(departments);
    }

    // Tüm department'lar (filtresiz)
    const departments = await db.department.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        teachers: true,
        subjects: true,
      },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error('GET departments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni Department Oluştur) ====================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as DepartmentCreateProps;
    
    // Slug oluştur
    const slug = generateSlug(data.name);
    data.slug = slug;

    // Aynı isimde department var mı kontrol et
    const existingDepartment = await db.department.findUnique({
      where: {
        slug,
      },
    });

    if (existingDepartment) {
      return NextResponse.json(
        {
          data: null,
          error: 'Department Already exists',
        },
        { status: 409 }
      );
    }

    // Yeni department oluştur
    const newDepartment = await db.department.create({
      data,
    });

    console.log(
      `Department created successfully: ${newDepartment.name} (${newDepartment.id})`
    );

    return NextResponse.json(
      {
        data: newDepartment,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST department error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== PUT İŞLEMLERİ (Tam Güncelleme) ====================
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Department ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json() as DepartmentCreateProps;

    // Eğer name değiştiyse slug'ı güncelle
    if (data.name) {
      data.slug = generateSlug(data.name);
    }

    const updatedDepartment = await db.department.update({
      where: { id },
      data,
      include: {
        teachers: true,
        subjects: true,
      },
    });

    return NextResponse.json(updatedDepartment);
  } catch (error) {
    console.error('PUT department error:', error);
    return NextResponse.json(
      { error: 'Failed to update department' },
      { status: 500 }
    );
  }
}

// ==================== PATCH İŞLEMLERİ (Kısmi Güncelleme) ====================
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Department ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Eğer name değiştiyse slug'ı güncelle
    if (data.name) {
      data.slug = generateSlug(data.name);
    }

    const updatedDepartment = await db.department.update({
      where: { id },
      data,
      include: {
        teachers: true,
        subjects: true,
      },
    });

    return NextResponse.json(updatedDepartment);
  } catch (error) {
    console.error('PATCH department error:', error);
    return NextResponse.json(
      { error: 'Failed to update department' },
      { status: 500 }
    );
  }
}

// ==================== DELETE İŞLEMLERİ ====================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Department ID is required' },
        { status: 400 }
      );
    }

    // Department'ı sil
    const deletedDepartment = await db.department.delete({
      where: { id },
    });

    return NextResponse.json(
      deletedDepartment,
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE department error:', error);
    return NextResponse.json(
      { error: 'Failed to delete department' },
      { status: 500 }
    );
  }
}