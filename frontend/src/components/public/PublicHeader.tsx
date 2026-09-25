"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";

export function PublicHeader() {
  const accessToken = useAuthStore((s) => s.accessToken);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-xl font-bold text-blue-600">
          خطیب
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
          <Link href="/pricing" className="hover:text-blue-600">
            قیمت‌گذاری
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            درباره ما
          </Link>
          <Link href="/help" className="hover:text-blue-600">
            راهنما
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {accessToken ? (
            <Link href="/dashboard">
              <Button size="sm">داشبورد</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  ورود
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">شروع رایگان</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
