// import { NextRequest, NextResponse } from 'next/server';
// import db from "@/app/lib/db";
// import { SchoolFeeProps } from '../types/types';

// // ==================== GET İŞLEMLERİ ====================
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const schoolId = searchParams.get('schoolId');
//     const feeId = searchParams.get('id');
//     const className = searchParams.get('className');
//     const term = searchParams.get('term');
//     const year = searchParams.get('year');
//     const type = searchParams.get('type'); // 'by-class', 'detail', 'list'

//     // Tek bir school fee detayı getir
//     if (feeId && type === 'detail') {
//       const schoolFee = await db.schoolFee.findUnique({
//         where: { id: feeId },
//         include: {
//           fees: true,
//           school: {
//             select: { name: true, logo: true },
//           },
//           class: {
//             select: { title: true },
//           },
//           period: true,
//           schoolFeesPayments: {
//             select: {
//               id: true,
//               PRN: true,
//               paymentStatus: true,
//               paidFeeAmount: true,
//             },
//           },
//         },
//       });

//       if (!schoolFee) {
//         return NextResponse.json(
//           { error: 'School fee not found' },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json({
//         data: schoolFee,
//         error: null,
//       });
//     }

//     // Sınıfa ve term'e göre school fee'leri getir
//     if (schoolId && className && term && type === 'by-class') {
//       const schFees = await db.schoolFee.findMany({
//         where: {
//           schoolId,
//           className: className as string,
//           term: term as string,
//         },
//         select: {
//           id: true,
//           term: true,
//           title: true,
//           className: true,
//           fees: true,
//           year: true,
//         },
//       });

//       const currentYear = new Date().getFullYear();
//       const result = schFees
//         .filter((item) => item.year === currentYear)
//         .map((item) => {
//           const totalFees = item.fees.reduce((acc, item) => acc + item.amount, 0);
//           return {
//             ...item,
//             totalFees: totalFees,
//           };
//         });

//       return NextResponse.json({
//         data: result,
//         error: null,
//       });
//     }

//     // School ID kontrolü
//     if (!schoolId) {
//       return NextResponse.json(
//         { error: 'School ID is required' },
//         { status: 400 }
//       );
//     }

//     // School fee'leri getir
//     const schFees = await db.schoolFee.findMany({
//       where: {
//         schoolId,
//         ...(year && { year: parseInt(year) }),
//         ...(term && { term: term as string }),
//         ...(className && { className: className as string }),
//       },
//       select: {
//         id: true,
//         term: true,
//         title: true,
//         className: true,
//         fees: true,
//         year: true,
//         createdAt: true,
//       },
//       orderBy: [
//         { year: 'desc' },
//         { term: 'asc' },
//       ],
//     });

//     const currentYear = new Date().getFullYear();
//     const result = schFees
//       .filter((item) => item.year === currentYear)
//       .map((item) => {
//         const totalFees = item.fees.reduce((acc, item) => acc + item.amount, 0);
//         return {
//           ...item,
//           totalFees: totalFees,
//         };
//       });

//     return NextResponse.json({
//       data: result,
//       error: null,
//     });
//   } catch (error) {
//     console.error('GET school fees error:', error);
//     return NextResponse.json(
//       {
//         data: null,
//         error: 'Something went wrong',
//       },
//       { status: 500 }
//     );
//   }
// }

// // ==================== POST İŞLEMLERİ (Yeni School Fee Oluştur) ====================
// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.json() as SchoolFeeProps;
//     const { fees, ...others } = formData;

//     // Gerekli alanları kontrol et
//     if (!others.schoolId || !others.classId || !others.periodId) {
//       return NextResponse.json(
//         {
//           data: null,
//           error: 'Missing required fields: schoolId, classId, periodId',
//         },
//         { status: 400 }
//       );
//     }

//     // Aynı sınıf, term ve yıl için fee var mı kontrol et
//     const existingFee = await db.schoolFee.findFirst({
//       where: {
//         schoolId: others.schoolId,
//         classId: others.classId,
//         term: others.term,
//         year: others.year,
//       },
//     });

//     if (existingFee) {
//       return NextResponse.json(
//         {
//           data: null,
//           error: `School fee for class ${others.className}, term ${others.term}, year ${others.year} already exists`,
//         },
//         { status: 409 }
//       );
//     }

//     // School fee oluştur
//     const schoolFee = await db.schoolFee.create({
//       data: {
//         ...others,
//       },
//     });

//     // Fee'leri oluştur
//     if (fees && fees.length > 0) {
//       const feesData = fees.map((fee) => ({
//         ...fee,
//         schoolFeeId: schoolFee.id,
//       }));

//       const newFees = await db.fee.createMany({
//         data: feesData,
//       });

//       console.log(`${newFees.count} fees created for school fee: ${schoolFee.title}`);
//     }

//     console.log(`School fee created successfully: ${schoolFee.title} for ${schoolFee.className}`);

//     return NextResponse.json(
//       {
//         data: schoolFee,
//         error: null,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('POST school fee error:', error);
//     return NextResponse.json(
//       {
//         data: null,
//         error: 'Something went wrong',
//       },
//       { status: 500 }
//     );
//   }
// }

// // ==================== PUT İŞLEMLERİ (Tam Güncelleme) ====================
// export async function PUT(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const feeId = searchParams.get('id');

//     if (!feeId) {
//       return NextResponse.json(
//         { error: 'School fee ID is required' },
//         { status: 400 }
//       );
//     }

//     const formData = await request.json() as SchoolFeeProps;
//     const { fees, ...others } = formData;

//     // School fee'yi güncelle
//     const updatedSchoolFee = await db.schoolFee.update({
//       where: { id: feeId },
//       data: {
//         ...others,
//       },
//     });

//     // Fee'leri güncelle (önce sil, sonra ekle)
//     if (fees && fees.length > 0) {
//       // Önce eski fee'leri sil
//       await db.fee.deleteMany({
//         where: { schoolFeeId: feeId },
//       });

//       // Yeni fee'leri ekle
//       const feesData = fees.map((fee) => ({
//         ...fee,
//         schoolFeeId: feeId,
//       }));

//       const newFees = await db.fee.createMany({
//         data: feesData,
//       });

//       console.log(`${newFees.count} fees updated for school fee: ${updatedSchoolFee.title}`);
//     }

//     return NextResponse.json({
//       data: updatedSchoolFee,
//       error: null,
//     });
//   } catch (error) {
//     console.error('PUT school fee error:', error);
//     return NextResponse.json(
//       {
//         data: null,
//         error: 'Something went wrong',
//       },
//       { status: 500 }
//     );
//   }
// }

// // ==================== PATCH İŞLEMLERİ (Kısmi Güncelleme) ====================
// export async function PATCH(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const feeId = searchParams.get('id');

//     if (!feeId) {
//       return NextResponse.json(
//         { error: 'School fee ID is required' },
//         { status: 400 }
//       );
//     }

//     const data = await request.json();

//     const updatedSchoolFee = await db.schoolFee.update({
//       where: { id: feeId },
//       data,
//     });

//     return NextResponse.json({
//       data: updatedSchoolFee,
//       error: null,
//     });
//   } catch (error) {
//     console.error('PATCH school fee error:', error);
//     return NextResponse.json(
//       {
//         data: null,
//         error: 'Something went wrong',
//       },
//       { status: 500 }
//     );
//   }
// }

// // ==================== DELETE İŞLEMLERİ ====================
// export async function DELETE(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const feeId = searchParams.get('id');

//     if (!feeId) {
//       return NextResponse.json(
//         { error: 'School fee ID is required' },
//         { status: 400 }
//       );
//     }

//     // Transaction ile önce fee'leri, sonra school fee'yi sil
//     await db.$transaction([
//       db.fee.deleteMany({
//         where: { schoolFeeId: feeId },
//       }),
//       db.schoolFee.delete({
//         where: { id: feeId },
//       }),
//     ]);

//     return NextResponse.json(
//       {
//         data: { message: 'School fee deleted successfully' },
//         error: null,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('DELETE school fee error:', error);
//     return NextResponse.json(
//       {
//         data: null,
//         error: 'Something went wrong',
//       },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { SchoolFeeProps } from '../types/types';

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const feeId = searchParams.get('id');
    const className = searchParams.get('className');
    const term = searchParams.get('term');
    const year = searchParams.get('year');
    const type = searchParams.get('type');

    // School ID kontrolü - en başta yap
    if (!schoolId) {
      return NextResponse.json(
        { 
          data: null, 
          error: 'School ID is required' 
        },
        { status: 400 }
      );
    }

    // Tek bir school fee detayı getir
    if (feeId && type === 'detail') {
      const schoolFee = await db.schoolFee.findUnique({
        where: { id: feeId },
        include: {
          fees: true,
          school: {
            select: { name: true, logo: true },
          },
          class: {
            select: { title: true },
          },
          period: true,
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

      if (!schoolFee) {
        return NextResponse.json(
          { 
            data: null, 
            error: 'School fee not found' 
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: schoolFee,
        error: null,
      });
    }

    // Sınıfa ve term'e göre school fee'leri getir
    if (className && term && type === 'by-class') {
      const schFees = await db.schoolFee.findMany({
        where: {
          schoolId,
          className: className,
          term: term,
        },
        include: {
          fees: true,
        },
        orderBy: {
          year: 'desc',
        },
      });

      const result = schFees.map((item) => {
        const totalFees = item.fees.reduce((acc, curr) => acc + curr.amount, 0);
        return {
          id: item.id,
          term: item.term,
          title: item.title,
          className: item.className,
          fees: item.fees,
          year: item.year,
          totalFees: totalFees,
        };
      });

      return NextResponse.json({
        data: result,
        error: null,
      });
    }

    // Tüm school fee'leri getir (yıl filtresi opsiyonel)
    const whereClause: any = {
      schoolId: schoolId,
    };

    if (year) {
      whereClause.year = parseInt(year);
    }

    if (term) {
      whereClause.term = term;
    }

    if (className) {
      whereClause.className = className;
    }

    const schFees = await db.schoolFee.findMany({
      where: whereClause,
      include: {
        fees: true,
      },
      orderBy: [
        { year: 'desc' },
        { term: 'asc' },
      ],
    });

    // Sonuçları formatla
    const result = schFees.map((item) => {
      const totalFees = item.fees.reduce((acc, curr) => acc + curr.amount, 0);
      return {
        id: item.id,
        term: item.term,
        title: item.title,
        className: item.className,
        year: item.year.toString(),
        totalFees: totalFees,
        createdAt: item.createdAt,
      };
    });

    return NextResponse.json({
      data: result,
      error: null,
    });

  } catch (error) {
    console.error('GET school fees error:', error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ ====================
export async function POST(request: NextRequest) {
  try {
    const formData = await request.json() as SchoolFeeProps;
    const { fees, ...others } = formData;

    // Gerekli alanları kontrol et
    if (!others.schoolId || !others.classId || !others.periodId) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields: schoolId, classId, periodId',
        },
        { status: 400 }
      );
    }

    // Aynı sınıf, term ve yıl için fee var mı kontrol et
    const existingFee = await db.schoolFee.findFirst({
      where: {
        schoolId: others.schoolId,
        classId: others.classId,
        term: others.term,
        year: others.year,
      },
    });

    if (existingFee) {
      return NextResponse.json(
        {
          data: null,
          error: `School fee for class ${others.className}, term ${others.term}, year ${others.year} already exists`,
        },
        { status: 409 }
      );
    }

    // School fee oluştur
    const schoolFee = await db.schoolFee.create({
      data: {
        term: others.term,
        year: others.year,
        title: others.title,
        className: others.className,
        schoolName: others.schoolName,
        schoolId: others.schoolId,
        classId: others.classId,
        periodId: others.periodId,
      },
    });

    // Fee'leri oluştur
    if (fees && fees.length > 0) {
      const feesData = fees.map((fee) => ({
        title: fee.title,
        amount: fee.amount,
        schoolFeeId: schoolFee.id,
      }));

      await db.fee.createMany({
        data: feesData,
      });
    }

    // Oluşturulan fee'yi ilişkileriyle getir
    const createdFee = await db.schoolFee.findUnique({
      where: { id: schoolFee.id },
      include: { fees: true },
    });

    return NextResponse.json(
      {
        data: createdFee,
        error: null,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST school fee error:', error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== DELETE İŞLEMLERİ ====================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const feeId = searchParams.get('id');

    if (!feeId) {
      return NextResponse.json(
        { 
          data: null, 
          error: 'School fee ID is required' 
        },
        { status: 400 }
      );
    }

    // Transaction ile önce fee'leri, sonra school fee'yi sil
    await db.$transaction([
      db.fee.deleteMany({
        where: { schoolFeeId: feeId },
      }),
      db.schoolFee.delete({
        where: { id: feeId },
      }),
    ]);

    return NextResponse.json(
      {
        data: { message: 'School fee deleted successfully' },
        error: null,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('DELETE school fee error:', error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}