import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { ExamCategory, ExamType } from '@prisma/client';

// ==================== TİP TANIMLAMALARI ====================
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  regNo: string;
  classTitle: string | null;
  streamTitle: string | null;
  stream?: {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    schoolId: string;
    classId: string;
  };
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  schoolId?: string;
  schoolName?: string;
}

interface Mark {
  id?: string;
  studentId: string;
  marksheetId?: string | null;
  marks: number | null;
  comments: string | null;
  student: Student;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Subject {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  schoolId?: string;
}

interface Exam {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  schoolId: string;
  title: string;
  examType: ExamType;
  termName: number;
  academicYear: string;
  startDate: Date;
  duration: number;
  passingMark: number;
  totalMarks: number;
  weightage: number;
  examCategory: ExamCategory;
  endDate?: Date;
  status?: string;
  comments?: string;
}

interface Marksheet {
  id?: string;
  classId: string;
  termId: string;
  examId: string;
  exam: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    schoolId: string;
    title: string;
    examType: ExamType;
    termName: number;
    academicYear: string;
    startDate: Date;
    duration: number;
    passingMark: number;
    totalMarks: number;
    weightage: number;
    examCategory: ExamCategory;
    endDate?: Date;
    status?: string;
    comments?: string;
  };
  subject: Subject;
  marks: Mark[];
  createdAt?: Date;
  updatedAt?: Date;
  schoolId?: string;
}

interface ClassInfo {
  id: string;
  title: string;
  classTeacherName: string | null;
}

interface TermInfo {
  id: string;
  term: string;
  year: string | number;
}

interface SubjectResult {
  name: string;
  beginningTerm: number | null;
  midTerm: number | null;
  endTerm: number | null;
  average?: number;
  grade: string | null;
  comment: string | null;
}

interface StudentResult {
  name: string;
  admissionNumber: string;
  class: string;
  stream: string;
  subjects: SubjectResult[];
  teacherComment: string;
}

interface ClassReportData {
  className: string | undefined;
  term: string | undefined;
  year: string | number | undefined;
  teacher: string | null | undefined;
  students: StudentResult[];
}

type ExamCategoryMap = {
  [key in ExamCategory]: "beginningTerm" | "midTerm" | "endTerm";
};

interface MarksheetsByExam {
  [category: string]: Marksheet[];
}

// ==================== YARDIMCI FONKSİYONLAR ====================
function calculateGrade(marks: number): string {
  if (marks >= 90) return "A+";
  if (marks >= 85) return "A";
  if (marks >= 80) return "A-";
  if (marks >= 75) return "B+";
  if (marks >= 70) return "B";
  if (marks >= 65) return "B-";
  if (marks >= 60) return "C+";
  if (marks >= 55) return "C";
  if (marks >= 50) return "C-";
  if (marks >= 45) return "D+";
  if (marks >= 40) return "D";
  return "F";
}

async function getClassReportData(
  classId: string,
  termId: string,
  examIds: string[]
): Promise<ClassReportData> {
  // Get all marksheets for the specified class, term, and exams
  const marksheets = await db.marksheet.findMany({
    where: {
      classId: classId,
      termId: termId,
      examId: {
        in: examIds,
      },
    },
    include: {
      exam: true,
      subject: true,
      marks: {
        include: {
          student: {
            include: {
              stream: true,
            },
          },
        },
      },
    },
  });

  if (!marksheets.length) {
    throw new Error("No marksheets found for the given criteria");
  }

  // Extract class information from the first marksheet
  const classInfo = await db.class.findFirst({
    where: {
      id: classId,
    },
  }) as ClassInfo | null;

  const termInfo = await db.period.findFirst({
    where: {
      id: termId,
    },
  }) as TermInfo | null;

  // Map exam categories to their respective positions
  const examCategoryMap: ExamCategoryMap = {
    [ExamCategory.TERM_START]: "beginningTerm",
    [ExamCategory.MID_TERM]: "midTerm",
    [ExamCategory.END_TERM]: "endTerm",
  };

  // Group marksheets by exam category
  const marksheetsByExam: MarksheetsByExam = {};
  marksheets.forEach((marksheet) => {
    const category = marksheet.exam.examCategory;
    if (!marksheetsByExam[category]) {
      marksheetsByExam[category] = [];
    }
    marksheetsByExam[category].push(marksheet);
  });

  // Get unique students from all marksheets
  const studentMap = new Map<string, Student>();
  marksheets.forEach((marksheet) => {
    marksheet.marks.forEach((mark) => {
      if (!studentMap.has(mark.student.id)) {
        studentMap.set(mark.student.id, mark.student);
      }
    });
  });

  // Process students data to match the required format
  const processedStudents: StudentResult[] = Array.from(
    studentMap.values()
  ).map((student) => {
    // Initialize subjects data structure
    const subjectsMap: Record<string, SubjectResult> = {};

    // Process each marksheet for this student
    marksheets.forEach((marksheet) => {
      const subjectId = marksheet.subject.id;
      const examCategory = marksheet.exam.examCategory;
      const mappedCategory = examCategoryMap[examCategory];

      // Initialize subject if not already done
      if (!subjectsMap[subjectId]) {
        subjectsMap[subjectId] = {
          name: marksheet.subject.name,
          beginningTerm: null,
          midTerm: null,
          endTerm: null,
          grade: null,
          comment: null,
        };
      }

      // Find student's mark for this marksheet
      const studentMark = marksheet.marks.find(
        (mark) => mark.studentId === student.id
      );
      if (studentMark && mappedCategory) {
        subjectsMap[subjectId][mappedCategory] = studentMark.marks;
        subjectsMap[subjectId].comment = studentMark.comments;
      }
    });

    // Calculate grade for each subject
    Object.values(subjectsMap).forEach((subject: SubjectResult) => {
      // Calculate average based on available marks
      const validMarks = [
        subject.beginningTerm,
        subject.midTerm,
        subject.endTerm,
      ].filter((m) => m !== null && m !== undefined) as number[];

      if (validMarks.length > 0) {
        const average =
          validMarks.reduce((sum, mark) => sum + mark, 0) / validMarks.length;
        subject.average = Math.round(average * 10) / 10; // Round to 1 decimal place
        subject.grade = calculateGrade(subject.average);
      }
    });

    return {
      name: `${student.firstName} ${student.lastName}`,
      admissionNumber: student.regNo,
      class: student.classTitle || "",
      stream: student.streamTitle || "",
      subjects: Object.values(subjectsMap),
      teacherComment: "",
    };
  });

  // Format the final response
  const response: ClassReportData = {
    className: classInfo?.title,
    term: termInfo?.term,
    year: termInfo?.year,
    teacher: classInfo?.classTeacherName,
    students: processedStudents,
  };

  return response;
}

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const termId = searchParams.get('termId');
    const examIdsStr = searchParams.get('examIds');
    const studentId = searchParams.get('studentId');
    const type = searchParams.get('type'); // 'class', 'student', 'summary'

    // Class report card
    if (classId && termId && examIdsStr) {
      const examIds = examIdsStr.split(',');
      
      if (examIds.length === 0) {
        return NextResponse.json(
          { error: 'At least one exam ID is required' },
          { status: 400 }
        );
      }

      const reportData = await getClassReportData(classId, termId, examIds);
      
      return NextResponse.json({
        data: reportData,
        error: null,
      });
    }

    // Student report card
    if (studentId && termId) {
      const student = await db.student.findUnique({
        where: { id: studentId },
        include: {
          class: true,
          stream: true,
        },
      });

      if (!student) {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        );
      }

      // Get all exams for this term
      const exams = await db.exam.findMany({
        where: {
          termName: parseInt(termId) || undefined,
          academicYear: new Date().getFullYear().toString(),
        },
        select: { id: true },
      });

      const examIds = exams.map(e => e.id);
      
      if (examIds.length === 0) {
        return NextResponse.json(
          { error: 'No exams found for this term' },
          { status: 404 }
        );
      }

      const reportData = await getClassReportData(student.classId, termId, examIds);
      
      // Filter for specific student
      const studentReport = reportData.students.find(
        s => s.admissionNumber === student.regNo
      );

      return NextResponse.json({
        data: {
          ...reportData,
          students: studentReport ? [studentReport] : [],
        },
        error: null,
      });
    }

    // Summary report
    if (type === 'summary' && classId && termId) {
      const exams = await db.exam.findMany({
        where: {
          termName: parseInt(termId) || undefined,
        },
        select: { id: true },
      });

      const examIds = exams.map(e => e.id);
      
      if (examIds.length === 0) {
        return NextResponse.json(
          { error: 'No exams found for this term' },
          { status: 404 }
        );
      }

      const reportData = await getClassReportData(classId, termId, examIds);

      // Calculate class statistics
      const subjectStats: Record<string, { total: number; count: number; max: number; min: number }> = {};
      
      reportData.students.forEach(student => {
        student.subjects.forEach(subject => {
          if (subject.average) {
            if (!subjectStats[subject.name]) {
              subjectStats[subject.name] = { total: 0, count: 0, max: 0, min: 100 };
            }
            subjectStats[subject.name].total += subject.average;
            subjectStats[subject.name].count += 1;
            subjectStats[subject.name].max = Math.max(subjectStats[subject.name].max, subject.average);
            subjectStats[subject.name].min = Math.min(subjectStats[subject.name].min, subject.average);
          }
        });
      });

      const subjectAverages = Object.entries(subjectStats).map(([name, stats]) => ({
        name,
        average: Math.round((stats.total / stats.count) * 10) / 10,
        max: stats.max,
        min: stats.min,
      }));

      const classAverage = subjectAverages.reduce((sum, s) => sum + s.average, 0) / subjectAverages.length || 0;

      return NextResponse.json({
        data: {
          className: reportData.className,
          term: reportData.term,
          year: reportData.year,
          totalStudents: reportData.students.length,
          classAverage: Math.round(classAverage * 10) / 10,
          subjectAverages,
          topStudent: reportData.students.reduce((top, current) => {
            const currentAvg = current.subjects.reduce((sum, s) => sum + (s.average || 0), 0) / current.subjects.length;
            const topAvg = top.subjects.reduce((sum, s) => sum + (s.average || 0), 0) / top.subjects.length;
            return currentAvg > topAvg ? current : top;
          }, reportData.students[0]),
        },
        error: null,
      });
    }

    return NextResponse.json(
      { error: 'Missing required parameters: classId, termId, examIds' },
      { status: 400 }
    );
  } catch (error) {
    console.error('GET report card error:', error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Rapor Oluştur/PDF) ====================
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'generate', 'export'

    const body = await request.json();
    const { classId, termId, examIds, studentIds } = body;

    if (type === 'export') {
      // PDF export işlemi
      const reportData = await getClassReportData(classId, termId, examIds);
      
      // PDF oluşturma mantığı buraya gelecek
      // Şimdilik sadece veriyi döndürüyoruz
      
      return NextResponse.json({
        data: {
          message: 'Report ready for export',
          report: reportData,
        },
        error: null,
      });
    }

    // Varsayılan: Rapor oluştur
    const reportData = await getClassReportData(classId, termId, examIds);

    return NextResponse.json({
      data: reportData,
      error: null,
    });
  } catch (error) {
    console.error('POST report card error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}