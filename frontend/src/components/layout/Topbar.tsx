"use client";

import { useAuthStore } from "@/stores/authStore";
import { useLogout } from "@/features/auth/hooks";
import { Button } from "@/components/ui/Button";

export function Topbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:px-6">
      <div className="text-sm text-gray-500">
        خوش آمدید،{" "}
        <span className="font-semibold text-gray-800">
          {user?.name || user?.email}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => logout.mutate()}
        loading={logout.isPending}
      >
        خروج
      </Button>
    </header>
  );
}
