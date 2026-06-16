import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

// Define interfaces for fee calculation
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

interface FeeCalculationResult {
  totalPaid: number;
  totalPending: number;
}

function calculateFeeTotals(feeGroups: FeeGroup[]): FeeCalculationResult {
  const allFeeLines: FeeLine[] = feeGroups.flatMap((group) => group.fees);

  const totalPaid = allFeeLines
    .filter((fee) => fee.feeStatus === "PAID")
    .reduce((sum, fee) => sum + fee.amount, 0);

  const totalPending = allFeeLines
    .filter((fee) => fee.feeStatus === "NOT_PAID")
    .reduce((sum, fee) => sum + fee.amount, 0);

  return { totalPaid, totalPending };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    const { schoolId } = params;

    // Count statistics
    const students = await db.student.count({
      where: {
        schoolId,
      },
    });

    const teachers = await db.teacher.count({
      where: {
        schoolId,
      },
    });

    const parents = await db.parent.count({
      where: {
        schoolId,
      },
    });

    const classes = await db.class.count({
      where: {
        schoolId,
      },
    });

    // Get current term
    const currentTerms = await db.period.findMany({
      where: {
        year: new Date().getFullYear(),
        isActive: true,
      },
      take: 1,
    });

    const currentTermId = currentTerms.length > 0 ? currentTerms[0].id : "";

    // Get fees for current term
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

    const { totalPaid, totalPending } = calculateFeeTotals(fees as FeeGroup[]);

    // Get recent students
    const recentStudents = await db.student.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        schoolId,
      },
      take: 3,
      select: {
        id: true,
        name: true,
        regNo: true,
        gender: true,
        class: {
          select: {
            title: true,
          },
        },
      },
    });

    // Get recent events
    const recentEvents = await db.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      where: {
        schoolId,
      },
      select: {
        id: true,
        title: true,
        startTime: true,
        date: true,
        endTime: true,
        location: true,
      },
    });

    const result = {
      students,
      teachers,
      parents,
      totalPending,
      totalPaid,
      recentStudents,
      recentEvents,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        students: 0,
        teachers: 0,
        parents: 0,
        totalPending: 0,
        totalPaid: 0,
        recentStudents: [],
        recentEvents: [],
      },
      { status: 500 }
    );
  }
}