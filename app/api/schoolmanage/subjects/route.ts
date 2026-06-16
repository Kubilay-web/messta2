import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { SubjectCreateProps } from '../types/types';

import { generateSlug } from '../generateSlug';

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const subjectId = searchParams.get('id');
    const type = searchParams.get('type'); // 'brief', 'detail', 'list'
    const departmentId = searchParams.get('departmentId');
    const teacherId = searchParams.get('teacherId');

    // Tek bir subject getir
    if (subjectId && type === 'detail') {
      const subject = await db.subject.findUnique({
        where: { id: subjectId },
        include: {
          department: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          teacher: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              designation: true,
            },
          },
          examSubjects: {
            include: {
              exam: {
                select: {
                  id: true,
                  title: true,
                  examType: true,
                  academicYear: true,
                },
              },
            },
          },
          studentMarks: {
            select: {
              id: true,
              marks: true,
              student: {
                select: {
                  id: true,
                  name: true,
                  regNo: true,
                },
              },
            },
            take: 10,
          },
          attendanceLogs: {
            select: {
              id: true,
              date: true,
              className: true,
            },
            take: 5,
          },
          _count: {
            select: {
              examSubjects: true,
              studentMarks: true,
              attendanceLogs: true,
            },
          },
        },
      });

      if (!subject) {
        return NextResponse.json(
          { error: 'Subject not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: subject,
        error: null,
      });
    }

    // Teacher'a göre subject'leri getir
    if (teacherId) {
      const subjects = await db.subject.findMany({
        where: { teacherId },
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          code: true,
          departmentName: true,
          class: {
            select: { title: true },
          },
        },
      });

      return NextResponse.json({
        data: subjects,
        error: null,
      });
    }

    // Department'a göre subject'leri getir
    if (departmentId) {
      const subjects = await db.subject.findMany({
        where: { departmentId },
        orderBy: { name: 'asc' },
        include: {
          teacher: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              studentMarks: true,
            },
          },
        },
      });

      return NextResponse.json({
        data: subjects,
        error: null,
      });
    }

    // Brief subjects (sadece id ve name)
    if (type === 'brief' && schoolId) {
      const subjects = await db.subject.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          schoolId,
        },
        select: {
          id: true,
          name: true,
          code: true,
        },
      });

      return NextResponse.json({
        data: subjects,
        error: null,
      });
    }

    // School'a göre subject'leri getir
    if (schoolId) {
      const subjects = await db.subject.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          schoolId,
        },
        include: {
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          teacher: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              studentMarks: true,
              examSubjects: true,
            },
          },
        },
      });

      return NextResponse.json({
        data: subjects,
        error: null,
      });
    }

    // Tüm subject'ler (filtresiz)
    const subjects = await db.subject.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: subjects,
      error: null,
    });
  } catch (error) {
    console.error('GET subjects error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to fetch subjects',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni Subject Oluştur) ====================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as SubjectCreateProps;

    // Gerekli alanları kontrol et
    if (!data.name || !data.schoolId) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields: name, schoolId',
        },
        { status: 400 }
      );
    }

    // Slug oluştur
    const slug = generateSlug(data.name);
    data.slug = slug;

    // Aynı isimde subject var mı kontrol et
    const existingSubject = await db.subject.findUnique({
      where: { slug },
    });

    if (existingSubject) {
      return NextResponse.json(
        {
          data: null,
          error: 'Subject Already exists',
        },
        { status: 409 }
      );
    }

    // Subject kodunu kontrol et
    if (data.code) {
      const existingCode = await db.subject.findFirst({
        where: {
          code: data.code,
          schoolId: data.schoolId,
        },
      });

      if (existingCode) {
        return NextResponse.json(
          {
            data: null,
            error: 'Subject with this code already exists',
          },
          { status: 409 }
        );
      }
    }

    // Yeni subject oluştur
    const newSubject = await db.subject.create({
      data,
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    console.log(`Subject created successfully: ${newSubject.name} (${newSubject.id})`);

    return NextResponse.json(
      {
        data: newSubject,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST subject error:', error);
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
    const subjectId = searchParams.get('id');

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json() as SubjectCreateProps;

    // Eğer isim değiştiyse slug'ı güncelle
    if (data.name) {
      data.slug = generateSlug(data.name);
    }

    const updatedSubject = await db.subject.update({
      where: { id: subjectId },
      data,
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: updatedSubject,
      error: null,
    });
  } catch (error) {
    console.error('PUT subject error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to update subject',
      },
      { status: 500 }
    );
  }
}

// ==================== PATCH İŞLEMLERİ (Kısmi Güncelleme) ====================
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('id');

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Eğer isim değiştiyse slug'ı güncelle
    if (data.name) {
      data.slug = generateSlug(data.name);
    }

    const updatedSubject = await db.subject.update({
      where: { id: subjectId },
      data,
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: updatedSubject,
      error: null,
    });
  } catch (error) {
    console.error('PATCH subject error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to update subject',
      },
      { status: 500 }
    );
  }
}

// ==================== DELETE İŞLEMLERİ ====================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('id');

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    // Önce ilişkili kayıtları kontrol et
    const subject = await db.subject.findUnique({
      where: { id: subjectId },
      include: {
        _count: {
          select: {
            examSubjects: true,
            studentMarks: true,
            attendanceLogs: true,
          },
        },
      },
    });

    if (!subject) {
      return NextResponse.json(
        { error: 'Subject not found' },
        { status: 404 }
      );
    }

    // İlişkili kayıtlar varsa transaction ile sil
    if (subject._count.examSubjects > 0 || subject._count.studentMarks > 0 || subject._count.attendanceLogs > 0) {
      await db.$transaction([
        db.examSubject.deleteMany({ where: { subjectId } }),
        db.studentMark.deleteMany({ where: { subjectId } }),
        db.attendanceLog.deleteMany({ where: { subjectId } }),
        db.subject.delete({ where: { id: subjectId } }),
      ]);
    } else {
      // Doğrudan sil
      await db.subject.delete({
        where: { id: subjectId },
      });
    }

    console.log(`Subject deleted successfully: ${subject.name}`);

    return NextResponse.json(
      {
        data: { 
          message: 'Subject deleted successfully',
          name: subject.name 
        },
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE subject error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to delete subject',
      },
      { status: 500 }
    );
  }
}