"use client";

import { DashboardCard } from "./card";
import { DashboardChart } from "./chart";
import { DashboardFilter } from "./filter";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardFilter />
      <DashboardCard />
      <DashboardChart />
    </div>
  );
}
