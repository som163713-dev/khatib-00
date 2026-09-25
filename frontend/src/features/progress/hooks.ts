"use client";

import { useQuery } from "@tanstack/react-query";
import { progressService } from "./progress.service";

export function useProgressSummary() {
  return useQuery({
    queryKey: ["progress", "summary"],
    queryFn: progressService.summary,
  });
}

export function useProgressTrends() {
  return useQuery({
    queryKey: ["progress", "trends"],
    queryFn: progressService.trends,
  });
}
