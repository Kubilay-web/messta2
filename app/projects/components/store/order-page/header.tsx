"use client";
import OrderStatusTag from "@/app/projects/components/shared/order-status";
import PaymentStatusTag from "@/app/projects/components/shared/payment-status";
import { Button } from "@/app/projects/components/ui/button";
import { OrderFulltType, OrderStatus, PaymentStatus } from "@/app/lib/types";
import { ChevronLeft, ChevronRight, Download, Printer } from "lucide-react";
import React from "react";
import { generateOrderPDFBlob } from "./pdf-invoice";
import { downloadBlobAsFile, printPDF } from "@/app/lib/utils";

export default function OrderHeader({ order }: { order: OrderFulltType }) {
  if (!order) return;

  const handleDownload = async () => {
    try {
      const pdfBlob = await generateOrderPDFBlob(order);
      downloadBlobAsFile(pdfBlob, `Order_${order.id}.pdf`);
    } catch (error) {}
  };

  const handlePrint = async () => {
    try {
      const pdfBlob = await generateOrderPDFBlob(order);
      printPDF(pdfBlob);
    } catch (error) {}
  };

  return (
    <div>
      <div className="flex w-full flex-col gap-4 border-b p-2 min-[1100px]:flex-row">
        {/* Order id */}
        <div className="flex items-center gap-x-3 min-[1100px]:w-[920px] xl:w-[990px]">
          <div className="border-r pr-4">
            <button className="grid h-10 w-10 place-items-center rounded-full border">
              <ChevronLeft className="stroke-main-secondary" />
            </button>
          </div>
          <h1 className="text-2xl">Order Details</h1>
          <ChevronRight className="w-4" />
          <h2 className="text-2xl">Order #{order.id}</h2>
        </div>
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Status */}
          <div className="flex w-full items-center gap-x-4">
            <PaymentStatusTag status={order.paymentStatus as PaymentStatus} />
            <OrderStatusTag status={order.orderStatus as OrderStatus} />
          </div>
          {/* Actions */}
          <div className="flex items-center gap-x-4">
            <Button variant="outline" onClick={() => handleDownload()}>
              <Download className="me-2 w-4" />
              Export
            </Button>
            <Button variant="outline" onClick={() => handlePrint()}>
              <Printer className="me-2 w-4" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
