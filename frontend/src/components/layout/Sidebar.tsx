"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/dashboard", label: "داشبورد", icon: "🏠" },
  { href: "/practice", label: "تمرین", icon: "🎙️" },
  { href: "/learn", label: "یادگیری", icon: "📚" },
  { href: "/coach", label: "مربی AI", icon: "💬" },
  { href: "/progress", label: "پیشرفت", icon: "📊" },
  { href: "/history", label: "تاریخچه", icon: "🕘" },
  { href: "/pricing", label: "اشتراک", icon: "💳" },
  { href: "/settings", label: "تنظیمات", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col border-l border-gray-200 bg-white md:flex">
      <div className="p-5 text-xl font-bold text-blue-600">خطیب</div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
