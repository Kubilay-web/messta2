import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { PeriodCreateProps } from '../types/types';
import { groupBy } from 'lodash';

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const periodId = searchParams.get('id');
    const year = searchParams.get('year');
    const type = searchParams.get('type'); // 'grouped', 'active', 'list'

    // Tek bir period getir
    if (periodId) {
      const period = await db.period.findUnique({
        where: { id: periodId },
        include: {
          schoolFees: {
            include: {
              fees: true,
            },
          },
          marksheets: {
            include: {
              exam: true,
              subject: true,
            },
          },
          studentMarks: {
            select: {
              id: true,
              studentId: true,
              marks: true,
            },
          },
          schoolFeesPayments: {
            select: {
              id: true,
              PRN: true,
              paymentStatus: true,
              paidFeeAmount: true,
            },
          },
        },
      });

      if (!period) {
        return NextResponse.json(
          { error: 'Period not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: period,
        error: null,
      });
    }

    // Aktif period'ları getir
    if (type === 'active' && schoolId) {
      const activePeriods = await db.period.findMany({
        where: {
          schoolId,
          isActive: true,
        },
        orderBy: [
          { year: 'desc' },
          { term: 'asc' },
        ],
      });

      return NextResponse.json({
        data: activePeriods,
        error: null,
      });
    }

    // Yıla göre period'ları getir
    if (schoolId && year) {
      const periods = await db.period.findMany({
        where: {
          schoolId,
          year: parseInt(year),
        },
        orderBy: {
          term: 'asc',
        },
      });

      return NextResponse.json({
        data: periods,
        error: null,
      });
    }

    // School ID kontrolü
    if (!schoolId) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }

    // Period'ları getir
    const periods = await db.period.findMany({
      where: { schoolId },
      orderBy: [
        { year: 'desc' },
        { term: 'asc' },
      ],
    });

    // Gruplanmış olarak isteniyorsa
    if (type === 'grouped') {
      const groupedPeriods = groupBy(periods, 'year');
      return NextResponse.json({
        data: groupedPeriods,
        error: null,
      });
    }

    // Normal liste olarak döndür
    return NextResponse.json({
      data: periods,
      error: null,
    });
  } catch (error) {
    console.error('GET periods error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni Period Oluştur) ====================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as PeriodCreateProps;

    // Gerekli alanları kontrol et
    if (!data.year || !data.term || !data.schoolId) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields: year, term, schoolId',
        },
        { status: 400 }
      );
    }

    // Aynı yıl ve term'de period var mı kontrol et
    const existingPeriod = await db.period.findFirst({
      where: {
        schoolId: data.schoolId,
        year: data.year,
        term: data.term,
      },
    });

    if (existingPeriod) {
      return NextResponse.json(
        {
          data: null,
          error: `Period with year ${data.year} and term ${data.term} already exists`,
        },
        { status: 409 }
      );
    }

    // Eğer isActive true ise, diğer aktif period'ları pasif yap
    if (data.isActive) {
      await db.period.updateMany({
        where: {
          schoolId: data.schoolId,
          isActive: true,
        },
        data: {
          isActive: false,
        },
      });
    }

    // Yeni period oluştur
    const newPeriod = await db.period.create({
      data,
    });

    console.log(`Period created successfully: Year ${newPeriod.year} Term ${newPeriod.term} (${newPeriod.id})`);

    return NextResponse.json(
      {
        data: newPeriod,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST period error:', error);
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
    const periodId = searchParams.get('id');

    if (!periodId) {
      return NextResponse.json(
        { error: 'Period ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json() as PeriodCreateProps;

    // Eğer isActive true ise, diğer aktif period'ları pasif yap
    if (data.isActive) {
      const period = await db.period.findUnique({
        where: { id: periodId },
        select: { schoolId: true },
      });

      if (period) {
        await db.period.updateMany({
          where: {
            schoolId: period.schoolId,
            isActive: true,
            id: { not: periodId },
          },
          data: {
            isActive: false,
          },
        });
      }
    }

    // Period'u güncelle
    const updatedPeriod = await db.period.update({
      where: { id: periodId },
      data,
    });

    console.log(`Period updated successfully: Year ${updatedPeriod.year} Term ${updatedPeriod.term} (${updatedPeriod.id})`);

    return NextResponse.json({
      data: updatedPeriod,
      error: null,
    });
  } catch (error) {
    console.error('PUT period error:', error);
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
    const periodId = searchParams.get('id');

    if (!periodId) {
      return NextResponse.json(
        { error: 'Period ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Eğer isActive true ise, diğer aktif period'ları pasif yap
    if (data.isActive === true) {
      const period = await db.period.findUnique({
        where: { id: periodId },
        select: { schoolId: true },
      });

      if (period) {
        await db.period.updateMany({
          where: {
            schoolId: period.schoolId,
            isActive: true,
            id: { not: periodId },
          },
          data: {
            isActive: false,
          },
        });
      }
    }

    // Period'u güncelle
    const updatedPeriod = await db.period.update({
      where: { id: periodId },
      data,
    });

    return NextResponse.json({
      data: updatedPeriod,
      error: null,
    });
  } catch (error) {
    console.error('PATCH period error:', error);
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
    const periodId = searchParams.get('id');

    if (!periodId) {
      return NextResponse.json(
        { error: 'Period ID is required' },
        { status: 400 }
      );
    }

    // Period'u sil (ilişkili kayıtlar da otomatik silinecek - cascade)
    await db.period.delete({
      where: { id: periodId },
    });

    return NextResponse.json(
      {
        data: { message: 'Period deleted successfully' },
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE period error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}