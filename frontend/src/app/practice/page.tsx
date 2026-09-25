"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/layout/AuthGuard";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  useCreateTextSpeech,
  useCreateAudioSpeech,
  useSpeechList,
} from "@/features/speech/hooks";
import Link from "next/link";
import { toPersianNumber } from "@/lib/utils/number";
import { Mic, FileText, Upload } from "lucide-react";

export default function PracticePage() {
  const [mode, setMode] = useState<"text" | "audio">("text");
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const createText = useCreateTextSpeech();
  const createAudio = useCreateAudioSpeech();
  const { data: list, isLoading, isError, refetch } = useSpeechList();

  const canSubmitText =
    topic.trim().length > 0 && text.trim().length >= 20 && !createText.isPending;
  const canSubmitAudio =
    topic.trim().length > 0 && !!file && !createAudio.isPending;

  const onSubmitText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmitText) return;
    createText.mutate({ topic_label: topic.trim(), text: text.trim() });
  };

  const onSubmitAudio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmitAudio || !file) return;
    createAudio.mutate({ topic: topic.trim(), file });
  };

  return (
    <AuthGuard>
      <AppShell>
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">تمرین سخنرانی</h1>
            <p className="text-sm text-gray-500">
              متن بنویسید یا صوت آپلود کنید تا تحلیل هوشمند دریافت کنید
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={mode === "text" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setMode("text")}
            >
              <FileText className="h-4 w-4" /> تمرین متنی
            </Button>
            <Button
              variant={mode === "audio" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setMode("audio")}
            >
              <Mic className="h-4 w-4" /> تمرین صوتی
            </Button>
          </div>

          <Card>
            {mode === "text" ? (
              <form onSubmit={onSubmitText} className="flex flex-col gap-4">
                <Input
                  label="موضوع تمرین"
                  placeholder="مثلاً: معرفی خود در جلسه کاری"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    متن سخنرانی (حداقل ۲۰ کاراکتر)
                  </label>
                  <textarea
                    className="min-h-[160px] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="متن سخنرانی خود را اینجا بنویسید..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <span className="text-xs text-gray-400">
                    {toPersianNumber(text.length)} کاراکتر
                  </span>
                </div>
                <Button type="submit" loading={createText.isPending} disabled={!canSubmitText}>
                  ارسال برای تحلیل
                </Button>
              </form>
            ) : (
              <form onSubmit={onSubmitAudio} className="flex flex-col gap-4">
                <Input
                  label="موضوع تمرین"
                  placeholder="مثلاً: ارائه پروژه"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    فایل صوتی
                  </label>
                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-4 py-8 hover:border-blue-300 hover:bg-blue-50/50">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {file ? file.name : "انتخاب فایل (mp3, wav, m4a, webm)"}
                    </span>
                    <input
                      type="file"
                      accept="audio/*,.mp3,.wav,.m4a,.webm,.ogg"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>
                <Button
                  type="submit"
                  loading={createAudio.isPending}
                  disabled={!canSubmitAudio}
                >
                  آپلود و تحلیل
                </Button>
              </form>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تمرین‌های اخیر</CardTitle>
            </CardHeader>
            {isLoading && <Skeleton className="h-24 w-full" />}
            {isError && <ErrorState onRetry={() => refetch()} />}
            {!isLoading && !isError && (!list || list.length === 0) && (
              <EmptyState title="هنوز تمرینی ثبت نشده" />
            )}
            {list && list.length > 0 && (
              <ul className="divide-y divide-gray-100">
                {list.slice(0, 8).map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/practice/${item.id}`}
                      className="flex items-center justify-between py-3 hover:bg-gray-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.topic_label || "بدون موضوع"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.mode === "audio" ? "صوتی" : "متنی"} · {item.status}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-blue-600">
                        {item.overall_score != null
                          ? toPersianNumber(item.overall_score)
                          : "—"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {list && list.length > 8 && (
              <Link href="/history" className="mt-2 block text-center text-sm text-blue-600">
                مشاهده همه
              </Link>
            )}
          </Card>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
