import Header from "@/components/admin/header"
import Footer from "@/components/footer"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <SidebarTrigger />
        {/* <Header /> */}
        {children}
        <Footer />
      </div>
    </SidebarProvider>
  )
}
