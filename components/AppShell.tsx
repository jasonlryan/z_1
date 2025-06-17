"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { SidebarNav } from "./SidebarNav"
import { TopSearchBar } from "./TopSearchBar"
import type { SidebarSection } from "../types"

interface AppShellProps {
  children: React.ReactNode
  sidebarSections: SidebarSection[]
  onSearch: (query: string) => void
  className?: string
}

export function AppShell({ children, sidebarSections, onSearch, className }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className={cn("min-h-screen bg-gray-50 dark:bg-gray-900", className)}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Zeno Knows</h1>
            </div>
            <div className="flex-1 max-w-2xl mx-8">
              <TopSearchBar onSubmit={onSearch} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "sticky top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
            sidebarCollapsed ? "w-16" : "w-64",
          )}
        >
          <SidebarNav sections={sidebarSections} collapsed={sidebarCollapsed} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
