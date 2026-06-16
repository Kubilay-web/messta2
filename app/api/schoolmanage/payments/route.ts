import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { CreateSchoolFeePaymentInput } from '../types/types';

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const paymentId = searchParams.get('id');
    const studentId = searchParams.get('studentId');
    const year = searchParams.get('year');
    const term = searchParams.get('term');
    const status = searchParams.get('status');
    const type = searchParams.get('type'); // 'detail', 'student', 'yearly'

    // Tek bir payment detayı getir
    if (paymentId && type === 'detail') {
      const payment = await db.schoolFeePayment.findUnique({
        where: { id: paymentId },
        include: {
          school: {
            select: { name: true, logo: true },
          },
          period: true,
          schoolFee: {
            include: {
              fees: true,
            },
          },
          student: {
            select: {
              id: true,
              name: true,
              regNo: true,
              class: {
                select: { title: true },
              },
              stream: {
                select: { title: true },
              },
            },
          },
          parent: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
      });

      if (!payment) {
        return NextResponse.json(
          { error: 'Payment not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: payment,
        error: null,
      });
    }

    // Öğrenciye göre payment'ları getir
    if (studentId) {
      const payments = await db.schoolFeePayment.findMany({
        where: { studentUserId: studentId },
        orderBy: [
          { year: 'desc' },
          { term: 'asc' },
        ],
        select: {
          id: true,
          studentName: true,
          paidFeeAmount: true,
          paidFees: true,
          PRN: true,
          paymentStatus: true,
          term: true,
          year: true,
          className: true,
          createdAt: true,
        },
      });

      return NextResponse.json({
        data: payments,
        error: null,
      });
    }

    // Yıla göre payment'ları getir
    if (schoolId && year) {
      const payments = await db.schoolFeePayment.findMany({
        where: {
          schoolId,
          year: parseInt(year),
          ...(term && { term }),
          ...(status && { paymentStatus: status }),
        },
        orderBy: [
          { term: 'asc' },
          { createdAt: 'desc' },
        ],
        select: {
          id: true,
          studentUserId: true,
          studentName: true,
          paidFeeAmount: true,
          paidFees: true,
          PRN: true,
          paymentStatus: true,
          term: true,
          year: true,
          className: true,
          createdAt: true,
        },
      });

      return NextResponse.json({
        data: payments,
        error: null,
      });
    }

    // School'a göre tüm payment'ları getir (yıl filtresi yoksa)
    if (schoolId) {
      const payments = await db.schoolFeePayment.findMany({
        where: { schoolId },
        orderBy: [
          { year: 'desc' },
          { term: 'asc' },
          { createdAt: 'desc' },
        ],
        select: {
          id: true,
          studentUserId: true,
          studentName: true,
          paidFeeAmount: true,
          paidFees: true,
          PRN: true,
          paymentStatus: true,
          term: true,
          year: true,
          className: true,
          createdAt: true,
        },
      });

      return NextResponse.json({
        data: payments,
        error: null,
      });
    }

    return NextResponse.json(
      { error: 'School ID is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('GET fee payments error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni Ödeme Oluştur) ====================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as CreateSchoolFeePaymentInput;

    // Gerekli alanları kontrol et
    if (!data.schoolId || !data.studentProfileId || !data.parentProfileId) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields: schoolId, studentProfileId, parentProfileId',
        },
        { status: 400 }
      );
    }

    // Benzersiz PRN oluştur (Payment Reference Number)
    const prn = `PRN-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    data.PRN = prn;

    // Ödemeyi oluştur
    const newPayment = await db.schoolFeePayment.create({
      data,
    });

    // PaidFees'leri işle
    const paidFees = newPayment.paidFees;
    const paidFeeIds = paidFees
      .map((fee: string) => {
        const parts = fee.split("*");
        // Check if the string follows the format (has 3 parts)
        return parts.length === 3 ? parts[2] : null;
      })
      .filter((id: string | null) => id !== null);

    // Fee'leri PAID olarak güncelle
    if (paidFeeIds.length > 0) {
      await db.fee.updateMany({
        where: {
          id: {
            in: paidFeeIds as string[],
          },
        },
        data: {
          feeStatus: "PAID",
          paymentDate: newPayment.createdAt,
        },
      });
    }

    console.log(
      `Payment created successfully: ${newPayment.PRN} (${newPayment.studentName})`
    );

    return NextResponse.json(
      {
        data: {
          prn: newPayment.PRN,
          id: newPayment.id,
          status: newPayment.paymentStatus,
        },
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST fee payment error:', error);
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
    const paymentId = searchParams.get('id');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json() as CreateSchoolFeePaymentInput;

    // Ödemeyi güncelle
    const updatedPayment = await db.schoolFeePayment.update({
      where: { id: paymentId },
      data,
    });

    return NextResponse.json({
      data: updatedPayment,
      error: null,
    });
  } catch (error) {
    console.error('PUT fee payment error:', error);
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
    const paymentId = searchParams.get('id');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Ödeme durumunu güncelle
    const updatedPayment = await db.schoolFeePayment.update({
      where: { id: paymentId },
      data,
    });

    // Eğer paymentStatus güncellendiyse ve APPROVED ise
    if (data.paymentStatus === 'APPROVED') {
      const paidFees = updatedPayment.paidFees;
      const paidFeeIds = paidFees
        .map((fee: string) => {
          const parts = fee.split("*");
          return parts.length === 3 ? parts[2] : null;
        })
        .filter((id: string | null) => id !== null);

      if (paidFeeIds.length > 0) {
        await db.fee.updateMany({
          where: {
            id: {
              in: paidFeeIds as string[],
            },
          },
          data: {
            feeStatus: "PAID",
            paymentDate: new Date(),
          },
        });
      }
    }

    return NextResponse.json({
      data: updatedPayment,
      error: null,
    });
  } catch (error) {
    console.error('PATCH fee payment error:', error);
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
    const paymentId = searchParams.get('id');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Ödemeyi sil
    await db.schoolFeePayment.delete({
      where: { id: paymentId },
    });

    return NextResponse.json(
      {
        data: { message: 'Payment deleted successfully' },
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE fee payment error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}