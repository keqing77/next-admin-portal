import DynamicBreadcrumb from "@/components/layout/breadcrumb";
import AppSidebar from "@/components/layout/sidebar";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin Platform UI",
  description: "A dashboard for admin platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <Toaster />
          <div className="flex min-h-screen w-full">
            <SidebarProvider>
              <AppSidebar />
              <div className="flex-1 transition-all duration-300 w-full">
                <DynamicBreadcrumb />
                <main className="p-6 w-full">{children}</main>
              </div>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
