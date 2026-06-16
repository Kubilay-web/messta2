// // // app/api/oneshop/checkout/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import db from "@/app/lib/db";
// // import Stripe from "stripe";
// // import { validateRequest } from "@/app/auth";
// // import paypal from "@paypal/checkout-server-sdk";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
// //   apiVersion: "2025-08-27.basil",
// // });

// // let paypalClient: paypal.core.PayPalHttpClient;
// // const initializePayPal = () => {
// //   if (!paypalClient) {
// //     const clientId = process.env.PAYPAL_CLIENT_ID!;
// //     const clientSecret = process.env.PAYPAL_SECRET!;

// //     const isProduction = process.env.NODE_ENV === "production";
// //     const environment = isProduction
// //       ? new paypal.core.LiveEnvironment(clientId, clientSecret)
// //       : new paypal.core.SandboxEnvironment(clientId, clientSecret);

// //     paypalClient = new paypal.core.PayPalHttpClient(environment);
// //   }
// //   return paypalClient;
// // };

// // export async function POST(request: NextRequest) {
// //   try {
// //     const { user } = await validateRequest();
// //     if (!user) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     const body = await request.json();
// //     const {
// //       shippingAddressId,
// //       paymentMethod,
// //       shippingMethod,
// //       cartItems,
// //       shippingFee,
// //       discountAmount,
// //       appliedCoupon,
// //     } = body;

// //     if (!Array.isArray(cartItems) || cartItems.length === 0) {
// //       return NextResponse.json(
// //         { error: "Cart is empty" },
// //         { status: 400 }
// //       );
// //     }

// //     if (!shippingAddressId) {
// //       return NextResponse.json(
// //         { error: "Shipping address required" },
// //         { status: 400 }
// //       );
// //     }

// //     if (!paymentMethod) {
// //       return NextResponse.json(
// //         { error: "Payment method required" },
// //         { status: 400 }
// //       );
// //     }

// //     const subTotal = cartItems.reduce(
// //       (sum: number, item: any) => sum + Number(item.price) * Number(item.quantity),
// //       0
// //     );

// //     const shippingFees = Number(shippingFee) || 0;
// //     const discount = Number(discountAmount) || 0;
// //     const total = Math.max(0, subTotal + shippingFees - discount);

// //     const shippingAddress = await db.shippingAddress.findUnique({
// //       where: { id: shippingAddressId, userId: user.id },
// //       include: { country: true },
// //     });

// //     if (!shippingAddress) {
// //       return NextResponse.json(
// //         { error: "Address not found" },
// //         { status: 400 }
// //       );
// //     }

// //     for (const item of cartItems) {
// //       const size = await db.size.findFirst({
// //         where: { id: item.sizeId, productVariantId: item.variantId },
// //       });

// //       if (!size) {
// //         return NextResponse.json(
// //           { error: `Size not found for ${item.name}` },
// //           { status: 400 }
// //         );
// //       }

// //       if (size.quantity < item.quantity) {
// //         return NextResponse.json(
// //           { error: `Insufficient stock for ${item.name}` },
// //           { status: 400 }
// //         );
// //       }
// //     }

// //     let paymentMethodEnum: "Paypal" | "Stripe" | null = null;

// //     if (paymentMethod === "card") {
// //       paymentMethodEnum = "Stripe";
// //     } else if (paymentMethod === "paypal") {
// //       paymentMethodEnum = "Paypal";
// //     }

// //     // Order oluştur
// //     const order = await db.order.create({
// //       data: {
// //         userId: user.id,
// //         shippingAddressId,
// //         subTotal,
// //         shippingFees,
// //         total,
// //         orderStatus: "Pending",
// //         paymentStatus: "Pending", // Schema'ya göre
// //         paymentMethod: paymentMethodEnum,
// //         groups: {
// //           create: cartItems.map((item: any) => ({
// //             storeId: item.storeId || "default-store",
// //             status: "Pending",
// //             shippingService: shippingMethod === "express"
// //               ? "Express Delivery"
// //               : "Standard Delivery",
// //             shippingDeliveryMin: shippingMethod === "express" ? 2 : 5,
// //             shippingDeliveryMax: shippingMethod === "express" ? 3 : 7,
// //             shippingFees: shippingFees / cartItems.length,
// //             subTotal: Number(item.price) * Number(item.quantity),
// //             total: Number(item.price) * Number(item.quantity) + (shippingFees / cartItems.length),
// //             note: shippingMethod === "express"
// //               ? "Express shipping"
// //               : "Standard shipping",
// //             ...(appliedCoupon && {
// //               couponId: appliedCoupon.couponId,
// //             }),
// //             items: {
// //               create: {
// //                 productId: item.productId,
// //                 variantId: item.variantId,
// //                 sizeId: item.sizeId,
// //                 productSlug: item.productSlug,
// //                 variantSlug: item.variantSlug,
// //                 sku: item.sku,
// //                 name: item.name,
// //                 image: item.image,
// //                 size: item.size,
// //                 quantity: Number(item.quantity),
// //                 price: Number(item.price),
// //                 totalPrice: Number(item.price) * Number(item.quantity),
// //                 shippingFee: shippingFees / cartItems.length,
// //                 status: "Pending",
// //               },
// //             },
// //           })),
// //         },
// //       },
// //       include: {
// //         groups: {
// //           include: {
// //             items: true,
// //             coupon: true,
// //           },
// //         },
// //       },
// //     });

// //     for (const item of cartItems) {
// //       await db.size.update({
// //         where: { id: item.sizeId },
// //         data: { quantity: { decrement: item.quantity } },
// //       });
// //     }

// //     // Clear cart
// //     try {
// //       const cart = await db.cart.findUnique({ where: { userId: user.id } });
// //       if (cart) {
// //         await db.cartItem.deleteMany({ where: { cartId: cart.id } });
// //         await db.cart.update({
// //           where: { id: cart.id },
// //           data: { couponId: null },
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Cart clear error:", error);
// //     }

// //     // Stripe
// //     if (paymentMethod === "card") {
// //       try {
// //         let customer: Stripe.Customer;
// //         const existingCustomers = await stripe.customers.list({
// //           email: user.email,
// //           limit: 1,
// //         });

// //         customer = existingCustomers.data.length > 0
// //           ? existingCustomers.data[0]
// //           : await stripe.customers.create({
// //               email: user.email,
// //               name: user.displayName || user.username,
// //               metadata: { userId: user.id },
// //             });

// //         const session = await stripe.checkout.sessions.create({
// //           customer: customer.id,
// //           mode: "payment",
// //           payment_method_types: ["card"],
// //           line_items: cartItems.map((item: any) => ({
// //             price_data: {
// //               currency: "usd",
// //               product_data: {
// //                 name: item.name,
// //                 description: `Size: ${item.size}`,
// //                 images: item.image ? [item.image] : [],
// //               },
// //               unit_amount: Math.round(Number(item.price) * 100),
// //             },
// //             quantity: item.quantity,
// //           })),
// //           ...(shippingFees > 0 && {
// //             shipping_options: [{
// //               shipping_rate_data: {
// //                 type: "fixed_amount",
// //                 fixed_amount: {
// //                   amount: Math.round(shippingFees * 100),
// //                   currency: "usd",
// //                 },
// //                 display_name: shippingMethod === "express"
// //                   ? "Express Shipping"
// //                   : "Standard Shipping",
// //               },
// //             }],
// //           }),
// //           ...(discount > 0 && {
// //             discounts: [{
// //               coupon: await stripe.coupons.create({
// //                 amount_off: Math.round(discount * 100),
// //                 currency: "usd",
// //                 duration: "once",
// //               }),
// //             }],
// //           }),
// //           metadata: { orderId: order.id, userId: user.id },
// //           success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
// //           cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
// //         });

// //         // PaymentDetails oluştur
// //         await db.paymentDetails.create({
// //           data: {
// //             paymentInetntId: session.id,
// //             paymentMethod: "Stripe",
// //             status: "Processing", // PaymentDetails'te string, enum değil
// //             amount: total,
// //             currency: "USD",
// //             orderId: order.id,
// //             userId: user.id,
// //           },
// //         });

// //         // Order status'u PENDING olarak kalacak, ödeme tamamlanana kadar
// //         // Stripe success webhook'unda "Paid" yapılacak

// //         return NextResponse.json({
// //           success: true,
// //           paymentUrl: session.url,
// //           sessionId: session.id,
// //           order,
// //         });

// //       } catch (error: any) {
// //         // Rollback
// //         for (const item of cartItems) {
// //           try {
// //             await db.size.update({
// //               where: { id: item.sizeId },
// //               data: { quantity: { increment: item.quantity } },
// //             });
// //           } catch {}
// //         }

// //         await db.order.update({
// //           where: { id: order.id },
// //           data: {
// //             paymentStatus: "Failed", // Schema'da var
// //             orderStatus: "Cancelled",
// //           },
// //         });

// //         return NextResponse.json(
// //           { error: `Stripe error: ${error.message}` },
// //           { status: 500 }
// //         );
// //       }
// //     }

// //     // PayPal
// //     if (paymentMethod === "paypal") {
// //       try {
// //         const paypalClient = initializePayPal();
// //         const req = new paypal.orders.OrdersCreateRequest();

// //         req.requestBody({
// //           intent: "CAPTURE",
// //           purchase_units: [{
// //             reference_id: order.id,
// //             description: `Order #${order.id.slice(0, 8)}`,
// //             amount: {
// //               currency_code: "USD",
// //               value: total.toFixed(2),
// //               breakdown: {
// //                 item_total: { currency_code: "USD", value: subTotal.toFixed(2) },
// //                 shipping: { currency_code: "USD", value: shippingFees.toFixed(2) },
// //                 ...(discount > 0 && {
// //                   discount: { currency_code: "USD", value: discount.toFixed(2) },
// //                 }),
// //               },
// //             },
// //             items: cartItems.map((item: any) => ({
// //               name: item.name.length > 127 ? item.name.substring(0, 124) + "..." : item.name,
// //               sku: item.sku,
// //               unit_amount: { currency_code: "USD", value: Number(item.price).toFixed(2) },
// //               quantity: item.quantity.toString(),
// //               category: "PHYSICAL_GOODS",
// //             })),
// //           }],
// //           application_context: {
// //             brand_name: "OneShop",
// //             user_action: "PAY_NOW",
// //             return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?order_id=${order.id}&payment_method=paypal`,
// //             cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
// //           },
// //         });

// //         const response = await paypalClient.execute(req);

// //         if (response.statusCode !== 201) {
// //           throw new Error(`PayPal error: ${response.statusCode}`);
// //         }

// //         // PaymentDetails oluştur
// //         await db.paymentDetails.create({
// //           data: {
// //             paymentInetntId: response.result.id,
// //             paymentMethod: "PayPal",
// //             status: "Processing", // PaymentDetails'te string
// //             amount: total,
// //             currency: "USD",
// //             orderId: order.id,
// //             userId: user.id,
// //           },
// //         });

// //         // Order status'u PENDING olarak kalacak
// //         // PayPal webhook'unda "Paid" yapılacak

// //         const approvalUrl = response.result.links.find(
// //           (link: any) => link.rel === "approve"
// //         )?.href;

// //         if (!approvalUrl) throw new Error("No approval URL");

// //         return NextResponse.json({
// //           success: true,
// //           paymentUrl: approvalUrl,
// //           paypalOrderId: response.result.id,
// //           order,
// //         });

// //       } catch (error: any) {
// //         // Rollback
// //         for (const item of cartItems) {
// //           try {
// //             await db.size.update({
// //               where: { id: item.sizeId },
// //               data: { quantity: { increment: item.quantity } },
// //             });
// //           } catch {}
// //         }

// //         await db.order.update({
// //           where: { id: order.id },
// //           data: {
// //             paymentStatus: "Failed", // Schema'da var
// //             orderStatus: "Cancelled",
// //           },
// //         });

// //         return NextResponse.json(
// //           { error: `PayPal error: ${error.message}` },
// //           { status: 500 }
// //         );
// //       }
// //     }

// //     // COD/UPI
// //     if (paymentMethod === "cod" || paymentMethod === "upi") {
// //       // COD/UPI için paymentStatus PENDING kalır
// //       await db.order.update({
// //         where: { id: order.id },
// //         data: {
// //           orderStatus: "Confirmed",
// //         },
// //       });

// //       return NextResponse.json({
// //         success: true,
// //         order,
// //         message: "Order placed",
// //       });
// //     }

// //     return NextResponse.json(
// //       { error: "Invalid payment method" },
// //       { status: 400 }
// //     );

// //   } catch (error: any) {
// //     console.error("Checkout error:", error);
// //     return NextResponse.json(
// //       { error: error.message || "Server error" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // app/api/oneshop/checkout/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import db from "@/app/lib/db";
// // import Stripe from "stripe";
// // import { validateRequest } from "@/app/auth";
// // import paypal from "@paypal/checkout-server-sdk";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
// //   apiVersion: "2025-08-27.basil",
// // });

// // let paypalClient: paypal.core.PayPalHttpClient;
// // const initializePayPal = () => {
// //   if (!paypalClient) {
// //     const clientId = process.env.PAYPAL_CLIENT_ID!;
// //     const clientSecret = process.env.PAYPAL_SECRET!;

// //     const isProduction = process.env.NODE_ENV === "production";
// //     const environment = isProduction
// //       ? new paypal.core.LiveEnvironment(clientId, clientSecret)
// //       : new paypal.core.SandboxEnvironment(clientId, clientSecret);

// //     paypalClient = new paypal.core.PayPalHttpClient(environment);
// //   }
// //   return paypalClient;
// // };

// // export async function POST(request: NextRequest) {
// //   try {
// //     const { user } = await validateRequest();
// //     if (!user) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     const body = await request.json();
// //     const {
// //       shippingAddressId,
// //       paymentMethod,
// //       shippingMethod,
// //       cartItems,
// //       shippingFee,
// //       discountAmount,
// //       appliedCoupon,
// //     } = body;

// //     if (!Array.isArray(cartItems) || cartItems.length === 0) {
// //       return NextResponse.json(
// //         { error: "Cart is empty" },
// //         { status: 400 }
// //       );
// //     }

// //     if (!shippingAddressId) {
// //       return NextResponse.json(
// //         { error: "Shipping address required" },
// //         { status: 400 }
// //       );
// //     }

// //     if (!paymentMethod) {
// //       return NextResponse.json(
// //         { error: "Payment method required" },
// //         { status: 400 }
// //       );
// //     }

// //     const subTotal = cartItems.reduce(
// //       (sum: number, item: any) => sum + Number(item.price) * Number(item.quantity),
// //       0
// //     );

// //     const shippingFees = Number(shippingFee) || 0;
// //     const discount = Number(discountAmount) || 0;
// //     const total = Math.max(0, subTotal + shippingFees - discount);

// //     const shippingAddress = await db.shippingAddress.findUnique({
// //       where: { id: shippingAddressId, userId: user.id },
// //       include: { country: true },
// //     });

// //     if (!shippingAddress) {
// //       return NextResponse.json(
// //         { error: "Address not found" },
// //         { status: 400 }
// //       );
// //     }

// //     // Stok kontrolü
// //     for (const item of cartItems) {
// //       const size = await db.size.findFirst({
// //         where: { id: item.sizeId, productVariantId: item.variantId },
// //       });

// //       if (!size) {
// //         return NextResponse.json(
// //           { error: `Size not found for ${item.name}` },
// //           { status: 400 }
// //         );
// //       }

// //       if (size.quantity < item.quantity) {
// //         return NextResponse.json(
// //           { error: `Insufficient stock for ${item.name}` },
// //           { status: 400 }
// //         );
// //       }
// //     }

// //     let paymentMethodEnum: "Paypal" | "Stripe" | "COD" | "UPI" | null = null;

// //     if (paymentMethod === "card") {
// //       paymentMethodEnum = "Stripe";
// //     } else if (paymentMethod === "paypal") {
// //       paymentMethodEnum = "Paypal";
// //     } else if (paymentMethod === "cod") {
// //       paymentMethodEnum = "COD";
// //     } else if (paymentMethod === "upi") {
// //       paymentMethodEnum = "UPI";
// //     }

// //     // Order oluştur (başlangıçta Pending olarak)
// //     const order = await db.order.create({
// //       data: {
// //         userId: user.id,
// //         shippingAddressId,
// //         subTotal,
// //         shippingFees,
// //         total,
// //         orderStatus: "Pending",
// //         paymentStatus: "Pending",
// //         paymentMethod: paymentMethodEnum,
// //         groups: {
// //           create: cartItems.map((item: any) => ({
// //             storeId: item.storeId || "default-store",
// //             status: "Pending",
// //             shippingService: shippingMethod === "express"
// //               ? "Express Delivery"
// //               : "Standard Delivery",
// //             shippingDeliveryMin: shippingMethod === "express" ? 2 : 5,
// //             shippingDeliveryMax: shippingMethod === "express" ? 3 : 7,
// //             shippingFees: shippingFees / cartItems.length,
// //             subTotal: Number(item.price) * Number(item.quantity),
// //             total: Number(item.price) * Number(item.quantity) + (shippingFees / cartItems.length),
// //             note: shippingMethod === "express"
// //               ? "Express shipping"
// //               : "Standard shipping",
// //             ...(appliedCoupon && {
// //               couponId: appliedCoupon.couponId,
// //             }),
// //             items: {
// //               create: {
// //                 productId: item.productId,
// //                 variantId: item.variantId,
// //                 sizeId: item.sizeId,
// //                 productSlug: item.productSlug,
// //                 variantSlug: item.variantSlug,
// //                 sku: item.sku,
// //                 name: item.name,
// //                 image: item.image,
// //                 size: item.size,
// //                 quantity: Number(item.quantity),
// //                 price: Number(item.price),
// //                 totalPrice: Number(item.price) * Number(item.quantity),
// //                 shippingFee: shippingFees / cartItems.length,
// //                 status: "Pending",
// //               },
// //             },
// //           })),
// //         },
// //       },
// //       include: {
// //         groups: {
// //           include: {
// //             items: true,
// //             coupon: true,
// //           },
// //         },
// //       },
// //     });

// //     // Stok güncelleme
// //     for (const item of cartItems) {
// //       await db.size.update({
// //         where: { id: item.sizeId },
// //         data: { quantity: { decrement: item.quantity } },
// //       });
// //     }

// //     // Sepeti temizle
// //     try {
// //       const cart = await db.cart.findUnique({ where: { userId: user.id } });
// //       if (cart) {
// //         await db.cartItem.deleteMany({ where: { cartId: cart.id } });
// //         await db.cart.update({
// //           where: { id: cart.id },
// //           data: { couponId: null },
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Cart clear error:", error);
// //     }

// //     // Stripe ödeme
// //     if (paymentMethod === "card") {
// //       try {
// //         let customer: Stripe.Customer;
// //         const existingCustomers = await stripe.customers.list({
// //           email: user.email,
// //           limit: 1,
// //         });

// //         customer = existingCustomers.data.length > 0
// //           ? existingCustomers.data[0]
// //           : await stripe.customers.create({
// //               email: user.email,
// //               name: user.displayName || user.username,
// //               metadata: { userId: user.id },
// //             });

// //         const session = await stripe.checkout.sessions.create({
// //           customer: customer.id,
// //           mode: "payment",
// //           payment_method_types: ["card"],
// //           line_items: cartItems.map((item: any) => ({
// //             price_data: {
// //               currency: "usd",
// //               product_data: {
// //                 name: item.name,
// //                 description: `Size: ${item.size}`,
// //                 images: item.image ? [item.image] : [],
// //               },
// //               unit_amount: Math.round(Number(item.price) * 100),
// //             },
// //             quantity: item.quantity,
// //           })),
// //           ...(shippingFees > 0 && {
// //             shipping_options: [{
// //               shipping_rate_data: {
// //                 type: "fixed_amount",
// //                 fixed_amount: {
// //                   amount: Math.round(shippingFees * 100),
// //                   currency: "usd",
// //                 },
// //                 display_name: shippingMethod === "express"
// //                   ? "Express Shipping"
// //                   : "Standard Shipping",
// //               },
// //             }],
// //           }),
// //           ...(discount > 0 && {
// //             discounts: [{
// //               coupon: await stripe.coupons.create({
// //                 amount_off: Math.round(discount * 100),
// //                 currency: "usd",
// //                 duration: "once",
// //               }),
// //             }],
// //           }),
// //           metadata: {
// //             orderId: order.id,
// //             userId: user.id,
// //             paymentMethod: "Stripe"
// //           },
// //           success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/order/${order.id}?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
// //           cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
// //         });

// //         // PaymentDetails oluştur
// //         await db.paymentDetails.create({
// //           data: {
// //             paymentInetntId: session.id,
// //             paymentMethod: "Stripe",
// //             status: "Processing",
// //             amount: total,
// //             currency: "USD",
// //             orderId: order.id,
// //             userId: user.id,
// //           },
// //         });

// //         return NextResponse.json({
// //           success: true,
// //           paymentUrl: session.url,
// //           sessionId: session.id,
// //           order,
// //           redirectUrl: `/shop/order/${order.id}`,
// //         });

// //       } catch (error: any) {
// //         // Hata durumunda rollback
// //         for (const item of cartItems) {
// //           try {
// //             await db.size.update({
// //               where: { id: item.sizeId },
// //               data: { quantity: { increment: item.quantity } },
// //             });
// //           } catch {}
// //         }

// //         await db.order.update({
// //           where: { id: order.id },
// //           data: {
// //             paymentStatus: "Failed",
// //             orderStatus: "Cancelled",
// //           },
// //         });

// //         return NextResponse.json(
// //           { error: `Stripe error: ${error.message}` },
// //           { status: 500 }
// //         );
// //       }
// //     }

// //     // PayPal ödeme
// //     if (paymentMethod === "paypal") {
// //       try {
// //         const paypalClient = initializePayPal();
// //         const req = new paypal.orders.OrdersCreateRequest();

// //         req.requestBody({
// //           intent: "CAPTURE",
// //           purchase_units: [{
// //             reference_id: order.id,
// //             description: `Order #${order.id.slice(0, 8)}`,
// //             amount: {
// //               currency_code: "USD",
// //               value: total.toFixed(2),
// //               breakdown: {
// //                 item_total: { currency_code: "USD", value: subTotal.toFixed(2) },
// //                 shipping: { currency_code: "USD", value: shippingFees.toFixed(2) },
// //                 ...(discount > 0 && {
// //                   discount: { currency_code: "USD", value: discount.toFixed(2) },
// //                 }),
// //               },
// //             },
// //             items: cartItems.map((item: any) => ({
// //               name: item.name.length > 127 ? item.name.substring(0, 124) + "..." : item.name,
// //               sku: item.sku,
// //               unit_amount: { currency_code: "USD", value: Number(item.price).toFixed(2) },
// //               quantity: item.quantity.toString(),
// //               category: "PHYSICAL_GOODS",
// //             })),
// //           }],
// //           application_context: {
// //             brand_name: "OneShop",
// //             user_action: "PAY_NOW",
// //             return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/order/${order.id}?payment_success=true&payment_method=paypal`,
// //             cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
// //           },
// //         });

// //         const response = await paypalClient.execute(req);

// //         if (response.statusCode !== 201) {
// //           throw new Error(`PayPal error: ${response.statusCode}`);
// //         }

// //         // PaymentDetails oluştur
// //         await db.paymentDetails.create({
// //           data: {
// //             paymentInetntId: response.result.id,
// //             paymentMethod: "PayPal",
// //             status: "Processing",
// //             amount: total,
// //             currency: "USD",
// //             orderId: order.id,
// //             userId: user.id,
// //           },
// //         });

// //         const approvalUrl = response.result.links.find(
// //           (link: any) => link.rel === "approve"
// //         )?.href;

// //         if (!approvalUrl) throw new Error("No approval URL");

// //         return NextResponse.json({
// //           success: true,
// //           paymentUrl: approvalUrl,
// //           paypalOrderId: response.result.id,
// //           order,
// //           redirectUrl: `/shop/order/${order.id}`,
// //         });

// //       } catch (error: any) {
// //         // Hata durumunda rollback
// //         for (const item of cartItems) {
// //           try {
// //             await db.size.update({
// //               where: { id: item.sizeId },
// //               data: { quantity: { increment: item.quantity } },
// //             });
// //           } catch {}
// //         }

// //         await db.order.update({
// //           where: { id: order.id },
// //           data: {
// //             paymentStatus: "Failed",
// //             orderStatus: "Cancelled",
// //           },
// //         });

// //         return NextResponse.json(
// //           { error: `PayPal error: ${error.message}` },
// //           { status: 500 }
// //         );
// //       }
// //     }

// //     // COD/UPI ödeme (ödeme sonrası)
// //     if (paymentMethod === "cod" || paymentMethod === "upi") {
// //       // COD/UPI için hemen Paid olarak işaretle
// //       const updatedOrder = await db.order.update({
// //         where: { id: order.id },
// //         data: {
// //           paymentStatus: "Paid",
// //           orderStatus: "Confirmed",
// //         },
// //         include: {
// //           groups: {
// //             include: {
// //               items: true,
// //               coupon: true,
// //             },
// //           },
// //         },
// //       });

// //       // COD/UPI için PaymentDetails oluştur
// //       await db.paymentDetails.create({
// //         data: {
// //           paymentInetntId: `COD_UPI_${order.id}`,
// //           paymentMethod: paymentMethod === "cod" ? "COD" : "UPI",
// //           status: "Completed",
// //           amount: total,
// //           currency: "USD",
// //           orderId: order.id,
// //           userId: user.id,
// //         },
// //       });

// //       return NextResponse.json({
// //         success: true,
// //         order: updatedOrder,
// //         message: "Order placed successfully",
// //         redirectUrl: `/shop/order/${order.id}`,
// //       });
// //     }

// //     return NextResponse.json(
// //       { error: "Invalid payment method" },
// //       { status: 400 }
// //     );

// //   } catch (error: any) {
// //     console.error("Checkout error:", error);
// //     return NextResponse.json(
// //       { error: error.message || "Server error" },
// //       { status: 500 }
// //     );
// //   }
// // }

// //Final Part

// import { NextRequest, NextResponse } from "next/server";
// import db from "@/app/lib/db";
// import Stripe from "stripe";
// import { validateRequest } from "@/app/auth";
// import paypal from "@paypal/checkout-server-sdk";
// import { Resend } from "resend";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-08-27.basil",
// });

// const resend = new Resend(process.env.RESEND_API_KEY!);

// let paypalClient: paypal.core.PayPalHttpClient;
// const initializePayPal = () => {
//   if (!paypalClient) {
//     const clientId = process.env.PAYPAL_CLIENT_ID!;
//     const clientSecret = process.env.PAYPAL_SECRET!;

//     const isProduction = process.env.NODE_ENV === "production";
//     const environment = isProduction
//       ? new paypal.core.LiveEnvironment(clientId, clientSecret)
//       : new paypal.core.SandboxEnvironment(clientId, clientSecret);

//     paypalClient = new paypal.core.PayPalHttpClient(environment);
//   }
//   return paypalClient;
// };

// // Currency conversion
// const currencyRates: Record<string, number> = {
//   USD: 1,
//   EUR: 0.92,
//   GBP: 0.79,
//   TRY: 32.5,
// };

// const convertCurrency = (
//   amount: number,
//   fromCurrency: string,
//   toCurrency: string,
// ): number => {
//   if (fromCurrency === toCurrency) return amount;
//   const amountInUSD = amount / (currencyRates[fromCurrency] || 1);
//   return amountInUSD * (currencyRates[toCurrency] || 1);
// };

// export async function POST(request: NextRequest) {
//   try {
//     const { user } = await validateRequest();
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await request.json();
//     const {
//       shippingAddressId,
//       paymentMethod,
//       shippingMethod,
//       cartItems,
//       shippingFee,
//       discountAmount,
//       appliedCoupon,
//       currency = "USD",
//       note = "",
//     } = body;

//     // Validations
//     if (!Array.isArray(cartItems) || cartItems.length === 0) {
//       return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
//     }
//     if (!shippingAddressId) {
//       return NextResponse.json(
//         { error: "Shipping address required" },
//         { status: 400 },
//       );
//     }
//     if (!paymentMethod) {
//       return NextResponse.json(
//         { error: "Payment method required" },
//         { status: 400 },
//       );
//     }

//     // Calculate totals
//     const subTotal = cartItems.reduce(
//       (sum: number, item: any) =>
//         sum + Number(item.price) * Number(item.quantity),
//       0,
//     );
//     const shippingFees = Number(shippingFee) || 0;
//     const discount = Number(discountAmount) || 0;
//     const total = Math.max(0, subTotal + shippingFees - discount);

//     // Verify shipping address
//     const shippingAddress = await db.shippingAddress.findUnique({
//       where: { id: shippingAddressId, userId: user.id },
//       include: { country: true },
//     });
//     if (!shippingAddress) {
//       return NextResponse.json({ error: "Address not found" }, { status: 400 });
//     }

//     // Stock check
//     for (const item of cartItems) {
//       const size = await db.size.findFirst({
//         where: { id: item.sizeId, productVariantId: item.variantId },
//       });
//       if (!size) {
//         return NextResponse.json(
//           { error: `Size not found for ${item.name}` },
//           { status: 400 },
//         );
//       }
//       if (size.quantity < item.quantity) {
//         return NextResponse.json(
//           { error: `Insufficient stock for ${item.name}` },
//           { status: 400 },
//         );
//       }
//     }

//     // Determine payment method enum
//     let paymentMethodEnum: "Paypal" | "Stripe" | "COD" | "UPI" | null = null;
//     if (paymentMethod === "card") paymentMethodEnum = "Stripe";
//     else if (paymentMethod === "paypal") paymentMethodEnum = "Paypal";
//     else if (paymentMethod === "cod") paymentMethodEnum = "COD";
//     else if (paymentMethod === "upi") paymentMethodEnum = "UPI";

//     // Create order (initially Pending)
//     const order = await db.order.create({
//       data: {
//         userId: user.id,
//         shippingAddressId,
//         subTotal,
//         shippingFees,
//         total,
//         currency,
//         orderStatus: "Pending",
//         paymentStatus: "Pending",
//         paymentMethod: paymentMethodEnum,
//         groups: {
//           create: cartItems.map((item: any) => ({
//             storeId: item.storeId || "default-store",
//             status: "Pending",
//             shippingService:
//               shippingMethod === "express"
//                 ? "Express Delivery"
//                 : "Standard Delivery",
//             shippingDeliveryMin: shippingMethod === "express" ? 2 : 5,
//             shippingDeliveryMax: shippingMethod === "express" ? 3 : 7,
//             shippingFees: shippingFees / cartItems.length,
//             subTotal: Number(item.price) * Number(item.quantity),
//             total:
//               Number(item.price) * Number(item.quantity) +
//               shippingFees / cartItems.length,
//             note:
//               shippingMethod === "express"
//                 ? "Express shipping"
//                 : "Standard shipping",
//             ...(appliedCoupon && { couponId: appliedCoupon.couponId }),
//             items: {
//               create: {
//                 productId: item.productId,
//                 variantId: item.variantId,
//                 sizeId: item.sizeId,
//                 productSlug: item.productSlug,
//                 variantSlug: item.variantSlug,
//                 sku: item.sku,
//                 name: item.name,
//                 image: item.image,
//                 size: item.size,
//                 quantity: Number(item.quantity),
//                 price: Number(item.price),
//                 totalPrice: Number(item.price) * Number(item.quantity),
//                 shippingFee: shippingFees / cartItems.length,
//                 status: "Pending",
//               },
//             },
//           })),
//         },
//       },
//       include: {
//         groups: {
//           include: {
//             items: true,
//             coupon: true,
//             store: true,
//           },
//         },
//         shippingAddress: {
//           include: {
//             country: true,
//           },
//         },
//       },
//     });

//     // Update stock
//     for (const item of cartItems) {
//       await db.size.update({
//         where: { id: item.sizeId },
//         data: { quantity: { decrement: item.quantity } },
//       });
//     }

//     // Clear cart
//     try {
//       const cart = await db.cart.findUnique({ where: { userId: user.id } });
//       if (cart) {
//         await db.cartItem.deleteMany({ where: { cartId: cart.id } });
//         await db.cart.update({
//           where: { id: cart.id },
//           data: { couponId: null },
//         });
//       }
//     } catch (error) {
//       console.error("Cart clear error:", error);
//     }

//     // STRIPE PAYMENT

//     //     if (paymentMethod === "card") {
//     //   try {
//     //     let customer: Stripe.Customer;
//     //     const existingCustomers = await stripe.customers.list({
//     //       email: user.email,
//     //       limit: 1,
//     //     });
//     //     customer = existingCustomers.data.length > 0
//     //       ? existingCustomers.data[0]
//     //       : await stripe.customers.create({
//     //           email: user.email,
//     //           name: user.displayName || user.username,
//     //           metadata: { userId: user.id },
//     //         });

//     //     // Discount'ı Stripe'da göstermeden, sadece ödeme total'ini azalt
//     //     // Bu durumda kullanıcı Stripe'da discount'ı görmez ama ödeme total'inde olur

//     //     // DÜZELTİLMİŞ: Coupon oluşturmadan doğrudan session yarat
//     //     const session = await stripe.checkout.sessions.create({
//     //       customer: customer.id,
//     //       mode: "payment",
//     //       payment_method_types: ["card"],
//     //       line_items: cartItems.map((item: any) => ({
//     //         price_data: {
//     //           currency: currency.toLowerCase(),
//     //           product_data: {
//     //             name: item.name,
//     //             description: `Size: ${item.size}`,
//     //             images: item.image ? [item.image] : [],
//     //           },
//     //           // Discount'ı item fiyatına yansıt
//     //           unit_amount: Math.round(
//     //             convertCurrency(
//     //               discount > 0
//     //                 ? item.price * (1 - (discount / subTotal))
//     //                 : item.price,
//     //               currency,
//     //               "USD"
//     //             ) * 100
//     //           ),
//     //         },
//     //         quantity: item.quantity,
//     //       })),
//     //       ...(shippingFees > 0 && {
//     //         shipping_options: [{
//     //           shipping_rate_data: {
//     //             type: "fixed_amount",
//     //             fixed_amount: {
//     //               amount: Math.round(convertCurrency(shippingFees, currency, "USD") * 100),
//     //               currency: currency.toLowerCase(),
//     //             },
//     //             display_name: shippingMethod === "express" ? "Express Shipping" : "Standard Shipping",
//     //           },
//     //         }],
//     //       }),
//     //       metadata: {
//     //         orderId: order.id,
//     //         userId: user.id,
//     //         paymentMethod: "Stripe",
//     //         currency,
//     //         discountApplied: discount.toString(),
//     //         couponCode: appliedCoupon?.couponCode || "",
//     //       },
//     //       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/order/${order.id}?payment_success=true&session_id={CHECKOUT_SESSION_ID}&payment_method=stripe`,
//     //       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
//     //     });

//     //     // ✅ CRITICAL: MARK ORDER AS PAID IMMEDIATELY
//     //     console.log("✅ Stripe session created. Marking order as paid in DB...");

//     //     const paidOrder = await db.order.update({
//     //       where: { id: order.id },
//     //       data: {
//     //         paymentStatus: "Paid",
//     //         orderStatus: "Confirmed",
//     //       },
//     //       include: {
//     //         groups: {
//     //           include: {
//     //             items: true,
//     //             store: true,
//     //           },
//     //         },
//     //       },
//     //     });

//     //     // Create PaymentDetails as Completed
//     //     await db.paymentDetails.create({
//     //       data: {
//     //         paymentInetntId: session.id,
//     //         paymentMethod: "Stripe",
//     //         status: "Completed",
//     //         amount: total,
//     //         currency,
//     //         orderId: order.id,
//     //         userId: user.id,
//     //       },
//     //     });

//     //     // Send invoice email
//     //     try {
//     //       await sendInvoiceEmail(user, paidOrder, currency);
//     //     } catch (emailError) {
//     //       console.error("Failed to send invoice email:", emailError);
//     //     }

//     //     return NextResponse.json({
//     //       success: true,
//     //       paymentUrl: session.url,
//     //       sessionId: session.id,
//     //       order: paidOrder,
//     //       redirectUrl: `/shop/order/${order.id}`,
//     //       message: "Order created and marked as paid",
//     //     });

//     //   } catch (error: any) {
//     //     // Rollback on error
//     //     console.error("Stripe error:", error);
//     //     await rollbackOrder(order.id, cartItems);
//     //     return NextResponse.json({ error: `Stripe error: ${error.message}` }, { status: 500 });
//     //   }
//     // }

//     if (paymentMethod === "card") {
//       try {
//         let customer: Stripe.Customer;
//         const existingCustomers = await stripe.customers.list({
//           email: user.email,
//           limit: 1,
//         });

//         customer =
//           existingCustomers.data.length > 0
//             ? existingCustomers.data[0]
//             : await stripe.customers.create({
//                 email: user.email,
//                 name: user.displayName || user.username,
//                 metadata: { userId: user.id },
//               });

//         // Önce order'ı "Pending" olarak işaretle
//         await db.order.update({
//           where: { id: order.id },
//           data: {
//             paymentStatus: "Pending",
//             orderStatus: "Pending",
//           },
//         });

//         // Stripe session oluştur - TAM KOD
//         const session = await stripe.checkout.sessions.create({
//           customer: customer.id,
//           mode: "payment", // ✅ Bu çok önemli!
//           payment_method_types: ["card"],
//           line_items: cartItems.map((item: any) => ({
//             price_data: {
//               currency: currency.toLowerCase(),
//               product_data: {
//                 name: item.name,
//                 description: `Size: ${item.size}`,
//                 images: item.image ? [item.image] : [],
//               },
//               unit_amount: Math.round(
//                 convertCurrency(item.price, "USD", currency) * 100,
//               ),
//             },
//             quantity: item.quantity,
//           })),
//           ...(shippingFees > 0 && {
//             shipping_options: [
//               {
//                 shipping_rate_data: {
//                   type: "fixed_amount",
//                   fixed_amount: {
//                     amount: Math.round(
//                       convertCurrency(shippingFees, currency, "USD") * 100,
//                     ),
//                     currency: currency.toLowerCase(),
//                   },
//                   display_name:
//                     shippingMethod === "express"
//                       ? "Express Shipping"
//                       : "Standard Shipping",
//                 },
//               },
//             ],
//           }),
//           metadata: {
//             orderId: order.id,
//             userId: user.id,
//             paymentMethod: "Stripe",
//             currency,
//           },
//           success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/oneshop/checkout/stripe/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
//           cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?canceled=true`,
//         });

//         // PaymentDetails oluştur
//         await db.paymentDetails.create({
//           data: {
//             paymentInetntId: session.id,
//             paymentMethod: "Stripe",
//             status: "Pending",
//             amount: total,
//             currency,
//             orderId: order.id,
//             userId: user.id,
//           },
//         });

//         console.log("✅ Stripe session created:", session.id);

//         return NextResponse.json({
//           success: true,
//           paymentUrl: session.url,
//           sessionId: session.id,
//           order: order,
//           message: "Redirecting to Stripe checkout",
//         });
//       } catch (error: any) {
//         console.error("Stripe error:", error);
//         await rollbackOrder(order.id, cartItems);
//         return NextResponse.json(
//           { error: `Stripe error: ${error.message}` },
//           { status: 500 },
//         );
//       }
//     }

//     // PAYPAL PAYMENT

//     // if (paymentMethod === "paypal") {
//     //   try {
//     //     const paypalClient = initializePayPal();
//     //     const req = new paypal.orders.OrdersCreateRequest();

//     //     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//     //     const returnUrl = `${baseUrl}/shop/order/${order.id}?payment_success=true&payment_method=paypal`;
//     //     const cancelUrl = `${baseUrl}/checkout`;

//     //     // ✅ DÜZELTİLMİŞ: Ülke kodunu almak için helper fonksiyon
//     //     const getCountryCode = (countryName: string): string => {
//     //       const countryMap: Record<string, string> = {
//     //         'United States': 'US',
//     //         'USA': 'US',
//     //         'United Kingdom': 'GB',
//     //         'UK': 'GB',
//     //         'Great Britain': 'GB',
//     //         'Turkey': 'TR',
//     //         'Turkiye': 'TR',
//     //         'Germany': 'DE',
//     //         'France': 'FR',
//     //         'Italy': 'IT',
//     //         'Spain': 'ES',
//     //         'Canada': 'CA',
//     //         'Australia': 'AU',
//     //         'Japan': 'JP',
//     //         'China': 'CN',
//     //         'India': 'IN',
//     //         // Diğer ülkeleri ekleyebilirsiniz
//     //       };
//     //       return countryMap[countryName] || countryName.substring(0, 2).toUpperCase();
//     //     };

//     //     const countryCode = getCountryCode(shippingAddress.country?.name || 'US');

//     //     // ✅ DÜZELTİLMİŞ: PayPal shipping address formatında adres oluştur
//     //     const paypalShippingAddress = {
//     //       address_line_1: shippingAddress.address1,
//     //       address_line_2: shippingAddress.address2 || "",
//     //       admin_area_2: shippingAddress.city,
//     //       admin_area_1: shippingAddress.state,
//     //       postal_code: shippingAddress.zip_code,
//     //       country_code: countryCode,
//     //     };

//     //     req.requestBody({
//     //       intent: "CAPTURE",
//     //       purchase_units: [{
//     //         reference_id: order.id,
//     //         description: `Order #${order.id.slice(0, 8)}`,
//     //         amount: {
//     //           currency_code: currency,
//     //           value: total.toFixed(2),
//     //           breakdown: {
//     //             item_total: { currency_code: currency, value: subTotal.toFixed(2) },
//     //             shipping: { currency_code: currency, value: shippingFees.toFixed(2) },
//     //             ...(discount > 0 && {
//     //               discount: { currency_code: currency, value: discount.toFixed(2) },
//     //             }),
//     //           },
//     //         },
//     //         items: cartItems.map((item: any) => ({
//     //           name: item.name.length > 127 ? item.name.substring(0, 124) + "..." : item.name,
//     //           sku: item.sku,
//     //           unit_amount: {
//     //             currency_code: currency,
//     //             value: convertCurrency(item.price, "USD", currency).toFixed(2)
//     //           },
//     //           quantity: item.quantity.toString(),
//     //           category: "PHYSICAL_GOODS",
//     //         })),
//     //         // ✅ DÜZELTİLMİŞ: Shipping adresini ekle
//     //         shipping: {
//     //           name: {
//     //             full_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
//     //           },
//     //           address: paypalShippingAddress,
//     //         },
//     //       }],
//     //       application_context: {
//     //         brand_name: "OneShop",
//     //         user_action: "PAY_NOW",
//     //         // ✅ DÜZELTİLMİŞ: Shipping preference'ı güncelle
//     //         shipping_preference: "SET_PROVIDED_ADDRESS", // Artık adresimiz var
//     //         return_url: returnUrl,
//     //         cancel_url: cancelUrl,
//     //         payment_method: {
//     //           payer_selected: "PAYPAL",
//     //           payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
//     //         },
//     //       },
//     //     });

//     //     console.log("PayPal request body:", JSON.stringify(req.body, null, 2));

//     //     const response = await paypalClient.execute(req);
//     //     if (response.statusCode !== 201) {
//     //       throw new Error(`PayPal error: ${response.statusCode} - ${JSON.stringify(response.result)}`);
//     //     }

//     //     // ✅ CRITICAL: MARK ORDER AS PAID IMMEDIATELY
//     //     console.log("✅ PayPal order created. Marking order as paid in DB...");

//     //     const paidOrder = await db.order.update({
//     //       where: { id: order.id },
//     //       data: {
//     //         paymentStatus: "Paid",
//     //         orderStatus: "Confirmed",
//     //       },
//     //       include: {
//     //         groups: {
//     //           include: {
//     //             items: true,
//     //             store: true,
//     //           },
//     //         },
//     //       },
//     //     });

//     //     // Create PaymentDetails as Completed
//     //     await db.paymentDetails.create({
//     //       data: {
//     //         paymentInetntId: response.result.id,
//     //         paymentMethod: "PayPal",
//     //         status: "Completed",
//     //         amount: total,
//     //         currency,
//     //         orderId: order.id,
//     //         userId: user.id,
//     //       },
//     //     });

//     //     // Try to capture PayPal payment
//     //     try {
//     //       const captureReq = new paypal.orders.OrdersCaptureRequest(response.result.id);
//     //       const captureResponse = await paypalClient.execute(captureReq);
//     //       console.log("✅ PayPal payment captured:", captureResponse.result.status);
//     //     } catch (captureError) {
//     //       console.log("ℹ️ PayPal capture might happen on user approval");
//     //     }

//     //     // Send invoice email
//     //     try {
//     //       await sendInvoiceEmail(user, paidOrder, currency);
//     //     } catch (emailError) {
//     //       console.error("Failed to send invoice email:", emailError);
//     //     }

//     //     const approvalUrl = response.result.links.find(
//     //       (link: any) => link.rel === "approve"
//     //     )?.href;

//     //     if (!approvalUrl) throw new Error("No approval URL");

//     //     return NextResponse.json({
//     //       success: true,
//     //       paymentUrl: approvalUrl,
//     //       paypalOrderId: response.result.id,
//     //       order: paidOrder,
//     //       redirectUrl: `/shop/order/${order.id}`,
//     //       message: "Order created and marked as paid",
//     //     });

//     //   } catch (error: any) {
//     //     console.error("PayPal error details:", error);

//     //     // Rollback on error
//     //     await rollbackOrder(order.id, cartItems);

//     //     return NextResponse.json({
//     //       error: `PayPal error: ${error.message}`,
//     //       details: error.result || null
//     //     }, { status: 500 });
//     //   }
//     // }

//     if (paymentMethod === "paypal") {
//       try {
//         const paypalClient = initializePayPal();
//         const req = new paypal.orders.OrdersCreateRequest();

//         const baseUrl =
//           process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//         const returnUrl = `${baseUrl}/api/oneshop/checkout/paypal/success?order_id=${order.id}`;
//         const cancelUrl = `${baseUrl}/checkout?canceled=true`;

//         // Önce order'ı "Processing" olarak işaretle
//         await db.order.update({
//           where: { id: order.id },
//           data: {
//             paymentStatus: "Pending",
//             orderStatus: "Pending",
//           },
//         });

//         const getCountryCode = (countryName: string): string => {
//           const countryMap: Record<string, string> = {
//             "United States": "US",
//             USA: "US",
//             "United Kingdom": "GB",
//             UK: "GB",
//             "Great Britain": "GB",
//             Turkey: "TR",
//             Turkiye: "TR",
//             Germany: "DE",
//             France: "FR",
//             Italy: "IT",
//             Spain: "ES",
//             Canada: "CA",
//             Australia: "AU",
//             Japan: "JP",
//             China: "CN",
//             India: "IN",
//           };
//           return (
//             countryMap[countryName] || countryName.substring(0, 2).toUpperCase()
//           );
//         };

//         const countryCode = getCountryCode(
//           shippingAddress.country?.name || "US",
//         );

//         const paypalShippingAddress = {
//           address_line_1: shippingAddress.address1,
//           address_line_2: shippingAddress.address2 || "",
//           admin_area_2: shippingAddress.city,
//           admin_area_1: shippingAddress.state,
//           postal_code: shippingAddress.zip_code,
//           country_code: countryCode,
//         };

//         req.requestBody({
//           intent: "CAPTURE",
//           purchase_units: [
//             {
//               reference_id: order.id,
//               description: `Order #${order.id.slice(0, 8)}`,
//               amount: {
//                 currency_code: currency,
//                 value: total.toFixed(2),
//                 breakdown: {
//                   item_total: {
//                     currency_code: currency,
//                     value: subTotal.toFixed(2),
//                   },
//                   shipping: {
//                     currency_code: currency,
//                     value: shippingFees.toFixed(2),
//                   },
//                   ...(discount > 0 && {
//                     discount: {
//                       currency_code: currency,
//                       value: discount.toFixed(2),
//                     },
//                   }),
//                 },
//               },
//               items: cartItems.map((item: any) => ({
//                 name:
//                   item.name.length > 127
//                     ? item.name.substring(0, 124) + "..."
//                     : item.name,
//                 sku: item.sku,
//                 unit_amount: {
//                   currency_code: currency,
//                   value: convertCurrency(item.price, "USD", currency).toFixed(
//                     2,
//                   ),
//                 },
//                 quantity: item.quantity.toString(),
//                 category: "PHYSICAL_GOODS",
//               })),
//               shipping: {
//                 name: {
//                   full_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
//                 },
//                 address: paypalShippingAddress,
//               },
//             },
//           ],
//           application_context: {
//             brand_name: "OneShop",
//             user_action: "PAY_NOW",
//             shipping_preference: "SET_PROVIDED_ADDRESS",
//             return_url: returnUrl,
//             cancel_url: cancelUrl,
//             payment_method: {
//               payer_selected: "PAYPAL",
//               payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
//             },
//           },
//         });

//         console.log(
//           "PayPal request body:",
//           JSON.stringify(req.requestBody, null, 2),
//         );

//         const response = await paypalClient.execute(req);

//         if (response.statusCode !== 201) {
//           throw new Error(
//             `PayPal error: ${response.statusCode} - ${JSON.stringify(response.result)}`,
//           );
//         }

//         // PaymentDetails oluştur (pending)
//         await db.paymentDetails.create({
//           data: {
//             paymentInetntId: response.result.id,
//             paymentMethod: "PayPal",
//             status: "Pending",
//             amount: total,
//             currency,
//             orderId: order.id,
//             userId: user.id,
//           },
//         });

//         const approvalUrl = response.result.links.find(
//           (link: any) => link.rel === "approve",
//         )?.href;

//         if (!approvalUrl) throw new Error("No approval URL found");

//         console.log(
//           "✅ PayPal order created successfully:",
//           response.result.id,
//         );

//         return NextResponse.json({
//           success: true,
//           paymentUrl: approvalUrl,
//           paypalOrderId: response.result.id,
//           order: order,
//           message: "Redirecting to PayPal",
//         });
//       } catch (error: any) {
//         console.error("PayPal error details:", error);

//         // Rollback on error
//         await rollbackOrder(order.id, cartItems);

//         return NextResponse.json(
//           {
//             error: `PayPal error: ${error.message}`,
//             details: error.result || null,
//           },
//           { status: 500 },
//         );
//       }
//     }

//     // COD/UPI PAYMENT

//     if (paymentMethod === "cod" || paymentMethod === "upi") {
//       // Mark as Paid immediately for COD/UPI
//       const paidOrder = await db.order.update({
//         where: { id: order.id },
//         data: {
//           paymentStatus: "Paid",
//           orderStatus: "Confirmed",
//         },
//         include: {
//           groups: {
//             include: {
//               items: true,
//               store: true,
//             },
//           },
//         },
//       });

//       // Create PaymentDetails for COD/UPI
//       await db.paymentDetails.create({
//         data: {
//           paymentInetntId: `${paymentMethod.toUpperCase()}_${order.id}`,
//           paymentMethod: paymentMethod === "cod" ? "COD" : "UPI",
//           status: "Completed",
//           amount: total,
//           currency,
//           orderId: order.id,
//           userId: user.id,
//         },
//       });

//       // Send invoice email
//       try {
//         await sendInvoiceEmail(user, paidOrder, currency);
//       } catch (emailError) {
//         console.error("Failed to send invoice email:", emailError);
//       }

//       return NextResponse.json({
//         success: true,
//         order: paidOrder,
//         message: "Order placed successfully",
//         redirectUrl: `/shop/order/${order.id}`,
//       });
//     }

//     return NextResponse.json(
//       { error: "Invalid payment method" },
//       { status: 400 },
//     );
//   } catch (error: any) {
//     console.error("Checkout error:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 },
//     );
//   }
// }

// // Helper function to rollback order on error
// async function rollbackOrder(orderId: string, cartItems: any[]) {
//   try {
//     // Restore stock
//     for (const item of cartItems) {
//       await db.size.update({
//         where: { id: item.sizeId },
//         data: { quantity: { increment: item.quantity } },
//       });
//     }

//     // Mark order as failed
//     await db.order.update({
//       where: { id: orderId },
//       data: {
//         paymentStatus: "Failed",
//         orderStatus: "Cancelled",
//       },
//     });

//     console.log(`Order ${orderId} rolled back successfully`);
//   } catch (rollbackError) {
//     console.error("Rollback failed:", rollbackError);
//   }
// }

// // Send invoice email
// async function sendInvoiceEmail(user: any, order: any, currency: string) {
//   try {
//     const orderDate = new Date(order.createdAt);
//     const formattedDate = orderDate.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//     const totalDiscount = order.groups.reduce((sum: number, group: any) => {
//       return sum + (group.coupon?.discount || 0);
//     }, 0);

//     const html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Order Invoice - OneShop</title>
//         <style>
//           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
//           .container { max-width: 600px; margin: 0 auto; background: #fff; }
//           .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
//           .header h1 { margin: 0; font-size: 28px; }
//           .content { padding: 30px; }
//           .order-info { background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #667eea; }
//           .invoice-table { width: 100%; border-collapse: collapse; margin: 25px 0; }
//           .invoice-table th { background: #f8f9fa; padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; }
//           .invoice-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
//           .total-row { font-weight: bold; background: #f0f9ff; }
//           .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>Order Confirmation</h1>
//             <p>Thank you for your purchase!</p>
//           </div>
//           <div class="content">
//             <p>Dear ${user.displayName || user.username},</p>
//             <p>Your order has been confirmed and payment received.</p>
            
//             <div class="order-info">
//               <h3>Order #${order.id}</h3>
//               <p><strong>Date:</strong> ${formattedDate}</p>
//               <p><strong>Status:</strong> ${order.orderStatus}</p>
//               <p><strong>Payment:</strong> ${order.paymentStatus}</p>
//             </div>
            
//             <table class="invoice-table">
//               <thead>
//                 <tr>
//                   <th>Item</th>
//                   <th>Qty</th>
//                   <th>Price</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${order.groups
//                   .flatMap((group: any) =>
//                     group.items.map(
//                       (item: any) => `
//                     <tr>
//                       <td>${item.name} (${item.size})</td>
//                       <td>${item.quantity}</td>
//                       <td>${currency}${item.price.toFixed(2)}</td>
//                       <td>${currency}${item.totalPrice.toFixed(2)}</td>
//                     </tr>
//                   `,
//                     ),
//                   )
//                   .join("")}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td colspan="3" style="text-align: right;"><strong>Subtotal:</strong></td>
//                   <td>${currency}${order.subTotal.toFixed(2)}</td>
//                 </tr>
//                 ${
//                   totalDiscount > 0
//                     ? `
//                 <tr>
//                   <td colspan="3" style="text-align: right;"><strong>Discount:</strong></td>
//                   <td>-${currency}${totalDiscount.toFixed(2)}</td>
//                 </tr>
//                 `
//                     : ""
//                 }
//                 <tr class="total-row">
//                   <td colspan="3" style="text-align: right;"><strong>Total:</strong></td>
//                   <td>${currency}${order.total.toFixed(2)}</td>
//                 </tr>
//               </tfoot>
//             </table>
            

            
//             <p>Thank you for shopping with us!</p>
//           </div>
//           <div class="footer">
//             <p>OneShop Team</p>
//             <p>© ${new Date().getFullYear()} OneShop. All rights reserved.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;

//     await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: user.email!,
//       subject: `Your Order Confirmation #${order.id.slice(0, 8)}`,
//       html,
//     });

//     console.log("✅ Invoice email sent");
//   } catch (error) {
//     console.error("Failed to send invoice email:", error);
//   }
// }

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const orderId = searchParams.get("orderId");

//   if (!orderId) {
//     return NextResponse.json({ error: "Order ID required" }, { status: 400 });
//   }

//   try {
//     const order = await db.order.findUnique({
//       where: { id: orderId },
//       include: {
//         groups: {
//           include: {
//             items: true,
//             store: true,
//             coupon: true,
//           },
//         },
//         shippingAddress: {
//           include: {
//             country: true,
//           },
//         },
//         paymentDetails: true,
//         user: true,
//       },
//     });

//     if (!order) {
//       return NextResponse.json({ error: "Order not found" }, { status: 404 });
//     }

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch order" },
//       { status: 500 },
//     );
//   }
// }
