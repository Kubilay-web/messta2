// // app/api/company/razorpay/order/route.ts

// import { NextResponse } from "next/server";
// import db from "@/app/lib/db";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { id } = body;

//   try {
//     const plan = await db.plan.findUnique({
//       where: { id },
//     });

//     if (!plan) {
//       return NextResponse.json({ err: "Plan bulunamadı" }, { status: 404 });
//     }

//     // Razorpay siparişini oluştur
//     const options = {
//       amount: plan.price * 100, // Küçük birim; örn. 500 → 50000 paise
//       currency: "INR",
//       receipt: `order_${id}_${Date.now()}`,
//       notes: { userId: id },
//     };

//     const order = await razorpay.orders.create(options);
//     console.log("Razorpay order:", order);

//     return NextResponse.json(order);
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ err: err.message }, { status: 500 });
//   }
// }
