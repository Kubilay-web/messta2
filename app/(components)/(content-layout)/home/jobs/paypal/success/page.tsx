"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const PayerID = searchParams.get("PayerID");

  const [isSuccessHandled, setIsSuccessHandled] = useState(false);

  useEffect(() => {
    handleSuccess();
  }, [token, PayerID]);

  const handleSuccess = async () => {
    if (isSuccessHandled || !token || !PayerID) return;

    setIsSuccessHandled(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/success`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, PayerID }),
        }
      );
      const data = await response.json();
      if (!response.ok) console.log(data.err);
      else console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center animate-fadeInUp">
        <div className="flex justify-center">
          <div className="text-blue-500 text-6xl mb-4 animate-bounce">✔</div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Payment Succesful
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you
        </p>
        <a
          href="/home/jobs/main"
          className="inline-block bg-blue-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-600 transition"
        >
          Back to Home
        </a>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
