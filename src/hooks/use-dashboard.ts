import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import type { DashboardData } from "@/types";

interface DashboardParams {
  timeRange?: string;
  from?: string;
  to?: string;
  countries?: string[];
  departments?: string[];
  searchQuery?: string;
}

export function useDashboard(params: DashboardParams = {}) {
  // 构建查询字符串
  const queryParams = new URLSearchParams();
  
  if (params.timeRange) queryParams.set('timeRange', params.timeRange);
  if (params.from) queryParams.set('from', params.from);
  if (params.to) queryParams.set('to', params.to);
  if (params.countries && params.countries.length) 
    queryParams.set('countries', params.countries.join(','));
  if (params.departments && params.departments.length) 
    queryParams.set('departments', params.departments.join(','));
  if (params.searchQuery) queryParams.set('query', params.searchQuery);
  
  const queryString = queryParams.toString();
  const url = `/api/dashboard${queryString ? `?${queryString}` : ''}`;
  
  const { data, error, isLoading, mutate } = useSWR<DashboardData>(
    url,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate
  };
} 