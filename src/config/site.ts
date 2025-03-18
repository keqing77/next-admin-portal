import { ProfileMenuConfig, SidebarMenuConfig } from "@/types/site";
import {
  BadgeCheck,
  Bell,
  Bot,
  Home,
  LogOut,
  SquareTerminal,
  Users
} from "lucide-react";

export const sidebarMenu: SidebarMenuConfig = {
  navHeader: {
    title: "Admin Portal",
    subtitle: "Platform",
    logo: "/logo.svg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Model Performance Evaluation",
      url: "/evaluation",
      icon: Bot,
    },
    {
      title: "Audit and Monitoring",
      url: "/audit",
      icon: Users,
    },
    {
      title: "Model LifeCycle Management",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Prompt management",
          url: "/registry",
        },
        {
          title: "Template management",
          url: "/deployment",
        }
      ]
    }
  ],
  navWithoutItems: [],
};

export const profileMenu: ProfileMenuConfig = {
  user: {
    name: "System User",
    email: "admin@example.com",
    avatar: "/avatar.png",
  },
  menuItems: [
    {
      icon: BadgeCheck,
      title: "Account",
    },
    {
      icon: Bell,
      title: "Notifications",
    },
    {
      icon: LogOut,
      title: "Log out",
    },
  ],
  theme: {
    label: "Theme",
  }
}
