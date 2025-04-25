import DynamicBreadcrumb from "@/components/layout/breadcrumb";
import AppSidebar from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex min-h-screen w-full overflow-hidden">
            <SidebarProvider>
                <div className="sticky left-0 top-0 h-screen">
                    <AppSidebar/>
                </div>
                <div className="flex-1 overflow-auto">
                    <DynamicBreadcrumb/>
                    <main className="p-6">{children}</main>
                </div>
            </SidebarProvider>
        </div>
    );
}
