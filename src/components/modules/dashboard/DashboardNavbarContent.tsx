'use client'

import { UserInfo } from "@/types/user.interface"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md"
import { useSidebar } from "./SidebarContext"
import UserDropdown from "./UserDropdown"

interface DashboardNavbarContentProps {
  userInfo: UserInfo
}

const DashboardNavbarContent = ({ userInfo }: DashboardNavbarContentProps) => {
  const { isOpen, toggle } = useSidebar()

  return (
    <header className="h-16 bg-[#0f172a] border-b border-slate-700/50 flex items-center px-4 gap-4">
      <button
        onClick={toggle}
        className="flex items-center justify-center w-9 h-9 rounded-lg
          text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
      >
        {isOpen
          ? <MdKeyboardDoubleArrowLeft size={26} />
          : <MdKeyboardDoubleArrowRight size={26} />
        }
      </button>

      <div className="flex-1">
        <h1 className="text-white font-semibold text-sm tracking-wide">Dashboard</h1>
        <p className="text-slate-500 text-xs">Welcome back</p>
      </div>

      <div className="flex items-center gap-3">
       <UserDropdown userInfo={userInfo} />
      </div>
    </header>
  )
}

export default DashboardNavbarContent