"use client";
import { capturePayPalPayment, createPayPalPayment } from "@/app/queries/paypal";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function PaypalPayment({ orderId }: { orderId: string }) {
  const router = useRouter();
  const paymentIdRef = useRef("");
  const createOrder = async (data: any, actions: any) => {
    const response = await createPayPalPayment(orderId);
    paymentIdRef.current = response.id;

    return response.id;
  };

  const onApprove = async () => {
    const captureResponse = await capturePayPalPayment(
      orderId,
      paymentIdRef.current,
    );
    if (captureResponse.id) router.refresh();
  };
  return (
    <div>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => {}}
      />
    </div>
  );
}
