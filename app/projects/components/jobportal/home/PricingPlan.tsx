// PricingPlanSection.js

"use client";

import { useEffect } from "react";

const plans = [
  {
    title: "Basic",
    price: "$9.99",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  },
  {
    title: "Standard",
    price: "$19.99",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  },
  {
    title: "Enterprise",
    price: "$49.99",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  },
];

export default function PricingPlan() {
  useEffect(() => {
    import("bootstrap/dist/css/bootstrap.min.css");
    import(
      "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
    );
  }, []);
  return (
    <div className="pricingPlans-job">
      <span className="border-1 rounded border p-2 text-lg">Pricing Plans</span>
      <div className="planContainer-job m-5">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className="plan-job border-1 border-success border"
          >
            <h3 className="border-1 bg-info-job mb-3 rounded border text-white">
              {plan.title}
            </h3>
            <p>{plan.price}/month</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button className="choosePlanButton-job">Choose Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
