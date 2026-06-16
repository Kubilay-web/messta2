"use client";

import Link from "next/link";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center transform transition-all duration-500 animate-fadeInUp">
        {/* Crossmark */}
        <div className="text-red-500 text-7xl mb-6 animate-shake">✘</div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
          Payment Failed
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 sm:text-lg">
          Unfortunately, your payment was not successful. Please try again.
        </p>

        {/* Retry Button */}
        <Link
          href="/checkout"
          className="inline-block bg-red-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-red-600 transition"
        >
          Try Again
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

        @keyframes shake {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateX(0);
          }
          40% {
            transform: translateX(-10px);
          }
          60% {
            transform: translateX(10px);
          }
        }
        .animate-shake {
          animation: shake 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PaymentFailed;
