"use client";
import { StoreType } from "@/app/lib/types";
import { useState } from "react";
import Instructions from "./instructions";
import ProgressBar from "./progress-bar";
import Step1 from "./steps/step-1/step-1";
import Step2 from "./steps/setp-2/step-2";
import Step3 from "./steps/setp-3/step-3";
import Step4 from "./steps/step-4/step-4";

export default function ApplySellerMultiForm() {
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<StoreType>({
    name: "",
    description: "",
    email: "",
    phone: "",
    url: "",
    logo: "",
    cover: "",
    defaultShippingService: "",
    defaultShippingFeePerItem: undefined,
    defaultShippingFeeForAdditionalItem: undefined,
    defaultShippingFeePerKg: undefined,
    defaultShippingFeeFixed: undefined,
    defaultDeliveryTimeMin: undefined,
    defaultDeliveryTimeMax: undefined,
    returnPolicy: "",
  });
  return (
    <div className="grid lg:grid-cols-[400px_1fr]">
      <Instructions />
      <div className="relative w-full p-5">
        <ProgressBar step={step} />
        {/* Steps */}
        {step === 1 ? (
          <Step1 step={step} setStep={setStep} />
        ) : step === 2 ? (
          <Step2
            formData={formData}
            setFormData={setFormData}
            step={step}
            setStep={setStep}
          />
        ) : step === 3 ? (
          <Step3
            formData={formData}
            setFormData={setFormData}
            step={step}
            setStep={setStep}
          />
        ) : step === 4 ? (
          <Step4 />
        ) : null}
      </div>
    </div>
  );
}
