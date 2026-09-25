"use client";

import { PLANS } from "@/lib/config/plans";
import { PlanCard } from "@/components/billing/PlanCard";
import { useSubscription } from "@/features/billing/hooks";
import { useAuthStore } from "@/stores/authStore";
import type { PlanId } from "@/types/auth";

export default function PricingPage() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const { data: subscription } = useSubscription();

  const currentPlan = accessToken
    ? (subscription?.plan as PlanId | undefined)
    : undefined;

  return (
    <div className="relative overflow-hidden py-16 md:py-20">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 md:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            پلن مناسب خود را انتخاب کنید
          </h1>
          <p className="mt-3 text-sm text-gray-500 md:text-base">
            همین حالا ثبت‌نام کنید، پلن خود را انتخاب کنید و از خطیب استفاده کنید
          </p>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} currentPlan={currentPlan} />
          ))}
        </div>
      </div>
    </div>
  );
}
