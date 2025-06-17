"use client"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Tool } from "../types"

interface ToolCardProps {
  tool: Tool
  onBookmark?: (id: string) => void
  onSelect?: (id: string) => void
  bookmarked?: boolean
  className?: string
}

export function ToolCard({ tool, onBookmark, onSelect, bookmarked = false, className }: ToolCardProps) {
  const getTypeColor = (type: Tool["type"]) => {
    switch (type) {
      case "GPT":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Doc":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "Script":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      case "Video":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    }
  }

  const getTierColor = (tier: Tool["tier"]) => {
    return tier === "Foundation"
      ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
  }

  const getComplexityColor = (complexity: Tool["complexity"]) => {
    switch (complexity) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    }
  }

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
        tool.featured && "ring-2 ring-blue-500 ring-opacity-50",
        className,
      )}
      onClick={() => onSelect?.(tool.id)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-wrap gap-2">
          <span className={cn("px-2 py-1 rounded text-xs font-medium", getTypeColor(tool.type))}>{tool.type}</span>
          <span className={cn("px-2 py-1 rounded text-xs font-medium", getTierColor(tool.tier))}>{tool.tier}</span>
          <span className={cn("px-2 py-1 rounded text-xs font-medium", getComplexityColor(tool.complexity))}>
            {tool.complexity}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onBookmark?.(tool.id)
          }}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {bookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-blue-600" />
          ) : (
            <Bookmark className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{tool.title}</h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{tool.description}</p>

      {tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// Demo component
export function ToolCardDemo() {
  const sampleTool: Tool = {
    id: "1",
    title: "GPT-4 Code Assistant",
    description:
      "Advanced AI assistant for code generation, debugging, and optimization. Supports multiple programming languages and frameworks.",
    type: "GPT",
    tier: "Specialist",
    complexity: "Intermediate",
    tags: ["coding", "ai", "debugging", "optimization"],
    featured: true,
  }

  return (
    <div className="max-w-sm">
      <ToolCard
        tool={sampleTool}
        onBookmark={(id) => console.log("Bookmarked:", id)}
        onSelect={(id) => console.log("Selected:", id)}
      />
    </div>
  )
}
