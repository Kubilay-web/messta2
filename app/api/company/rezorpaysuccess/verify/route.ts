// // app/api/company/razorpay/verify/route.ts

// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";
// import { v4 as uuidv4 } from "uuid";
// import db from "@/app/lib/db";
// import { validateRequest } from "@/app/auth";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { razorpay_payment_id } = body;
//   const { user } = await validateRequest();

//   try {
//     const payment = await razorpay.payments.fetch(razorpay_payment_id);
//     const planId = payment.notes?.userId as string;

//     const plan = await db.plan.findUnique({ where: { id: planId } });
//     const company = await db.company.findUnique({
//       where: { userId: user!.id },
//     });

//     if (!payment || payment.status !== "captured" || !plan || !company) {
//       return NextResponse.json(
//         { error: "Payment verification failed" },
//         { status: 400 },
//       );
//     }

//     const amount = payment.amount / 100;
//     const currency = payment.currency;

//     // 1️⃣ Orders kaydı
//     await db.orderJob.create({
//       data: {
//         company_id: company.id,
//         plan_id: plan.id,
//         package_name: plan.leble,
//         transaction_id: payment.id,
//         order_id: uuidv4(),
//         payment_provider: "Razorpay",
//         amount,
//         paid_in_currency: currency,
//         default_amount: plan.price,
//         payment_status: "paid",
//       },
//     });

//     // 2️⃣ Userplan güncelle
//     const existing = await db.userplan.findFirst({
//       where: { company_id: company.id },
//     });

//     if (existing) {
//       await db.userplan.update({
//         where: { company_id: company.id },
//         data: {
//           plan_id: plan.id,
//           profile_verify: plan.profileverify,
//           job_limit: existing.job_limit + plan.joblimit,
//           featured_job_limit:
//             existing.featured_job_limit + plan.featuredjoblimit,
//           highlight_job_limit:
//             existing.highlight_job_limit + plan.highlightjoblimit,
//         },
//       });
//     } else {
//       await db.userplan.create({
//         data: {
//           company_id: company.id,
//           plan_id: plan.id,
//           job_limit: plan.joblimit,
//           featured_job_limit: plan.featuredjoblimit,
//           highlight_job_limit: plan.highlightjoblimit,
//           profile_verify: plan.profileverify,
//         },
//       });
//     }

//     return NextResponse.json({ success: "payment verified" });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
