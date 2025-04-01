"use client";

import AccessControl from "@/components/shared/access-control";
import { DashboardCard } from "./dashboard/card";
import { DashboardChart } from "./dashboard/chart";
import { DashboardFilter } from "./dashboard/filter";
import { NoAccess } from "./dashboard/no-access";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AccessControl
        userPermissions={[]}
        allowPermissions={["mi.readonly"]}
        renderNoAccess={() => <NoAccess />}
      >
        <DashboardFilter />
        <DashboardCard />
        <DashboardChart />
      </AccessControl>
    </div>
  );
}
