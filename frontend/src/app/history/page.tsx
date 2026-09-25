"use client";

import { AuthGuard } from "@/components/layout/AuthGuard";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { useSpeechList, useDeleteSpeech } from "@/features/speech/hooks";
import { useBillingHistory } from "@/features/billing/hooks";
import Link from "next/link";
import { toPersianNumber, formatToman } from "@/lib/utils/number";
import { Button } from "@/components/ui/Button";

export default function HistoryPage() {
  const speeches = useSpeechList();
  const payments = useBillingHistory();
  const del = useDeleteSpeech();

  return (
    <AuthGuard>
      <AppShell>
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <div>
            <h1 className="text-xl font-bold text-gray-900">تاریخچه</h1>
            <p className="text-sm text-gray-500">تمرین‌ها و تراکنش‌ها</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تمرین‌ها</CardTitle>
            </CardHeader>
            {speeches.isLoading && <Skeleton className="h-32" />}
            {speeches.isError && (
              <ErrorState onRetry={() => speeches.refetch()} />
            )}
            {speeches.data && speeches.data.length === 0 && (
              <EmptyState title="تمرینی ثبت نشده" />
            )}
            {speeches.data && speeches.data.length > 0 && (
              <ul className="divide-y divide-gray-100">
                {speeches.data.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-2 py-3"
                  >
                    <Link href={`/practice/${item.id}`} className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.topic_label || "بدون موضوع"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.mode} ·{" "}
                        {new Date(item.created_at).toLocaleDateString("fa-IR")}
                        {item.overall_score != null &&
                          ` · امتیاز ${toPersianNumber(item.overall_score)}`}
                      </p>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm("حذف شود؟")) del.mutate(item.id);
                      }}
                    >
                      حذف
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>پرداخت‌ها</CardTitle>
            </CardHeader>
            {payments.isLoading && <Skeleton className="h-24" />}
            {payments.isError && (
              <ErrorState onRetry={() => payments.refetch()} />
            )}
            {payments.data && payments.data.length === 0 && (
              <EmptyState title="تراکنشی ثبت نشده" />
            )}
            {payments.data && payments.data.length > 0 && (
              <ul className="divide-y divide-gray-100">
                {payments.data.map((t) => (
                  <li key={t.id} className="flex justify-between py-3 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">پلن {t.plan}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(t.created_at).toLocaleDateString("fa-IR")} ·{" "}
                        {t.status}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {formatToman(t.amount_toman)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
