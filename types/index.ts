import type React from "react"
export interface Tool {
  id: string
  title: string
  description: string
  type: "GPT" | "Doc" | "Script" | "Video"
  tier: "Foundation" | "Specialist"
  complexity: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  featured?: boolean
}

export interface Category {
  id: string
  icon: string
  title: string
  description: string
  count: number
}

export interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export interface SidebarItem {
  id: string
  title: string
  icon: React.ComponentType
  href?: string
  active?: boolean
}

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}
