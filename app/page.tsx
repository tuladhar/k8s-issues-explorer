"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { scenarios as allScenarios, type Scenario } from "@/lib/data"
import { KubernetesLogo } from "@/components/icons"
import { ScenarioSearch } from "@/components/scenario-search"
import { useState } from "react"

export default function Home() {
  const [scenarios, setScenarios] = useState<Scenario[]>(allScenarios)

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-8 text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <KubernetesLogo className="h-20 w-20 text-kubernetes" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-kubernetes">Kubernetes Production Issues</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A collection of real-world Kubernetes production issues and their solutions, presented in an easy-to-navigate
          format.
        </p>
      </header>

      <ScenarioSearch onSearch={setScenarios} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scenarios.map((scenario) => (
          <Link href={`/scenario/${scenario.id}`} key={scenario.id} className="block">
            <Card className="h-full transition-all hover:shadow-lg hover:border-kubernetes hover:translate-y-[-4px] group">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <Badge variant="kubernetes" className="mb-2">
                    #{scenario.id}
                  </Badge>
                  <Badge variant="outline">{scenario.category}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-kubernetes transition-colors">
                  {scenario.title}
                </CardTitle>
                <CardDescription className="text-sm">{scenario.environment}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base line-clamp-3 leading-relaxed">{scenario.summary}</p>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <span className="text-sm text-muted-foreground">Click to view details</span>
                <Badge variant="secondary" className="text-xs">
                  {scenario.category}
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
