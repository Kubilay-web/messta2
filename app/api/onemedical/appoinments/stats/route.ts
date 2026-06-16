// app/api/appointments/stats/route.ts - Tam düzeltilmiş versiyon
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || 'week';
    const doctorId = searchParams.get('doctorId');

    let dateFilter: any = {};
    const now = new Date();

    switch (period) {
      case 'week':
        dateFilter.gte = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        dateFilter.gte = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        dateFilter.gte = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
    }

    const whereCondition: any = {
      appointmentDate: dateFilter,
    };

    if (doctorId) {
      whereCondition.doctorId = doctorId;
    }

    const [totalRevenue, totalAppointments, statusBreakdown, paymentStatusBreakdown, recentAppointments, dailyStats] = await Promise.all([
      db.appointment.aggregate({
        where: {
          ...whereCondition,
          paymentStatus: 'paid',
        },
        _sum: { paymentAmount: true },
      }),
      db.appointment.count({
        where: whereCondition,
      }),
      db.appointment.groupBy({
        by: ['status'],
        _count: true,
        where: whereCondition,
      }),
      db.appointment.groupBy({
        by: ['paymentStatus'],
        _count: true,
        where: whereCondition,
      }),
      db.appointment.findMany({
        take: 10,
        orderBy: { appointmentDate: 'desc' },
        where: whereCondition,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          charge: true,
          paymentAmount: true,
          paymentStatus: true,
          status: true,
          appointmentDate: true,
          doctorName: true,
        },
      }),
      // MongoDB için dailyStats - appointmentDate'e göre group by
      db.appointment.groupBy({
        by: ['appointmentDate'],
        where: {
          appointmentDate: {
            gte: dateFilter.gte,
          },
        },
        _count: {
          id: true,
        },
        _sum: {
          paymentAmount: true,
        },
        orderBy: {
          appointmentDate: 'desc',
        },
        take: 30,
      }),
    ]);

    return NextResponse.json({
      totalRevenue: (totalRevenue._sum.paymentAmount || 0) / 100,
      totalAppointments,
      statusBreakdown: statusBreakdown.map(item => ({
        status: item.status,
        count: item._count,
      })),
      paymentStatusBreakdown: paymentStatusBreakdown.map(item => ({
        status: item.paymentStatus,
        count: item._count,
      })),
      recentAppointments: recentAppointments.map(app => ({
        ...app,
        charge: app.charge / 100,
        paymentAmount: app.paymentAmount ? app.paymentAmount / 100 : null,
      })),
      dailyStats: dailyStats.map(stat => ({
        date: stat.appointmentDate,
        count: stat._count.id,
        revenue: (stat._sum.paymentAmount || 0) / 100,
      })),
    });
  } catch (error) {
    console.error('Appointment stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}