"use client";

import { AuthGuard } from "@/components/layout/AuthGuard";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  useProgressSummary,
  useProgressTrends,
} from "@/features/progress/hooks";
import { toPersianNumber } from "@/lib/utils/number";
import { cn } from "@/lib/utils/cn";

export default function ProgressPage() {
  const summary = useProgressSummary();
  const trends = useProgressTrends();

  return (
    <AuthGuard>
      <AppShell>
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">پیشرفت</h1>
            <p className="text-sm text-gray-500">روند رشد مهارت سخنرانی شما</p>
          </div>

          {summary.isLoading && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          )}
          {summary.isError && (
            <ErrorState onRetry={() => summary.refetch()} />
          )}
          {summary.data && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  label: "تعداد تمرین",
                  value: toPersianNumber(summary.data.practice_count),
                },
                {
                  label: "بهترین امتیاز",
                  value:
                    summary.data.best_score != null
                      ? toPersianNumber(summary.data.best_score)
                      : "—",
                },
                {
                  label: "میانگین",
                  value:
                    summary.data.average_score != null
                      ? toPersianNumber(Math.round(summary.data.average_score))
                      : "—",
                },
                {
                  label: "streak",
                  value: toPersianNumber(summary.data.current_streak_days),
                },
              ].map((s) => (
                <Card key={s.label}>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{s.value}</p>
                </Card>
              ))}
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>روند ابعاد مهارت</CardTitle>
            </CardHeader>
            {trends.isLoading && <Skeleton className="h-40 w-full" />}
            {trends.isError && <ErrorState onRetry={() => trends.refetch()} />}
            {trends.data && trends.data.length === 0 && (
              <EmptyState title="هنوز داده روندی نیست" description="چند تمرین انجام دهید" />
            )}
            {trends.data && trends.data.length > 0 && (
              <div className="space-y-4">
                {trends.data.map((t) => (
                  <div key={t.dimension}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium text-gray-800">{t.label_fa}</span>
                      <span
                        className={cn(
                          "text-xs font-semibold",
                          t.change_percent >= 0 ? "text-green-600" : "text-red-600"
                        )}
                      >
                        {t.change_percent >= 0 ? "+" : ""}
                        {toPersianNumber(Math.round(t.change_percent))}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all"
                        style={{
                          width: `${Math.min(100, Math.max(0, t.recent_average))}%`,
                        }}
                      />
                    </div>
                    <p className="mt-0.5 text-xs text-gray-400">
                      اخیر: {toPersianNumber(Math.round(t.recent_average))} · قبل:{" "}
                      {toPersianNumber(Math.round(t.previous_average))}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
