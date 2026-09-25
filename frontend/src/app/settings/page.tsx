"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/authStore";
import { useLogout } from "@/features/auth/hooks";
import { useExportData, useDeleteAccount } from "@/features/privacy/hooks";
import { useSubscription } from "@/features/billing/hooks";
import Link from "next/link";
import { Download, Trash2, CreditCard, LogOut } from "lucide-react";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const exportData = useExportData();
  const deleteAccount = useDeleteAccount();
  const { data: sub } = useSubscription();
  const [confirmText, setConfirmText] = useState("");

  return (
    <AuthGuard>
      <AppShell>
        <div className="mx-auto flex max-w-xl flex-col gap-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">تنظیمات</h1>
            <p className="text-sm text-gray-500">حساب کاربری و حریم خصوصی</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>پروفایل</CardTitle>
            </CardHeader>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">نام</dt>
                <dd className="font-medium">{user?.name || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">ایمیل</dt>
                <dd className="font-medium">{user?.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">نقش</dt>
                <dd className="font-medium">{user?.role}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">پلن</dt>
                <dd className="font-medium">{user?.plan}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>اشتراک</CardTitle>
            </CardHeader>
            <p className="mb-3 text-sm text-gray-600">
              وضعیت: {sub?.status ?? "—"} · پلن: {sub?.plan ?? user?.plan}
            </p>
            <Link href="/pricing">
              <Button variant="secondary" size="sm">
                <CreditCard className="h-4 w-4" /> مدیریت اشتراک
              </Button>
            </Link>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>حریم خصوصی</CardTitle>
            </CardHeader>
            <div className="flex flex-col gap-3">
              <Button
                variant="secondary"
                size="sm"
                loading={exportData.isPending}
                onClick={() => exportData.mutate()}
              >
                <Download className="h-4 w-4" /> دانلود خروجی داده‌ها
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>خروج</CardTitle>
            </CardHeader>
            <Button
              variant="secondary"
              size="sm"
              loading={logout.isPending}
              onClick={() => logout.mutate()}
            >
              <LogOut className="h-4 w-4" /> خروج از حساب
            </Button>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">حذف حساب</CardTitle>
            </CardHeader>
            <p className="mb-3 text-xs text-gray-500">
              برای تأیید، عبارت{" "}
              <code className="rounded bg-gray-100 px-1">DELETE_ACCOUNT</code> را
              وارد کنید. این عملیات غیرقابل بازگشت است.
            </p>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE_ACCOUNT"
              className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
            <Button
              variant="danger"
              size="sm"
              disabled={confirmText !== "DELETE_ACCOUNT"}
              loading={deleteAccount.isPending}
              onClick={() => deleteAccount.mutate()}
            >
              <Trash2 className="h-4 w-4" /> حذف دائمی حساب
            </Button>
          </Card>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
