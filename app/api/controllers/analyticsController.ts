import db from "@/app/lib/db";


export async function getAnalyticsBySchoolId(schoolId: string) {
  const students = await db.student.count({ where: { schoolId } });
  const teachers = await db.teacher.count({ where: { schoolId } });
  const parents = await db.parent.count({ where: { schoolId } });
  const classes = await db.class.count({ where: { schoolId } });

  const currentTerms = await db.period.findMany({
    where: {
      year: new Date().getFullYear(),
      isActive: true,
    },
    take: 1,
  });

  const currentTermId = currentTerms[0]?.id || "";

  const fees = await db.schoolFee.findMany({
    where: {
      schoolId,
      periodId: currentTermId,
    },
    select: {
      fees: {
        select: {
          amount: true,
          feeStatus: true,
        },
      },
    },
  });

  const allFees = fees.flatMap((f) => f.fees);

  const totalPaid = allFees
    .filter((f) => f.feeStatus === "PAID")
    .reduce((sum, f) => sum + f.amount, 0);

  const totalPending = allFees
    .filter((f) => f.feeStatus === "NOT_PAID")
    .reduce((sum, f) => sum + f.amount, 0);

  const recentStudents = await db.student.findMany({
    where: { schoolId },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const recentEvents = await db.event.findMany({
    where: { schoolId },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return {
    students,
    teachers,
    parents,
    totalPaid,
    totalPending,
    recentStudents,
    recentEvents,
  };
}

export async function getPublicStats() {
  const students = await db.user.count({ where: { roleschool: "STUDENT" } });
  const teachers = await db.user.count({ where: { roleschool: "TEACHER" } });
  const parents = await db.user.count({ where: { roleschool: "PARENT" } });
  const schools = await db.school.count();

  return { students, teachers, parents, schools };
}