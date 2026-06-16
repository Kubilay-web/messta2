import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const subjectId = searchParams.get('subjectId');
    const examId = searchParams.get('examId');
    const termId = searchParams.get('termId');
    const schoolId = searchParams.get('schoolId');

    console.log("📥 Marksheet API Request:", { classId, subjectId, examId, termId, schoolId });

    // Gerekli parametreleri kontrol et
    if (!classId || !subjectId || !examId || !termId || !schoolId) {
      return NextResponse.json(
        { 
          data: null, 
          error: "Missing required parameters: classId, subjectId, examId, termId, schoolId" 
        },
        { status: 400 }
      );
    }

    // 1. Önce mevcut marksheet var mı kontrol et
    let marksheet = await db.marksheet.findFirst({
      where: {
        classId,
        subjectId,
        examId,
        termId,
      },
    });

    let markSheetId = marksheet?.id || "";

    // 2. Marksheet yoksa oluştur
    if (!marksheet) {
      marksheet = await db.marksheet.create({
        data: {
          classId,
          subjectId,
          examId,
          termId,
          title: `Marksheet - ${new Date().toLocaleDateString()}`,
        },
      });
      markSheetId = marksheet.id;
      console.log("✅ New marksheet created:", markSheetId);
    }

    // 3. Zaten not girilmiş öğrencileri bul
    const existingMarks = await db.studentMark.findMany({
      where: {
        subjectId,
        examId,
        termId,
        marksheetId: markSheetId,
      },
      select: { studentId: true },
    });

    const excludedStudentIds = existingMarks.map(m => m.studentId);

    // 4. Kalan öğrencileri getir (her seferinde 10 öğrenci)
    const students = await db.student.findMany({
      where: {
        classId,
        id: { notIn: excludedStudentIds },
      },
      select: {
        id: true,
        name: true,
        regNo: true,
      },
      orderBy: { name: "asc" },
      take: 10,
    });

    console.log(`📚 Found ${students.length} students to mark`);

    return NextResponse.json({
      data: {
        students,
        markSheetId,
        totalRemaining: students.length,
      },
      error: null,
    });

  } catch (error) {
    console.error('❌ Marksheet API error:', error);
    return NextResponse.json(
      { 
        data: null, 
        error: error instanceof Error ? error.message : 'Something went wrong' 
      },
      { status: 500 }
    );
  }
}