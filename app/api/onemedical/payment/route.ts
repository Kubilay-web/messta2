// import { NextResponse } from "next/server";
// import { updateAppointmentPaymentStatus } from "@/app/(components)/(content-layout)/medical/actions/appointments";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { paymentIntentId, appointmentId } = body;

//     console.log("Confirm payment request:", { paymentIntentId, appointmentId });

//     if (!paymentIntentId || !appointmentId) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Appointment'ı güncelle
//     const result = await updateAppointmentPaymentStatus(
//       appointmentId,
//       paymentIntentId,
//       "paid"
//     );

//     if (result.error) {
//       console.error("Error updating appointment:", result.error);
//       return NextResponse.json(
//         { error: result.error },
//         { status: 500 }
//       );
//     }

//     console.log("Appointment updated successfully:", result.data);

//     return NextResponse.json({ 
//       success: true, 
//       data: result.data 
//     });

//   } catch (error) {
//     console.error("Error confirming payment:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }