"use client";

import { Users, Activity, DollarSign, TrendingUp } from "lucide-react";
// import { Bar, BarChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Component } from "@/components/shared/chart";
import PageViewsChart from "@/components/shared/page-views-chart";
import RequestStatusChart from "@/components/shared/request-status-chart";
import RequestTimeChart from "@/components/shared/request-time-chart";
import UserCountChart from "@/components/shared/user-count-chart";
import UserSatisfactionChart from "@/components/shared/user-satisfaction-chart";

const statsCards = [
  {
    title: "All Users",
    value: "12,345",
    change: "+12%",
    icon: Users,
    trend: "up",
  },
  {
    title: "PV",
    value: "1,234",
    change: "+23%",
    icon: Activity,
    trend: "up",
  },
  {
    title: "Cost",
    value: "$123,456",
    change: "-2%",
    icon: DollarSign,
    trend: "down",
  },
  {
    title: "Rate",
    value: "12.3%",
    change: "+4%",
    icon: TrendingUp,
    trend: "up",
  },
];

export default function DashboardPage() {
  return (
    // <div className="space-y-6">
    //   <div>
    //     <h2 className="text-2xl font-bold tracking-tight">Administrator</h2>
    //     <p className="text-muted-foreground">Welcome back! </p>
    //   </div>

    //   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    //     {statsCards.map((card) => (
    //       <Card key={card.title} className="p-6">
    //         <div className="flex items-center justify-between space-x-4">
    //           <div className="flex items-center space-x-4">
    //             <div className="p-2 bg-blue-50 rounded-lg">
    //               <card.icon className="h-6 w-6 text-blue-600" />
    //             </div>
    //             <div>
    //               <p className="text-sm font-medium text-muted-foreground">
    //                 {card.title}
    //               </p>
    //               <h3 className="text-2xl font-bold">{card.value}</h3>
    //             </div>
    //           </div>
    //           <div
    //             className={`text-sm ${
    //               card.trend === "up" ? "text-green-600" : "text-red-600"
    //             }`}
    //           >
    //             {card.change}
    //           </div>
    //         </div>
    //       </Card>
    //     ))}
    //   </div>

    //   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    //     <Component />

    //     <Component />

    //     <Card className="col-span-3 p-6">
    //       <h3 className="text-lg font-medium mb-4">Applications</h3>
    //       <div className="h-[300px] flex items-center justify-center text-muted-foreground">
    //         Graph area
    //       </div>
    //     </Card>
    //   </div>
    // </div>
    <div className="container mx-auto p-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Administrator</h2>
        <p className="text-muted-foreground p-2">Welcome back! </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => (
          <Card key={card.title} className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <card.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <h3 className="text-2xl font-bold">{card.value}</h3>
                </div>
              </div>
              <div
                className={`text-sm ${
                  card.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {card.change}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UserCountChart />
        <RequestStatusChart />
        <RequestTimeChart />
        <PageViewsChart />
        <UserSatisfactionChart />
      </div>
    </div>
  );
}
