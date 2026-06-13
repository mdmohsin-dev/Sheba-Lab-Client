import DashboardNavbar from "@/components/modules/dashboard/DashboardNavbar"
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar"
import { SidebarProvider } from "@/components/modules/dashboard/SidebarContext"
import SidebarShift from "@/components/modules/dashboard/SidebarShift"

const CommonDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#0b1120] flex">
        <DashboardSidebar />
        <SidebarShift>
          <DashboardNavbar />
          <main className="flex-1 p-6 text-white">
            {children}
          </main>
        </SidebarShift>
      </div>
    </SidebarProvider>
  )
}

export default CommonDashboardLayout