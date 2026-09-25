"use client";

import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas";
import { useLogin } from "@/features/auth/hooks";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";

function LoginForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const login = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm">
        <h1 className="mb-1 text-xl font-bold text-gray-900">ورود به خطیب</h1>
        <p className="mb-6 text-sm text-gray-500">برای ادامه وارد حساب خود شوید</p>

        <form
          onSubmit={handleSubmit((v) => login.mutate(v))}
          className="flex flex-col gap-4"
        >
          <Input
            label="ایمیل"
            type="email"
            placeholder="example@mail.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="رمز عبور"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button type="submit" loading={login.isPending} className="mt-2 w-full">
            ورود
          </Button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            فراموشی رمز عبور
          </Link>
          <Link
            href={plan ? `/register?plan=${plan}` : "/register"}
            className="text-gray-600 hover:underline"
          >
            ثبت‌نام
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
