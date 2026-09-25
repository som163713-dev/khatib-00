import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "خطیب | مربی سخنرانی هوشمند",
  description: "تمرین سخنرانی فارسی با بازخورد هوش مصنوعی",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-gray-50 font-sans antialiased text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
