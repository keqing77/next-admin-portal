"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "../link/link";

const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  prompts: "Prompts",
  analytics: "Analytics",
  settings: "Settings",
};

interface Project {
  id: string;
  name: string;
}

const projects: Project[] = [
  { id: "pojo1", name: "Project1" },
  { id: "pojo2", name: "Project2" },
  { id: "pojo3", name: "Project3" },
];

export const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const allPaths = pathname.split("/").filter(Boolean);

  // Check if we need to skip the first segment (for Kong Gateway environment)
  const hasAdminPortalPrefix =
    allPaths.length > 0 && allPaths[0] === "admin-portal";

  // If we have admin-portal prefix, skip it for display, otherwise show all paths
  const displayPaths = hasAdminPortalPrefix ? allPaths.slice(1) : allPaths;

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Select defaultValue="pojo1">
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select project" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb className="flex items-center">
        {displayPaths.map((path, index) => (
          <div key={path} className="flex items-center">
            <Link
              href={
                hasAdminPortalPrefix
                  ? `/${allPaths[0]}/${displayPaths
                      .slice(0, index + 1)
                      .join("/")}`
                  : `/${displayPaths.slice(0, index + 1).join("/")}`
              }
              className={cn(
                "hover:text-primary",
                index === displayPaths.length - 1
                  ? "text-foreground font-medium"
                  : ""
              )}
            >
              {breadcrumbMap[path] || path}
            </Link>
            {index < displayPaths.length - 1 && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
          </div>
        ))}
      </Breadcrumb>
    </header>
  );
};

export default DynamicBreadcrumb;
