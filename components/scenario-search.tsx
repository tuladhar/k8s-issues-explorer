"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { scenarios, type Scenario } from "@/lib/data"

interface ScenarioSearchProps {
  onSearch: (scenarios: Scenario[]) => void
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const ScenarioSearch = ({ onSearch }: ScenarioSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Split search term into keywords
      const keywords = debouncedSearchTerm
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((k) => k.toLowerCase())

      if (keywords.length > 0) {
        // Filter scenarios that contain ALL keywords in any of the searchable fields
        const filteredScenarios = scenarios.filter((scenario) => {
          // Check if all keywords are found in at least one of the fields
          return keywords.every((keyword) => {
            const titleMatch = scenario.title.toLowerCase().includes(keyword)
            const environmentMatch = scenario.environment.toLowerCase().includes(keyword)
            const summaryMatch = scenario.summary.toLowerCase().includes(keyword)

            // Return true if the keyword is found in any of the fields
            return titleMatch || environmentMatch || summaryMatch
          })
        })

        onSearch(filteredScenarios)
      } else {
        onSearch(scenarios)
      }
    } else {
      onSearch(scenarios)
    }
  }, [debouncedSearchTerm, onSearch])

  return (
    <div className="flex justify-center mb-16">
      <div className="relative w-1/2">
        <Input
          type="search"
          placeholder="Search Kubernetes Production Issues..."
          className="pl-12 pr-4 py-5 text-2xl border-2 border-kubernetes focus:ring-kubernetes focus:border-kubernetes focus-visible:ring-kubernetes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search scenarios"
          style={{ fontSize: "1.5rem", color: "#333" }}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-kubernetes" aria-hidden="true" />
      </div>
    </div>
  )
}
