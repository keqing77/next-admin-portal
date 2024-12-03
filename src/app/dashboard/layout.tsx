import AppSidebar from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DynamicBreadcrumb } from "@/components/layout/breadcrumb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 transition-all duration-300 w-full">
          <DynamicBreadcrumb />
          <main className="p-6 w-full">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
