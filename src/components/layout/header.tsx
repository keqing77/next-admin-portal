"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/link/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  products: "Products",
  analytics: "Analytics",
  settings: "Settings",
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link href="/dashboard" className="flex items-center hover:text-primary">
        <SidebarTrigger />
      </Link>

      {paths.map((path, index) => (
        <div key={path} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href={`/${paths.slice(0, index + 1).join("/")}`}
            className={cn(
              "hover:text-primary",
              index === paths.length - 1 ? "text-foreground font-medium" : ""
            )}
          >
            {breadcrumbMap[path] || path}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background text-foreground px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center">
        <Breadcrumb />
      </div>
    </header>
  );
}
