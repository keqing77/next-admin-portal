"use client";

import * as React from "react";
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  Users,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  GalleryVerticalEnd,
  LogOut,
  MoreHorizontal,
  Plus,
  Settings2,
  SquareTerminal,
  Folder,
  Forward,
  Trash2,
  BarChart,
  Terminal,
  Home,
  ChartColumn,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DynamicBreadcrumb } from "@/components/layout/breadcrumb";
import { ModeToggle } from "./mode-toggle";
import { NavProjects } from "./nav-projects";
import { NavMain } from "./nav-main";

// This is sample data.
const data = {
  user: {
    name: "user",
    email: "user@example.com",
    avatar: "/shadcn.jpeg",
  },
  teams: [
    {
      name: "Admin Portal",
      logo: GalleryVerticalEnd,
      plan: "Platform",
    },
    {
      name: "Application B",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Application C",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Functional Metrics",
      url: "/dashboard/metrics",
      icon: Bot,
    },
    {
      title: "User Activity",
      url: "/dashboard/activity",
      icon: Bot,
    },
    // {
    //   title: "Users",
    //   url: "/dashboard/users",
    //   icon: Users,
    // },
    // {
    //   title: "Prompts",
    //   url: "#",
    //   icon: SquareTerminal,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Prompts management",
    //       url: "/dashboard/prompts",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "/dashboard/settings",
    //   icon: Settings2,
    // },
  ],
  navWithoutItems: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      name: "Users",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      name: "Prompts",
      url: "/dashboard/prompts",
      icon: Bot,
    },
    {
      name: "Analytics",
      url: "/dashboard/analytics",
      icon: ChartColumn,
    },
  ],
};

export default function AppSidebar() {
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <activeTeam.logo className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeTeam.name}
                    </span>
                    <span className="truncate text-xs">{activeTeam.plan}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Teams
                </DropdownMenuLabel>
                {data.teams.map((team, index) => (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => setActiveTeam(team)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <team.logo className="size-4 shrink-0" />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Add Application
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.navWithoutItems} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <ModeToggle />
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {data.user.name}
                    </span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup></DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />

                    <span className="ml-2">Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    <span className="ml-2">Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  <span className="ml-2">Log out</span>
                </DropdownMenuItem>
                <DropdownMenuItem></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
