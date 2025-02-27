"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Rating } from "@/components/ui/rating";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QueriesChart } from "@/components/dashboard/charts/queries-chart";
import { TimeSavedChart } from "@/components/dashboard/charts/time-saved-chart";
import { LLMCostChart } from "@/components/dashboard/charts/llm-cost-chart";
import { ResponseTimeChart } from "@/components/dashboard/charts/response-time-chart";
import { FilterButton } from "@/components/shared/filter-button";
import type { Filters } from "@/types/filters";
import { useFilterStore } from "@/store/filter";

export default function DashboardPage() {
  const { startTime, endTime, countries, gbgfs, setDateRange } = useFilterStore()

  // 从日期范围转换为API需要的字符串格式
  const formatDateParam = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  // 使用时间范围和日期筛选调用 API
  const { data, isLoading, isError, formatSeconds, mutate } = useDashboard({
    from: formatDateParam(startTime),
    to: formatDateParam(endTime),
    countries: countries.join(','),
    gbgfs: gbgfs.join(',')
  });

  useEffect(() => {
    mutate();
  }, [startTime, endTime, countries, gbgfs, mutate]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return <DashboardError />;
  }

  const { cards, charts } = data!;

  const statsCards = [
    {
      title: "Total Queries Processed",
      value: cards.totalQueries.toLocaleString(),
    },
    {
      title: "Avg Time Taken by LLM",
      value: formatSeconds(cards.avgTimeTaken),
    },
    {
      title: "Total Time Saved",
      value: formatSeconds(cards.totalTimeSaved),
    },
    {
      title: "Total Erratic Reported",
      value: cards.totalErratic.toString(),
    },
    {
      title: "Total Requests exceed Thresholds",
      value: cards.totalExceedThreshold.toString(),
    },
    {
      title: "Average Star Rating Score",
      value: (Math.min(5, Math.max(0, cards.avgStarRating))).toFixed(2),
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
                date={{ from: startTime, to: endTime }}
                onSelect={(range) => {
                  if(range?.from && range?.to) {
                    setDateRange(range.from, range.to)
                  }
                }}
              />
              <FilterButton 
                countries={countries}
                gbgfs={gbgfs}
                onApply={mutate}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {statsCards.map((card) => (
            <Card 
              key={card.title} 
              className="overflow-hidden transition-all duration-200 hover:cursor-pointer hover:shadow-lg hover:border-primary/20"
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
               <QueriesChart 
                 data={charts.queries} 
                 className="col-span-full lg:col-span-3"
               />
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
                    {cards.roi.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Platform Cost: {cards.platformCost.toLocaleString()}
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
                    {cards.totalCostSavings.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <div className="mt-4 flex-1">
              <TimeSavedChart 
                data={charts.timeSaved} 
                className="h-full"
              />
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
            <LLMCostChart 
              data={charts.llmCost}  
              className="col-span-2"
            />
            <ResponseTimeChart 
              data={charts.llmResponseTime} 
              className="col-span-2"
            />
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
