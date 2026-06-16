"use client";

import React from "react";
import Link from "next/link";

const PaymentSuccess = () => {
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

        {/* CTA Button */}
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
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-15px);
          }
          60% {
            transform: translateY(-7px);
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
