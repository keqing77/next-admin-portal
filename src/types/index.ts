import { Icons } from "@/components/shared/icons";
import { UserRole } from "./user";

export interface DashboardData {
  cards: {
    totalQueries: number;
    avgTimeTaken: number; // in seconds
    totalTimeSaved: number; // in seconds
    totalErratic: number;
    totalExceedThreshold: number;
    avgStarRating: number;
    roi: number;
    platformCost: number;
    totalCostSavings: number;
  };
  charts: {
    queriesPerRegion: Array<{
      date: string;
      totalQueries: number;
      avgQueries: number;
      regions: {
        UK: number;
        HK: number;
        SG: number;
        CHN: number;
      };
    }>;
    queries: Array<{ date: string; value: number }>;
    timeSaved: Array<{ date: string; value: number }>;
    llmCost: Array<{ date: string; value: number }>;
    llmResponseTime: Array<{ date: string; value: number }>;
  };
} 


export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[];
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};


