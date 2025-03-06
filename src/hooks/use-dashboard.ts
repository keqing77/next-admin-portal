import { fetcher } from "@/lib/utils";
import type { DashboardData } from "@/types";
import useSWR from "swr";

function formatSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');

  if (hours > 0) {
    return `${hours}h:${paddedMinutes}m:${paddedSeconds}s`;
  }
  
  return `${minutes}m:${paddedSeconds}s`;
}

interface DashboardParams {
  timeRange?: string;
  from?: string;
  to?: string;
  country?: string;
  department?: string;
}

export function useDashboard(params: DashboardParams = {}) {
  const queryParams = new URLSearchParams();
  if (params.timeRange) queryParams.set('timeRange', params.timeRange);
  
  const queryString = queryParams.toString();
  const url = `/api/dashboard${queryString ? `?${queryString}` : ''}`;
  
  const { data, error, isLoading, mutate } = useSWR<DashboardData>(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
    mutate,
    formatSeconds
  };
} 
