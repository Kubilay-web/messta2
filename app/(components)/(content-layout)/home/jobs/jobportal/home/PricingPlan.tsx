// // PricingPlanSection.js

// "use client";

// import { useEffect } from "react";

// const plans = [
//   {
//     title: "Basic",
//     price: "$9.99",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
//   },
//   {
//     title: "Standard",
//     price: "$19.99",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
//   },
//   {
//     title: "Enterprise",
//     price: "$49.99",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
//   },
// ];

// export default function PricingPlan() {
//   useEffect(() => {
//     import("bootstrap/dist/css/bootstrap.min.css");
//     import(
//       "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
//     );
//   }, []);
//   return (
//     <div className="pricingPlans-job">
//       <span className="border-1 rounded border p-2 text-lg">Pricing Plans</span>
//       <div className="planContainer-job m-5">
//         {plans.map((plan) => (
//           <div
//             key={plan.title}
//             className="plan-job border-1 border-success border"
//           >
//             <h3 className="border-1 bg-info-job mb-3 rounded border text-white">
//               {plan.title}
//             </h3>
//             <p>{plan.price}/month</p>
//             <ul>
//               {plan.features.map((feature) => (
//                 <li key={feature}>{feature}</li>
//               ))}
//             </ul>
//             <button className="choosePlanButton-job">Choose Plan</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }










// PricingPlanSection.js

"use client";

import { useState } from "react";

const plans = [
  {
    title: "Basic",
    price: "$9.99",
    priceYearly: "$99.99",
    features: [
      "5 Job Posts per Month",
      "Basic Analytics",
      "Email Support",
      "Candidate Database Access",
      "24/7 Support",
    ],
    popular: false,
    buttonText: "Get Started",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Standard",
    price: "$19.99",
    priceYearly: "$199.99",
    features: [
      "20 Job Posts per Month",
      "Advanced Analytics",
      "Priority Email Support",
      "Full Candidate Database",
      "Featured Job Listings",
      "AI Resume Matching",
    ],
    popular: true,
    buttonText: "Choose Plan",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Enterprise",
    price: "$49.99",
    priceYearly: "$499.99",
    features: [
      "Unlimited Job Posts",
      "Custom Analytics",
      "24/7 Phone Support",
      "Dedicated Account Manager",
      "API Access",
      "Custom Integration",
      "White Label Options",
    ],
    popular: false,
    buttonText: "Contact Sales",
    color: "from-orange-500 to-orange-600",
  },
];

export default function PricingPlan() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-600 font-semibold text-sm mb-4">
            Pricing Plans
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include full
            access to our platform.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span
              className={`text-sm font-medium ${
                billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
              }
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-colors focus:outline-none"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-9" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                billingCycle === "yearly" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Yearly
              <span className="ml-1 text-xs text-green-600 font-semibold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Plans Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular ? "ring-2 ring-purple-500 lg:scale-105" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-bl-2xl text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div
                className={`bg-gradient-to-r ${plan.color} p-6 text-white`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {billingCycle === "monthly" ? plan.price : plan.priceYearly}
                  </span>
                  <span className="text-sm opacity-90">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-xs mt-2 opacity-90">
                    Billed annually. Save 20% compared to monthly.
                  </p>
                )}
              </div>

              {/* Features List */}
              <div className="p-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-600">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-gray-600">Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-600">Email support</span>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Have questions? Check out our FAQ →
          </a>
        </div>
      </div>
    </div>
  );
}