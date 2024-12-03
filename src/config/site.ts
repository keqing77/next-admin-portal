import { SidebarNavItem, SiteConfig } from "@/types";
import { env } from "../../env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const siteConfig: SiteConfig = {
  name: "Admin Portal",
  description:
    "Admin Portal is a modern, open-source, and powerful admin dashboard that is built with Tailwind CSS and Next.js.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
  },
  mailSupport: "support@example.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "LOGO",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];
