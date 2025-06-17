"use client"

import { useState } from "react"
import { Home, Search, BookOpen, Settings, Users, Zap } from "lucide-react"
import { AppShell } from "../components/AppShell"
import { ToolCardDemo } from "../components/ToolCard"
import { CategoryTileDemo } from "../components/CategoryTile"
import { ChatPanelDemo } from "../components/ChatPanel"
import { CuratorDashboard } from "../components/CuratorDashboard"
import { FeaturedCarousel } from "../components/FeaturedCarousel"
import { CategoryGrid } from "../components/CategoryGrid"
import { ToolGrid } from "../components/ToolGrid"
import { useLocalSearch } from "../hooks/useLocalSearch"
import type { Tool, Category, SidebarSection } from "../types"

// Sample data
const sampleTools: Tool[] = [
  {
    id: "1",
    title: "GPT-4 Code Assistant",
    description: "Advanced AI assistant for code generation, debugging, and optimization.",
    type: "GPT",
    tier: "Specialist",
    complexity: "Intermediate",
    tags: ["coding", "ai", "debugging"],
    featured: true,
  },
  {
    id: "2",
    title: "API Documentation Generator",
    description: "Automatically generate comprehensive API documentation from your codebase.",
    type: "Script",
    tier: "Foundation",
    complexity: "Beginner",
    tags: ["documentation", "api", "automation"],
    featured: true,
  },
  {
    id: "3",
    title: "React Best Practices Guide",
    description: "Comprehensive guide covering modern React development patterns and practices.",
    type: "Doc",
    tier: "Foundation",
    complexity: "Intermediate",
    tags: ["react", "frontend", "best-practices"],
  },
  {
    id: "4",
    title: "Advanced TypeScript Tutorial",
    description: "Deep dive into TypeScript advanced features and patterns.",
    type: "Video",
    tier: "Specialist",
    complexity: "Advanced",
    tags: ["typescript", "tutorial", "advanced"],
  },
]

const sampleCategories: Category[] = [
  {
    id: "1",
    icon: "🤖",
    title: "AI Assistants",
    description: "Powerful AI tools for various tasks",
    count: 24,
  },
  {
    id: "2",
    icon: "📚",
    title: "Documentation",
    description: "Guides, tutorials, and references",
    count: 156,
  },
  {
    id: "3",
    icon: "⚡",
    title: "Scripts & Tools",
    description: "Automation and utility scripts",
    count: 89,
  },
  {
    id: "4",
    icon: "🎥",
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    count: 67,
  },
]

const sidebarSections: SidebarSection[] = [
  {
    title: "Main",
    items: [
      { id: "home", title: "Home", icon: Home, active: true },
      { id: "search", title: "Search", icon: Search },
      { id: "library", title: "Library", icon: BookOpen },
    ],
  },
  {
    title: "Management",
    items: [
      { id: "curator", title: "Curator Dashboard", icon: Settings },
      { id: "users", title: "Users", icon: Users },
      { id: "analytics", title: "Analytics", icon: Zap },
    ],
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState<"home" | "curator" | "demos">("home")

  const filteredTools = useLocalSearch(sampleTools, searchQuery)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleToolSelect = (id: string) => {
    console.log("Selected tool:", id)
  }

  const handleCategorySelect = (id: string) => {
    console.log("Selected category:", id)
  }

  return (
    <AppShell sidebarSections={sidebarSections} onSearch={handleSearch}>
      <div className="space-y-8">
        {/* Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveView("home")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === "home"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Home View
          </button>
          <button
            onClick={() => setActiveView("curator")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === "curator"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Curator Dashboard
          </button>
          <button
            onClick={() => setActiveView("demos")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === "demos"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Component Demos
          </button>
        </div>

        {activeView === "home" && (
          <>
            {/* Featured Tools */}
            <FeaturedCarousel tools={sampleTools} onSelect={handleToolSelect} />

            {/* Categories */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Browse Categories</h2>
              <CategoryGrid categories={sampleCategories} onSelect={handleCategorySelect} />
            </div>

            {/* All Tools */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : "All Tools"}
              </h2>
              <ToolGrid tools={filteredTools} onSelect={handleToolSelect} />
            </div>
          </>
        )}

        {activeView === "curator" && <CuratorDashboard />}

        {activeView === "demos" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Component Demos</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Tool Card</h3>
                  <ToolCardDemo />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Category Tile</h3>
                  <CategoryTileDemo />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Chat Panel</h3>
              <ChatPanelDemo />
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
