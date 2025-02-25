"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "../link/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  { id: "rmc", name: "RMC" },
  { id: "ask", name: "Ask" },
];

export const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Select defaultValue="rmc">
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
        {paths.map((path, index) => (
          <div key={path} className="flex items-center">
            <Link
              href={`/${paths.slice(0, index + 1).join("/")}`}
              className={cn(
                "hover:text-primary",
                index === paths.length - 1 ? "text-foreground font-medium" : ""
              )}
            >
              {breadcrumbMap[path] || path}
            </Link>
            {index < paths.length - 1 && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
          </div>
        ))}
      </Breadcrumb>
    </header>
  );
};

export default DynamicBreadcrumb;
