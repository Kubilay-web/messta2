// import { NextRequest, NextResponse } from 'next/server';
// import db from "@/app/lib/db";
// import { validateRequest } from '@/app/auth';


// export async function GET(
//   request: NextRequest,
//   { params }: { params: { orderId: string } }
// ) {
//   try {
//     const {user} = await validateRequest();
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const order = await db.order.findUnique({
//       where: {
//         id: params.orderId,
//         userId: user.id,
//       },
//       include: {
//         groups: {
//           include: {
//             items: true,
//             store: {
//               select: {
//                 id: true,
//                 name: true,
//                 email: true,
//                 phone: true,
//                 logo: true,
//               },
//             },
//             coupon: {
//               select: {
//                 code: true,
//                 discount: true,
//               },
//             },
//           },
//         },
//         shippingAddress: {
//           include: {
//             country: true,
//           },
//         },
//         paymentDetails: {
//           select: {
//             paymentMethod: true,
//             amount: true,
//             currency: true,
//             status: true,
//             createdAt: true,
//           },
//         },
//         user: {
//           select: {
//             email: true,
//             displayName: true,
//           },
//         },
//       },
//     });

//     if (!order) {
//       return NextResponse.json({ error: 'Order not found' }, { status: 404 });
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }



//Final




import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orderId = params.orderId;

    // Veritabanından siparişi getir
    const order = await db.order.findUnique({
      where: {
        id: orderId,
        userId: user.id, // Kullanıcının sadece kendi siparişlerini görmesini sağla
      },
      include: {
        groups: {
          include: {
            items: true,
            store: {
              select: {
                id: true,
                name: true,
                logo: true,
                email: true,
                phone: true,
              },
            },
            coupon: {
              select: {
                code: true,
                discount: true,
              },
            },
          },
        },
        shippingAddress: {
          include: {
            country: {
              select: {
                name: true,
              },
            },
          },
        },
        paymentDetails: true,
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // API response formatına uygun şekilde dönüştür
    const formattedOrder = {
      id: order.id,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      shippingFees: order.shippingFees,
      subTotal: order.subTotal,
      total: order.total,
      currency: order.currency,
      createdAt: order.createdAt.toISOString(),
      paymentMethod: order.paymentMethod,
      groups: order.groups.map(group => ({
        id: group.id,
        status: group.status,
        shippingService: group.shippingService,
        shippingDeliveryMin: group.shippingDeliveryMin,
        shippingDeliveryMax: group.shippingDeliveryMax,
        shippingFees: group.shippingFees,
        subTotal: group.subTotal,
        total: group.total,
        trackingNumber: group.trackingNumber,
        shippingCompany: group.shippingCompany,
        note: group.note,
        items: group.items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.totalPrice,
          image: item.image,
          size: item.size,
          sku: item.sku,
          status: item.status,
          productSlug: item.productSlug,
          variantSlug: item.variantSlug,
        })),
        store: group.store,
        coupon: group.coupon ? {
          code: group.coupon.code,
          discount: group.coupon.discount,
        } : undefined,
      })),
      shippingAddress: {
        firstName: order.shippingAddress.firstName,
        lastName: order.shippingAddress.lastName,
        phone: order.shippingAddress.phone,
        address1: order.shippingAddress.address1,
        address2: order.shippingAddress.address2,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        zip_code: order.shippingAddress.zip_code,
        country: order.shippingAddress.country,
      },
      paymentDetails: order.paymentDetails ? {
        paymentMethod: order.paymentDetails.paymentMethod,
        amount: order.paymentDetails.amount,
        currency: order.paymentDetails.currency,
        status: order.paymentDetails.status,
        createdAt: order.paymentDetails.createdAt.toISOString(),
        paymentInetntId: order.paymentDetails.paymentInetntId,
      } : undefined,
      user: order.user,
    };

    return NextResponse.json(formattedOrder);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}