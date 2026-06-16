import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Veritabanı bağlantısını kurma ve gerekli verileri almak
    const companycount = await db.company.count();
    const orderscount = await db.orderJob.count();
    const pendingjobcount = await db.jobs.count({
      where: { status: "pending" },
    });
    const activejobcount = await db.jobs.count({
      where: { status: "active" },
    });
    const appliedjob = await db.applyjob.count();
    const jobbookmark = await db.jobbookmark.count();

    // Sonuçları konsola yazma (debugging amacıyla)
    console.log({
      companycount,
      pendingjobcount,
      orderscount,
      activejobcount,
      appliedjob,
      jobbookmark,
    });

    // API yanıtı
    return NextResponse.json({
      companycount,
      pendingjobcount,
      activejobcount,
      orderscount,
      appliedjob,
      jobbookmark,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
