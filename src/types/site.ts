import { type LucideIcon } from "lucide-react";

export interface NavHeader {
  title: string;
  subtitle: string;
  logo: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: Omit<NavItem, "icon">[];
}

export interface MenuItem {
  icon: LucideIcon;
  title: string;
}

export interface SidebarMenuConfig {
  navHeader: NavHeader;
  user: UserProfile;
  navMain: NavItem[];
  navWithoutItems: NavItem[];
}

export interface ProfileMenuConfig {
  user: UserProfile;
  menuItems: MenuItem[];
  theme: {
    label: string;
  };
}
