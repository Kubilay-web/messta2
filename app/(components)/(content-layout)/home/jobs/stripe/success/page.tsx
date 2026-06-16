"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const sessionid = searchParams.get("session_id");

  useEffect(() => {
    const handleSuccess = async () => {
      if (!sessionid) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/stripesuccess`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionid }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          console.log(data.err);
        } else {
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleSuccess();
  }, [sessionid]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center transform transition-all duration-500 animate-fadeInUp">
        {/* Checkmark */}
        <div className="text-blue-500 text-7xl mb-6 animate-bounce">✔</div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
          Payment Successful!
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 sm:text-lg">
          Thank you for your payment. Your transaction was successful.
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-600 transition"
        >
          Go to Home
        </Link>
      </div>

      {/* Tailwind Animations */}
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
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
