"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartQueriesPerRegion } from "@/components/shared/chart-queries-per-region";
import { ChartQueriesPerUser } from "@/components/shared/chart-queries-per-user";
import { ChartQueriesPerGBGF } from "@/components/shared/chart-queries-per-GBGF";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Rating } from "@/components/ui/rating";
import { ChartTimeSavedByRequestType } from "@/components/shared/chart-time-saved-by-request-type";
import { ChartLLMCost } from "@/components/shared/chart-llm-cost";
import { ChartLLMResponseTime } from "@/components/shared/chart-llm-response-time";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const timeRanges = [
  { value: "5m", label: "5 min" },
  { value: "30m", label: "30 min" },
  { value: "1h", label: "1 hour" },
  { value: "3h", label: "3 hour" },
  { value: "24h", label: "24 hour" },
  { value: "7d", label: "7 days" },
  { value: "1M", label: "1 month" },
  { value: "3M", label: "3 months" },
  { value: "1y", label: "1 year" },
];

export default function DashboardPage() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [filters, setFilters] = useState({
    timeRange: "24h",
    countries: [] as string[],
    departments: [] as string[],
    searchQuery: "",
  });

  // 从日期范围转换为API需要的字符串格式
  const formatDateParam = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  // 使用时间范围和日期筛选调用 API
  const { data, isLoading, isError, mutate } = useDashboard({
    timeRange: filters.timeRange,
    from: date.from ? formatDateParam(date.from) : undefined,
    to: date.to ? formatDateParam(date.to) : undefined,
  });

  // 当日期或时间范围变化时触发刷新
  const handleDateChange = (newDate: { from: Date; to: Date } | ((prevState: { from: Date; to: Date }) => { from: Date; to: Date })) => {
    if (typeof newDate === 'function') {
      setDate(newDate);
    } else {
      setDate(newDate);
    }
  };

  const handleTimeRangeChange = (value: string) => {
    setFilters({ ...filters, timeRange: value });
  };

  // 监听日期和时间范围变化，触发数据刷新
  useEffect(() => {
    // 日期或时间范围变化时刷新数据
    mutate();
  }, [date.from, date.to, filters.timeRange, mutate]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return <DashboardError />;
  }

  const { summary } = data!;

  const statsCards = [
    {
      title: "Total Queries Processed",
      value: summary.totalQueries.toLocaleString(),
    },
    {
      title: "Avg Time Taken by LLM",
      value: summary.avgTimeTaken,
    },
    {
      title: "Total Time Saved",
      value: summary.totalTimeSaved,
    },
    {
      title: "Total Erratic Reported",
      value: summary.totalErratic.toString(),
    },
    {
      title: "Total Requests exceed Thresholds",
      value: summary.totalExceedThreshold.toString(),
    },
    {
      title: "Average Star Rating Score",
      value: (Math.min(5, Math.max(0, summary.avgStarRating))).toFixed(2),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b bg-background/50">
        {/* filter menu */}
        <div className="flex h-16 items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <DatePickerWithRange 
                date={date} 
                setDate={handleDateChange} 
                timeRange={filters.timeRange}
                setTimeRange={handleTimeRangeChange}
                timeRanges={timeRanges}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {statsCards.map((card) => (
            <Card 
              key={card.title} 
              className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/20"
            >
              <CardHeader className="space-y-0 pb-2">
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-sm font-medium truncate max-w-[180px] text-muted-foreground hover:text-primary cursor-help">
                          {card.title}
                        </CardTitle>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-popover/95 backdrop-blur-sm border-primary/10 shadow-lg px-3 py-1.5"
                    >
                      <p className="font-medium text-sm text-foreground/90">
                        {card.title}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardHeader>
              <CardContent>
                {card.title === "Average Star Rating Score" ? (
                  <div className="flex items-center justify-center px-2">
                    <Rating 
                      value={Number(card.value)} 
                      className="scale-65 origin-left sm:scale-70 md:scale-75 lg:scale-85 xl:scale-90"
                    />
                    <div className="text-xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
                      {card.value}
                    </div>
                  </div>
                ) : (
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
                    {card.value}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Dashboard Charts Container */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-8">
          {/* Adoption and Usage */}
          <div className="lg:col-span-8 space-y-4 flex flex-col">
            <div>
              <h2 className="text-xl font-semibold text-foreground/90 flex items-center gap-2 pb-2 border-b">
                <span className="h-5 w-1.5 bg-primary rounded-full"></span>
                Adoption and Usage
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4 flex-1">
              <ChartQueriesPerRegion className="col-span-1 h-full" />
              <ChartQueriesPerGBGF className="col-span-1 h-full" />
              <ChartQueriesPerUser className="col-span-1 h-full" />
            </div>
          </div>

          {/* Impact and ROI */}
          <div className="lg:col-span-4 space-y-4 flex flex-col">
            <div>
              <h2 className="text-xl font-semibold text-foreground/90 flex items-center gap-2 pb-2 border-b">
                <span className="h-5 w-1.5 bg-primary rounded-full"></span>
                Impact and ROI
              </h2>
            </div>

            {/* ROI Stat Cards */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/20">
                <CardHeader className="space-y-0 pb-2">
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-sm font-medium truncate max-w-[180px] text-muted-foreground hover:text-primary cursor-help">
                            ROI
                          </CardTitle>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-popover/95 backdrop-blur-sm border-primary/10 shadow-lg px-3 py-1.5"
                      >
                        <p className="font-medium text-sm text-foreground/90">
                          Return on Investment
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
                    {summary.roi.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Platform Cost: {summary.platformCost.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/20">
                <CardHeader className="space-y-0 pb-2">
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-sm font-medium truncate max-w-[180px] text-muted-foreground hover:text-primary cursor-help">
                            Total Cost Savings
                          </CardTitle>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-popover/95 backdrop-blur-sm border-primary/10 shadow-lg px-3 py-1.5"
                      >
                        <p className="font-medium text-sm text-foreground/90">
                          Total Cost Savings
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
                    {summary.totalCostSavings.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <div className="mt-4 flex-1">
              <ChartTimeSavedByRequestType className="h-full" />
            </div>
          </div>
        </section>
     
        {/* Model Performance Metrics */}
        <section className="mt-8 mb-4 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground/90 flex items-center gap-2 pb-2 border-b">
              <span className="h-5 w-1.5 bg-primary rounded-full"></span>
              Model Performance Metrics
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            <ChartQueriesPerRegion className="lg:col-span-2" />
            <ChartLLMCost className="lg:col-span-1" />
            <ChartLLMResponseTime className="lg:col-span-1" />
          </div>

        </section>

      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-b bg-background/50">
        {/* filter menu */}
        <div className="flex h-16 items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-[360px] rounded-md bg-muted animate-pulse" />
          </div>
        </div>

        {/* stats cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[100px] rounded-lg border bg-card p-4">
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded-lg bg-muted animate-pulse" />
                <div className="h-6 w-1/2 rounded-lg bg-muted animate-pulse mt-4" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Adoption and Usage  */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-8">
          <div className="lg:col-span-8 space-y-4 flex flex-col">
            <div>
              <div className="h-6 w-48 rounded-lg bg-muted animate-pulse mb-4" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4 flex-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[300px] rounded-lg border bg-card animate-pulse" />
              ))}
            </div>
          </div>

          {/* Impact and ROI */}
          <div className="lg:col-span-4 space-y-4 flex flex-col">
            <div>
              <div className="h-6 w-36 rounded-lg bg-muted animate-pulse mb-4" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-[100px] rounded-lg border bg-card animate-pulse" />
              ))}
            </div>
            <div className="mt-4 flex-1">
              <div className="h-[226px] rounded-lg border bg-card animate-pulse" />
            </div>
          </div>
        </section>
     
        {/* Model Performance Metrics  */}
        <section className="mt-8 mb-4 space-y-6">
          <div>
            <div className="h-6 w-56 rounded-lg bg-muted animate-pulse mb-4" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <div className="lg:col-span-2 h-[300px] rounded-lg border bg-card animate-pulse" />
            <div className="lg:col-span-1 h-[300px] rounded-lg border bg-card animate-pulse" />
            <div className="lg:col-span-1 h-[300px] rounded-lg border bg-card animate-pulse" />
          </div>
        </section>
      </div>
    </div>
  );
}

export function DashboardError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Failed to load dashboard data. Please try again later.
      </AlertDescription>
    </Alert>
  );
}
