import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 text-center md:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white" />
        <div className="mx-auto max-w-3xl px-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            مربی سخنرانی هوشمند
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            صدای خود را متحول کنید
          </h1>
          <p className="mt-5 text-base leading-relaxed text-gray-500 md:text-lg">
            خطیب با هوش مصنوعی، سخنرانی فارسی شما را تحلیل می‌کند و بازخورد دقیق
            و فوری می‌دهد — از روانی گفتار تا اعتمادبه‌نفس.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/register">
              <Button size="lg">شروع رایگان</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" size="lg">
                مشاهده قیمت‌ها
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-white py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
          {[
            { value: "۱۰,۰۰۰+", label: "کاربر فعال" },
            { value: "۵۰,۰۰۰+", label: "تمرین تحلیل‌شده" },
            { value: "۹۴٪", label: "رضایت کاربران" },
            { value: "۲۴/۷", label: "مربی AI" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-extrabold text-blue-600 md:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-gray-400 md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              همه‌چیز برای تسلط بر سخنوری
            </h2>
            <p className="mt-3 text-gray-500">
              ابزارهای کامل برای رشد مهارت سخنرانی شما
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "مربی هوش مصنوعی",
                desc: "همیشه در دسترس برای راهنمایی شخصی‌سازی‌شده",
              },
              {
                title: "تحلیل دقیق گفتار",
                desc: "بررسی روانی، وضوح، سرعت و اعتمادبه‌نفس",
              },
              {
                title: "سناریوهای متنوع",
                desc: "تمرین در موقعیت‌های واقعی در سطوح مختلف",
              },
              {
                title: "پیگیری پیشرفت",
                desc: "نمودارها و گزارش‌های دقیق از روند رشد",
              },
              {
                title: "اتصال به ایتا",
                desc: "یادآوری و اعلان مستقیم در پیام‌رسان",
              },
              {
                title: "حریم خصوصی",
                desc: "خروجی‌گیری و حذف کامل داده‌ها در هر زمان",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-gray-100 bg-white p-7 transition hover:border-blue-100 hover:shadow-lg"
              >
                <h3 className="mb-2 font-bold text-gray-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-16 text-center shadow-2xl md:px-16">
            <h2 className="text-3xl font-extrabold text-white md:text-4xl">
              آماده‌اید صدای خود را متحول کنید؟
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-blue-100 md:text-base">
              همین امروز ثبت‌نام کنید و اولین تمرین را رایگان تجربه کنید.
            </p>
            <Link href="/register" className="mt-8 inline-block">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                شروع رایگان
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
