import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import type { DashboardData } from "@/types";

export function useDashboard() {
  const { data, error, isLoading } = useSWR<DashboardData>(
    "/api/dashboard",
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error
  };
} 