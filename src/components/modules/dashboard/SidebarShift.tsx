'use client'


import { ReactNode } from "react"
import { useSidebar } from "./SidebarContext"

const SidebarShift = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useSidebar()

  return (
    <div className={`
      flex-1 flex flex-col min-w-0 transition-all duration-300
      ${isOpen ? "lg:ml-60" : "lg:ml-16"}
    `}>
      {children}
    </div>
  )
}

export default SidebarShift