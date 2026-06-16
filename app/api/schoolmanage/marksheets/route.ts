import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { CreateMarkSheetProps } from '../types/types';

// Type definitions
type Grade = "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "F";

function calculateGrade(marks: number): Grade {
  if (marks >= 95) return "A+";
  if (marks >= 90) return "A";
  if (marks >= 85) return "B+";
  if (marks >= 80) return "B";
  if (marks >= 75) return "C+";
  if (marks >= 70) return "C";
  if (marks >= 60) return "D";
  return "F";
}

function removeDuplicatesById<T extends { id: string }>(array: T[]): T[] {
  const seen = new Set<string>();
  return array.filter((item) => {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      return true;
    }
    return false;
  });
}

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subjectId');
    const classId = searchParams.get('classId');
    const termId = searchParams.get('termId');
    const examId = searchParams.get('examId');
    const marksheetId = searchParams.get('id');

    // Tek bir marksheet getir
    if (marksheetId) {
      const marksheet = await db.marksheet.findUnique({
        where: { id: marksheetId },
        include: {
          exam: true,
          class: true,
          subject: true,
          term: true,
          marks: {
            include: {
              student: {
                select: {
                  id: true,
                  name: true,
                  firstName: true,
                  lastName: true,
                  regNo: true,
                },
              },
            },
            orderBy: {
              marks: 'desc',
            },
          },
        },
      });

      if (!marksheet) {
        return NextResponse.json(
          { error: 'Marksheet not found' },
          { status: 404 }
        );
      }

      // Pozisyon hesapla
      let currentRank = 1;
      let lastMarks: number | null = null;

      const formattedMarks = marksheet.marks.map((mark, index) => {
        if (index === 0) {
          lastMarks = mark.marks;
        } else if (lastMarks !== mark.marks) {
          currentRank = index + 1;
          lastMarks = mark.marks;
        }

        return {
          id: mark.student.id.slice(-3).toUpperCase(),
          name: mark.student.name || `${mark.student.firstName} ${mark.student.lastName}`,
          regNo: mark.student.regNo,
          marks: mark.marks || 0,
          position: currentRank,
          grade: calculateGrade(mark.marks || 0),
          isAbsent: mark.isAbsent,
          comments: mark.comments,
        };
      });

      return NextResponse.json({
        data: {
          ...marksheet,
          formattedMarks,
        },
        error: null,
      });
    }

    // Subject marksheet getir
    if (subjectId && classId && termId && examId) {
      const studentMarks = await db.studentMark.findMany({
        where: {
          examId,
          subject: {
            id: subjectId,
          },
          termId,
          student: {
            classId,
          },
        },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              firstName: true,
              lastName: true,
              regNo: true,
            },
          },
        },
        orderBy: {
          marks: 'desc',
        },
      });

      // Pozisyon hesapla
      let currentRank = 1;
      let lastMarks: number | null = null;

      const formattedStudentMarks = studentMarks.map((mark, index) => {
        if (index === 0) {
          lastMarks = mark.marks;
        } else if (lastMarks !== mark.marks) {
          currentRank = index + 1;
          lastMarks = mark.marks;
        }

        return {
          id: mark.student.id.slice(-3).toUpperCase(),
          name: mark.student.name || `${mark.student.firstName} ${mark.student.lastName}`,
          regNo: mark.student.regNo,
          marks: mark.marks || 0,
          position: currentRank,
          grade: calculateGrade(mark.marks || 0),
          isAbsent: mark.isAbsent,
          comments: mark.comments,
        };
      });

      return NextResponse.json({
        data: formattedStudentMarks,
        error: null,
      });
    }

    // Tüm marksheet'leri getir (filtreli)
    const where: any = {};
    if (subjectId) where.subjectId = subjectId;
    if (classId) where.classId = classId;
    if (termId) where.termId = termId;
    if (examId) where.examId = examId;

    const marksheets = await db.marksheet.findMany({
      where,
      include: {
        exam: {
          select: { title: true, examType: true },
        },
        class: {
          select: { title: true },
        },
        subject: {
          select: { name: true, code: true },
        },
        term: {
          select: { term: true, year: true },
        },
        _count: {
          select: { marks: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      data: marksheets,
      error: null,
    });
  } catch (error) {
    console.error('GET marksheets error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni Marksheet Oluştur) ====================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as CreateMarkSheetProps;
    console.log("Received Data=>", data);

    // Gerekli alanları kontrol et
    if (!data.examId || !data.classId || !data.subjectId || !data.termId) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields: examId, classId, subjectId, termId',
        },
        { status: 400 }
      );
    }

    // 1. Marksheet'i oluştur
    const markSheet = await db.marksheet.create({
      data: {
        examId: data.examId,
        classId: data.classId,
        subjectId: data.subjectId,
        termId: data.termId,
        title: `Marksheet - ${new Date().toLocaleDateString()}`,
      },
    });

    console.log(`Marksheet Created=> ${markSheet.id}`);
    const marksheetId = markSheet.id;

    // 2. Student Marks'leri oluştur
    if (data.studentMarks && data.studentMarks.length > 0) {
      for (const item of data.studentMarks) {
        const stMark = await db.studentMark.create({
          data: {
            examId: data.examId,
            studentId: item.studentId,
            subjectId: data.subjectId,
            classId: data.classId,
            termId: data.termId,
            marks: item.marks,
            isAbsent: item.isAbsent || false,
            comments: item.comments,
            marksheetId,
          },
        });
        console.log(`New Mark Created=>${stMark.id}`);
      }
    }

    // 3. Sonraki batch öğrencileri getir
    const studentMarks = await db.studentMark.findMany({
      where: {
        subjectId: data.subjectId,
      },
      select: {
        studentId: true,
      },
    });

    const excludedStudentIds = studentMarks.map((item) => item.studentId);
    console.log("Excluded students Ids", excludedStudentIds);

    const students = await db.student.findMany({
      orderBy: {
        name: "asc",
      },
      where: {
        classId: data.classId,
        id: {
          notIn: excludedStudentIds,
        },
      },
      select: {
        name: true,
        id: true,
        regNo: true,
      },
      take: 4,
    });

    console.log("Next Batch of Students", students);

    return NextResponse.json({
      data: {
        marksheet: markSheet,
        nextBatch: students,
      },
      error: null,
    }, { status: 201 });
  } catch (error) {
    console.error('POST marksheet error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== PUT İŞLEMLERİ (Güncelleme) ====================
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const marksheetId = searchParams.get('id');

    if (!marksheetId) {
      return NextResponse.json(
        { error: 'Marksheet ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json() as CreateMarkSheetProps;
    console.log("Received Data for Update=>", data);

    // Student Marks'leri oluştur
    if (data.studentMarks && data.studentMarks.length > 0) {
      for (const item of data.studentMarks) {
        const stMark = await db.studentMark.create({
          data: {
            examId: data.examId,
            studentId: item.studentId,
            subjectId: data.subjectId,
            termId: data.termId,
            marks: item.marks,
            isAbsent: item.isAbsent || false,
            comments: item.comments,
            marksheetId,
          },
        });
        console.log(`New Mark Created=>${stMark.id}`);
      }
    }

    // Sonraki batch öğrencileri getir
    const studentMarks = await db.studentMark.findMany({
      where: {
        subjectId: data.subjectId,
      },
      select: {
        studentId: true,
      },
    });

    const excludedStudentIds = studentMarks.map((item) => item.studentId);

    const students = await db.student.findMany({
      orderBy: {
        name: "asc",
      },
      where: {
        classId: data.classId,
        id: {
          notIn: excludedStudentIds,
        },
      },
      select: {
        name: true,
        id: true,
        regNo: true,
      },
      take: 4,
    });

    console.log("Next Batch of Students", students);

    return NextResponse.json({
      data: students,
      error: null,
    });
  } catch (error) {
    console.error('PUT marksheet error:', error);
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
    const markId = searchParams.get('markId');
    const marksheetId = searchParams.get('id');

    // Tek bir student mark güncelle
    if (markId) {
      const data = await request.json();
      const updatedMark = await db.studentMark.update({
        where: { id: markId },
        data: {
          marks: data.marks,
          isAbsent: data.isAbsent,
          comments: data.comments,
        },
      });

      return NextResponse.json({
        data: updatedMark,
        error: null,
      });
    }

    // Marksheet bilgilerini güncelle
    if (marksheetId) {
      const data = await request.json();
      const updatedMarksheet = await db.marksheet.update({
        where: { id: marksheetId },
        data: {
          title: data.title,
          status: data.status,
        },
      });

      return NextResponse.json({
        data: updatedMarksheet,
        error: null,
      });
    }

    return NextResponse.json(
      { error: 'Either markId or marksheetId is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('PATCH marksheet error:', error);
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
    const marksheetId = searchParams.get('id');
    const markId = searchParams.get('markId');

    // Tek bir student mark sil
    if (markId) {
      await db.studentMark.delete({
        where: { id: markId },
      });

      return NextResponse.json({
        data: { message: 'Student mark deleted successfully' },
        error: null,
      });
    }

    // Tüm marksheet'i sil (ilişkili kayıtlarla birlikte)
    if (marksheetId) {
      await db.$transaction([
        db.studentMark.deleteMany({
          where: { marksheetId },
        }),
        db.marksheet.delete({
          where: { id: marksheetId },
        }),
      ]);

      return NextResponse.json({
        data: { message: 'Marksheet deleted successfully' },
        error: null,
      });
    }

    return NextResponse.json(
      { error: 'Either marksheetId or markId is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('DELETE marksheet error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}