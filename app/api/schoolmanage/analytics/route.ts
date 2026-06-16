import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";

// Define the interfaces for our nested fee structure
interface FeeLine {
  id: string;
  amount: number;
  feeStatus: "PAID" | "NOT_PAID";
}

interface FeeGroup {
  id: string;
  term: string;
  year: number;
  fees: FeeLine[];
}

// Define return type for our calculation function
interface FeeCalculationResult {
  totalPaid: number;
  totalPending: number;
}

// Yardımcı fonksiyon - fee hesaplama
function calculateFeeTotals(feeGroups: FeeGroup[]): FeeCalculationResult {
  // First, flatten all fee lines from all fee groups
  const allFeeLines: FeeLine[] = feeGroups.flatMap((group) => group.fees);

  // Calculate totals from the flattened array
  const totalPaid = allFeeLines
    .filter((fee) => fee.feeStatus === "PAID")
    .reduce((sum, fee) => sum + fee.amount, 0);

  const totalPending = allFeeLines
    .filter((fee) => fee.feeStatus === "NOT_PAID")
    .reduce((sum, fee) => sum + fee.amount, 0);

  return { totalPaid, totalPending };
}

// Ana GET handler - tüm analytics işlemleri
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const type = searchParams.get('type'); // 'school', 'teacher', 'public'

    // Public stats (schoolId gerekmez)
    if (type === 'public') {
      const students = await db.user.count({
        where: { roleschool: "STUDENT" },
      });
      const teachers = await db.user.count({
        where: { roleschool: "TEACHER" },
      });
      const parents = await db.user.count({
        where: { roleschool: "PARENT" },
      });
      const schools = await db.school.count();

      return NextResponse.json({
        students,
        teachers,
        schools,
        parents,
      }, { status: 200 });
    }

    // School analytics (schoolId gerekli)
    if (!schoolId) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }

    // Teacher analytics
    if (type === 'teacher') {
      const students = await db.student.count({
        where: { schoolId },
      });
      const exams = await db.exam.count({
        where: { schoolId },
      });
      const reminders = await db.reminder.count({
        where: { schoolId },
      });
      const parents = await db.parent.count({
        where: { schoolId },
      });
      const classes = await db.class.count({
        where: { schoolId },
      });

      const currentTerms = await db.period.findMany({
        where: {
          year: new Date().getFullYear(),
          isActive: true,
        },
        take: 1,
      });
      
      const currentTermId = currentTerms.length > 0 ? currentTerms[0].id : "";
      
      const fees = await db.schoolFee.findMany({
        where: {
          schoolId,
          periodId: currentTermId,
        },
        select: {
          id: true,
          term: true,
          year: true,
          fees: {
            select: {
              id: true,
              amount: true,
              feeStatus: true,
            },
          },
        },
      });

      const { totalPaid, totalPending } = calculateFeeTotals(fees);

      const recentStudents = await db.student.findMany({
        orderBy: { createdAt: "desc" },
        where: { schoolId },
        take: 3,
        select: {
          id: true,
          name: true,
          regNo: true,
          gender: true,
          class: {
            select: { title: true },
          },
        },
      });

      const recentEvents = await db.event.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
        where: { schoolId },
        select: {
          id: true,
          title: true,
          startTime: true,
          date: true,
          endTime: true,
          location: true,
        },
      });

      return NextResponse.json({
        students,
        exams,
        reminders,
        recentStudents,
        recentEvents,
      }, { status: 200 });
    }

    // Default: School analytics
    const students = await db.student.count({
      where: { schoolId },
    });
    const teachers = await db.teacher.count({
      where: { schoolId },
    });
    const parents = await db.parent.count({
      where: { schoolId },
    });
    const classes = await db.class.count({
      where: { schoolId },
    });

    const currentTerms = await db.period.findMany({
      where: {
        year: new Date().getFullYear(),
        isActive: true,
      },
      take: 1,
    });
    
    const currentTermId = currentTerms.length > 0 ? currentTerms[0].id : "";
    
    const fees = await db.schoolFee.findMany({
      where: {
        schoolId,
        periodId: currentTermId,
      },
      select: {
        id: true,
        term: true,
        year: true,
        fees: {
          select: {
            id: true,
            amount: true,
            feeStatus: true,
          },
        },
      },
    });

    const { totalPaid, totalPending } = calculateFeeTotals(fees);

    const recentStudents = await db.student.findMany({
      orderBy: { createdAt: "desc" },
      where: { schoolId },
      take: 3,
      select: {
        id: true,
        name: true,
        regNo: true,
        gender: true,
        class: {
          select: { title: true },
        },
      },
    });

    const recentEvents = await db.event.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      where: { schoolId },
      select: {
        id: true,
        title: true,
        startTime: true,
        date: true,
        endTime: true,
        location: true,
      },
    });

    return NextResponse.json({
      students,
      teachers,
      parents,
      classes,
      totalPending,
      totalPaid,
      recentStudents,
      recentEvents,
    }, { status: 200 });

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Eğer POST işlemi gerekirse
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { schoolId, type } = data;

    // İhtiyaca göre POST işlemleri eklenebilir
    // Örn: Özel analytics hesaplamaları, rapor oluşturma vs.

    return NextResponse.json(
      { message: 'Analytics POST endpoint' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Analytics POST error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}