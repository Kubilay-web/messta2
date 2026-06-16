// "use client";
// import { useRouter } from "next/navigation";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import { FormEvent, useEffect, useState } from "react";
// import {
//   createStripePayment,
//   createStripePaymentIntent,
// } from "@/app/queries/stripe";
// export default function StripePayment({ orderId }: { orderId: string }) {
//   const router = useRouter();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState<string>();
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     getClientSecret();
//   }, [orderId]);

//   const getClientSecret = async () => {
//     const res = await createStripePaymentIntent(orderId);
//     if (res.clientSecret) setClientSecret(res.clientSecret);
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       setErrorMessage(submitError.message);
//       setLoading(false);
//       return;
//     }

//     if (clientSecret) {
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: "http://localhost:3000",
//         },
//         redirect: "if_required",
//       });

//       if (!error && paymentIntent) {
//         try {
//           const res = await createStripePayment(orderId, paymentIntent);
//           if (!res.paymentDetails?.paymentInetntId) throw new Error("Failed");
//           router.refresh();
//         } catch (error: any) {
//           setErrorMessage(error.toString());
//         }
//       }
//     }
//     setLoading(false);
//   };

//   if (!clientSecret || !stripe || !elements) {
//     return (
//       <div className="flex items-center justify-center">
//         <div className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white">
//           <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <form onSubmit={handleSubmit} className="rounded-md bg-white p-2">
//       {clientSecret && <PaymentElement />}
//       {errorMessage && (
//         <div className="tetx-sm text-red-500">{errorMessage}</div>
//       )}
//       <button
//         disabled={!stripe || loading}
//         className="mt-2 w-full rounded-md bg-black p-5 font-bold text-white disabled:animate-pulse disabled:opacity-50"
//       >
//         {loading ? "Processing" : "Pay"}
//       </button>
//     </form>
//   );
// }
