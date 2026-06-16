'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Register() {
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/plan`);
      const data = await response.json();
      if (!response.ok) toast.error(data.err || 'Failed to fetch plans');
      else setPlans(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch plans');
    }
  };

  const redirectToCheckout = (id: string) => {
    router.push(`/home/jobs/checkout/?id=${id}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-2">Pricing Plans</h2>
      <div className="h-1 w-24 bg-blue-500 rounded mb-8"></div>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border-2 ${
              plan.recommended ? 'border-blue-500 scale-105' : 'border-gray-200'
            } transform transition hover:scale-105`}
          >
            {plan.recommended && (
              <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase self-start mb-3">
                Recommended
              </span>
            )}
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">{plan.leble}</h3>
            <div className="text-center mb-6">
              <span className="text-gray-500 text-lg">$</span>
              <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
              <span className="text-gray-500 text-lg">/month</span>
            </div>
            <ul className="space-y-2 mb-6 text-gray-700">
              <li className="flex justify-between">
                <span>Job Limit:</span>
                <span className="font-semibold">{plan.joblimit}</span>
              </li>
              <li className="flex justify-between">
                <span>Featured Job Limit:</span>
                <span className="font-semibold">{plan.featuredjoblimit}</span>
              </li>
              <li className="flex justify-between">
                <span>Highlight Job Limit:</span>
                <span className="font-semibold">{plan.highlightjoblimit}</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Recommended:</span>
                {plan.recommended ? <FaCheck className="text-blue-500" /> : <FaTimes className="text-red-500" />}
              </li>
              <li className="flex justify-between items-center">
                <span>Company Verify:</span>
                {plan.profileverify ? <FaCheck className="text-blue-500" /> : <FaTimes className="text-red-500" />}
              </li>
            </ul>
            <button
              onClick={() => redirectToCheckout(plan.id)}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Buy Plan
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
