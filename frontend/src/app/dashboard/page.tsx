"use client";

import { AuthGuard } from "@/components/layout/AuthGuard";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import {
  useProgressSummary,
  useDailyRecommendation,
  useSubscriptionInfo,
} from "@/features/dashboard/hooks";
import Link from "next/link";
import { toPersianNumber } from "@/lib/utils/number";

function SummarySection() {
  const { data, isLoading, isError, refetch } = useProgressSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data) return <EmptyState title="اطلاعاتی برای نمایش وجود ندارد" />;

  const stats = [
    {
      label: "تعداد تمرین‌ها",
      value: toPersianNumber(data.practice_count),
    },
    {
      label: "بهترین امتیاز",
      value: data.best_score != null ? toPersianNumber(data.best_score) : "—",
    },
    {
      label: "میانگین امتیاز",
      value:
        data.average_score != null
          ? toPersianNumber(Math.round(data.average_score))
          : "—",
    },
    {
      label: "روزهای متوالی",
      value: toPersianNumber(data.current_streak_days),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <p className="text-xs text-gray-500">{stat.label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}

function DailyRecommendationSection() {
  const { data, isLoading, isError, refetch } = useDailyRecommendation();

  if (isLoading) return <Skeleton className="h-32 w-full" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data) {
    return (
      <EmptyState
        title="پیشنهاد روزانه‌ای موجود نیست"
        description="بعداً دوباره سر بزنید"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>پیشنهاد امروز</CardTitle>
      </CardHeader>
      <p className="text-sm text-gray-600">{data.title_fa}</p>
      <p className="mt-1 text-xs text-gray-400">{data.description_fa}</p>
      {data.action_scenario_id && (
        <Link href={`/practice?scenario=${data.action_scenario_id}`}>
          <Button size="sm" className="mt-4">
            شروع تمرین
          </Button>
        </Link>
      )}
    </Card>
  );
}

function SubscriptionSection() {
  const { data, isLoading, isError, refetch } = useSubscriptionInfo();

  if (isLoading) return <Skeleton className="h-24 w-full" />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>اشتراک شما: {data.plan}</CardTitle>
      </CardHeader>
      <p className="text-sm text-gray-500">
        وضعیت: {data.status === "none" ? "پلن رایگان" : data.status}
      </p>
      {data.message && (
        <p className="mt-1 text-xs text-gray-400">{data.message}</p>
      )}
      <Link href="/pricing">
        <Button variant="secondary" size="sm" className="mt-4">
          مدیریت اشتراک
        </Button>
      </Link>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <AppShell>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">داشبورد</h1>
            <p className="text-sm text-gray-500">خلاصه‌ای از پیشرفت شما</p>
          </div>

          <SummarySection />

          <div className="grid gap-4 md:grid-cols-2">
            <DailyRecommendationSection />
            <SubscriptionSection />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/practice">
              <Button className="w-full" size="lg">
                🎙️ شروع تمرین
              </Button>
            </Link>
            <Link href="/coach">
              <Button variant="secondary" className="w-full" size="lg">
                💬 صحبت با مربی AI
              </Button>
            </Link>
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
