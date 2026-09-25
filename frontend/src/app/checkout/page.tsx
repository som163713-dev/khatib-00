"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { getPlanById } from "@/lib/config/plans";
import { formatToman } from "@/lib/utils/number";
import { useCheckout } from "@/features/billing/hooks";
import type { PlanId } from "@/types/auth";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planId = (searchParams.get("plan") || "base") as PlanId;
  const plan = getPlanById(planId);
  const checkout = useCheckout();

  if (!plan || plan.id === "free") {
    return (
      <Card className="mx-auto max-w-md text-center">
        <p className="text-sm text-gray-600">پلن نامعتبر است.</p>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <h1 className="mb-1 text-xl font-bold text-gray-900">تکمیل خرید</h1>
        <p className="mb-6 text-sm text-gray-500">
          پلن «{plan.name}» — {formatToman(plan.price_toman)} / ماه
        </p>
        <ul className="mb-6 space-y-2 text-sm text-gray-600">
          <li>تمرین: {plan.practiceLimit}</li>
          <li>صوت: {plan.audioLimit}</li>
        </ul>
        <Button
          className="w-full"
          size="lg"
          loading={checkout.isPending}
          onClick={() => checkout.mutate(plan.id)}
        >
          پرداخت با زرین‌پال
        </Button>
        <p className="mt-3 text-center text-xs text-gray-400">
          پس از پرداخت موفق به داشبورد هدایت می‌شوید.
        </p>
      </Card>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <AppShell>
        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </AppShell>
    </AuthGuard>
  );
}
