"use client"
import { cn } from "@/lib/utils"
import type { SidebarSection } from "../types"

interface SidebarNavProps {
  sections: SidebarSection[]
  collapsed?: boolean
  className?: string
}

export function SidebarNav({ sections, collapsed = false, className }: SidebarNavProps) {
  return (
    <nav className={cn("p-4 space-y-6", className)}>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
          )}
          <ul className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    className={cn(
                      "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      "hover:bg-gray-100 dark:hover:bg-gray-700",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500",
                      item.active
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300",
                    )}
                    aria-label={item.title}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="ml-3 truncate">{item.title}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
