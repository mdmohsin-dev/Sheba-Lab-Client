'use client'

import { createContext, useContext, useState, ReactNode } from "react"

interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
  closeOnMobile: () => void
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggle: () => {},
  closeOnMobile: () => {},
})

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggle = () => setIsOpen(prev => !prev)

  const closeOnMobile = () => {
    if (window.innerWidth < 1024) setIsOpen(false)
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, closeOnMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)