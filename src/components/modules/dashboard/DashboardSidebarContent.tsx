'use client'

import { useSidebar } from "./SidebarContext"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { UserInfo } from "@/types/user.interface"
import { NavSection } from "@/types/dashboard.interface"
import { X } from "lucide-react"
import { getIconComponents } from "@/lib/icon-mapper" 

interface DashboardSidebarContentProps {
  userInfo: UserInfo
  navItems: NavSection[]
  dashboardHome: string
}

const DashboardSidebarContent = ({ userInfo, navItems, dashboardHome }: DashboardSidebarContentProps) => {
  const { isOpen, toggle, closeOnMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={toggle}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-30 h-full bg-[#0f172a] border-r border-slate-700/50
          flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 translate-x-0" : "w-16 -translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-3 border-b border-slate-700/50 overflow-hidden flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            {isOpen && (
              <span className="text-white font-semibold text-sm truncate tracking-wide">
                Sheba Lab
              </span>
            )}
          </div>

          {/* X button — mobile only */}
          {isOpen && (
            <button
              onClick={toggle}
              className="lg:hidden flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md
                text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X size={24} color="white" />
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="mx-3 border-t border-slate-700/50 flex-shrink-0" />

        {/* Scrollable Nav Links */}
        <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
          {navItems.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="mb-1 pb-2 border-b border-slate-700/40 last:border-b-0"
            >
              {/* Section Title */}
              {section.title && isOpen && (
                <p className="px-4 py-1 text-lg font-semibold text-slate-500 uppercase tracking-wider">
                  {section.title}
                </p>
              )}

              {/* Nav Links */}
              <ul className="space-y-1 px-2">
                {section.items.map(({ href, title, icon: iconName }) => {
                  const isActive = pathname === href
                  const Icon = getIconComponents(iconName)  // ← string থেকে LucideIcon
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={closeOnMobile}
                        className={`
                          flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors duration-150
                          group relative
                          ${isActive
                            ? "bg-indigo-600 text-white"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }
                        `}
                      >
                        {/* Icon */}
                        <Icon size={20} className="flex-shrink-0" />

                        {isOpen ? (
                          /* Sidebar open — label দেখায় */
                          <span className="text-sm font-medium truncate">{title}</span>
                        ) : (
                          /* Sidebar বন্ধ — hover tooltip */
                          <span className="
                            absolute left-full ml-2 px-2 py-1 rounded-md bg-slate-700 text-white text-xs
                            whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none
                            transition-opacity duration-150 z-50
                          ">
                            {title}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default DashboardSidebarContent