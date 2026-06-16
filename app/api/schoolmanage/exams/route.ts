import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { ExamCreateProps } from '../types/types';
import { convertDateToIso } from './convertDateToIso';

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const academicYear = searchParams.get('year');
    const examId = searchParams.get('id');

    // Tek bir exam detayı getir (id ile)
    if (examId) {
      const exam = await db.exam.findUnique({
        where: { id: examId },
        include: {
          examClasses: {
            include: {
              class: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
          examSubjects: {
            include: {
              subject: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
          studentMarks: {
            select: {
              id: true,
              studentId: true,
              marks: true,
              isAbsent: true,
            },
          },
          marksheets: true,
        },
      });

      if (!exam) {
        return NextResponse.json(
          { error: 'Exam not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: exam,
        error: null,
      });
    }

    // Akademik yıla göre exam'leri getir
    if (schoolId && academicYear) {
      const exams = await db.exam.findMany({
        where: {
          schoolId,
          academicYear: academicYear,
        },
        select: {
          id: true,
          title: true,
          examType: true,
          examCategory: true,
          termName: true,
          academicYear: true,
          startDate: true,
          duration: true,
          passingMark: true,
          totalMarks: true,
          weightage: true,
          _count: {
            select: {
              examClasses: true,
              examSubjects: true,
              studentMarks: true,
            },
          },
        },
        orderBy: {
          startDate: 'desc',
        },
      });

      return NextResponse.json({
        data: exams,
        error: null,
      });
    }

    // School'a göre tüm exam'leri getir
    if (schoolId) {
      const exams = await db.exam.findMany({
        where: { schoolId },
        select: {
          id: true,
          title: true,
          examType: true,
          examCategory: true,
          termName: true,
          academicYear: true,
          startDate: true,
        },
        orderBy: {
          startDate: 'desc',
        },
      });

      return NextResponse.json({
        data: exams,
        error: null,
      });
    }

    return NextResponse.json(
      { error: 'School ID is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('GET exams error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni Exam Oluştur) ====================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as ExamCreateProps;

    // Gerekli alanları kontrol et
    if (!data.title || !data.schoolId || !data.academicYear) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields: title, schoolId, academicYear',
        },
        { status: 400 }
      );
    }

    // 1. Exam'i oluştur
    const exam = await db.exam.create({
      data: {
        title: data.title,
        examType: data.examType,
        termName: data.termName,
        academicYear: data.academicYear,
        startDate: convertDateToIso(data.startDate),
        duration: data.duration,
        passingMark: data.passingMark,
        totalMarks: data.totalMarks,
        weightage: data.weightage,
        schoolId: data.schoolId,
        examCategory: data.examCategory,
      },
    });

    const examId = exam.id;
    const examTitle = exam.title;

    // 2. ExamClasses oluştur
    if (data.classes && data.classes.length > 0) {
      for (const item of data.classes) {
        await db.examClass.create({
          data: {
            examId: examId,
            examTitle: examTitle,
            classId: item.value,
            classTitle: item.label,
          },
        });
      }
    }

    // 3. ExamSubjects oluştur
    if (data.subjects && data.subjects.length > 0) {
      for (const item of data.subjects) {
        await db.examSubject.create({
          data: {
            examId: examId,
            examTitle: examTitle,
            subjectId: item.value,
            subjectTitle: item.label,
          },
        });
      }
    }

    console.log(`Exam created successfully: ${exam.title} (${exam.id})`);

    // Oluşturulan exam'i ilişkileriyle birlikte getir
    const createdExam = await db.exam.findUnique({
      where: { id: examId },
      include: {
        examClasses: true,
        examSubjects: true,
      },
    });

    return NextResponse.json(
      {
        data: createdExam,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST exam error:', error);
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
    const examId = searchParams.get('id');

    if (!examId) {
      return NextResponse.json(
        { error: 'Exam ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json() as ExamCreateProps;

    // Exam'i güncelle
    const updatedExam = await db.exam.update({
      where: { id: examId },
      data: {
        title: data.title,
        examType: data.examType,
        termName: data.termName,
        academicYear: data.academicYear,
        startDate: data.startDate ? convertDateToIso(data.startDate) : undefined,
        duration: data.duration,
        passingMark: data.passingMark,
        totalMarks: data.totalMarks,
        weightage: data.weightage,
        examCategory: data.examCategory,
      },
    });

    // ExamClasses'ları güncelle (önce sil, sonra ekle)
    if (data.classes) {
      await db.examClass.deleteMany({
        where: { examId },
      });

      for (const item of data.classes) {
        await db.examClass.create({
          data: {
            examId: examId,
            examTitle: updatedExam.title,
            classId: item.value,
            classTitle: item.label,
          },
        });
      }
    }

    // ExamSubjects'leri güncelle (önce sil, sonra ekle)
    if (data.subjects) {
      await db.examSubject.deleteMany({
        where: { examId },
      });

      for (const item of data.subjects) {
        await db.examSubject.create({
          data: {
            examId: examId,
            examTitle: updatedExam.title,
            subjectId: item.value,
            subjectTitle: item.label,
          },
        });
      }
    }

    return NextResponse.json({
      data: updatedExam,
      error: null,
    });
  } catch (error) {
    console.error('PUT exam error:', error);
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
    const examId = searchParams.get('id');

    if (!examId) {
      return NextResponse.json(
        { error: 'Exam ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Tarih varsa dönüştür
    if (data.startDate) {
      data.startDate = convertDateToIso(data.startDate);
    }

    const updatedExam = await db.exam.update({
      where: { id: examId },
      data,
    });

    return NextResponse.json({
      data: updatedExam,
      error: null,
    });
  } catch (error) {
    console.error('PATCH exam error:', error);
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
    const examId = searchParams.get('id');

    if (!examId) {
      return NextResponse.json(
        { error: 'Exam ID is required' },
        { status: 400 }
      );
    }

    // Önce ilişkili kayıtları sil (transaction ile)
    await db.$transaction([
      db.examClass.deleteMany({
        where: { examId },
      }),
      db.examSubject.deleteMany({
        where: { examId },
      }),
      db.studentMark.deleteMany({
        where: { examId },
      }),
      db.marksheet.deleteMany({
        where: { examId },
      }),
      db.exam.delete({
        where: { id: examId },
      }),
    ]);

    return NextResponse.json(
      {
        data: { message: 'Exam deleted successfully' },
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE exam error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}