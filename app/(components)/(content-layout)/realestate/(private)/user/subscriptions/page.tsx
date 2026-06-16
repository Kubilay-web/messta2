import PageTitle from "../../../components/page-title";
import { subscriptionPlans } from "../../../constants";
import React from "react";
import BuySubScription from "./_components/buy-subscription";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { requireRealestateUser } from "../../../lib/auth";

async function SubscriptionsPage() {
  await requireRealestateUser();
  const { user } = await validateRequest();

  const userSubscription: any = await db.subscriptionEstate.findFirst({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <PageTitle title="Subscriptions" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subscriptionPlans.map((plan) => {
          // Mevcut kullanıcının planı
          const currentPlanName = userSubscription?.plan?.name;

          // Eğer kullanıcıda mevcut plan yoksa default Basic seçili olsun
          let isCurrentPlan = currentPlanName === plan.name;
          if (!userSubscription) {
            isCurrentPlan = plan.name === "Basic";
          }

          // Daha düşük planlara geçişi engellemek için fiyat karşılaştırması
          const isDisabled =
            isCurrentPlan || (userSubscription && plan.price < userSubscription.plan.price);

          return (
            <div
              key={plan.name}
              className={`flex flex-col gap-5 justify-between p-5 border rounded border-solid
                ${isCurrentPlan ? "border-primary border-2" : "border-gray-300"}
              `}
            >
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-bold text-primary">{plan.name}</h1>
                <h1 className="text-orange-700 text-2xl lg:text-5xl font-bold">
                  ${plan.price}
                </h1>

                <hr />

                <div className="flex flex-col gap-1">
                  {plan.features.map((feature) => (
                    <span key={feature} className="text-gray-500 text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <BuySubScription plan={plan} disabled={isDisabled} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubscriptionsPage;