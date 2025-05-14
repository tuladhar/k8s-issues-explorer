import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Search, Clock, Lightbulb } from "lucide-react"
import { scenarios } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LikeButton from "@/components/like-button"

export default function ScenarioPage({ params }: { params: { id: string } }) {
  const scenarioId = Number.parseInt(params.id)
  const scenario = scenarios.find((s) => s.id === scenarioId)

  if (!scenario) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Link
        href="/"
        className="inline-flex items-center text-sm mb-8 hover:text-kubernetes transition-colors font-medium"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to all scenarios
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="kubernetes">Scenario #{scenarioId}</Badge>
            <Badge variant="outline">{scenario.category}</Badge>
            <Badge variant="secondary">{scenario.environment}</Badge>
          </div>

          <h1 className="text-4xl font-bold mb-6 text-slate-800">{scenario.title}</h1>

          <div className="bg-white p-6 rounded-lg border shadow-sm mb-6">
            <p className="text-lg leading-relaxed text-slate-700">{scenario.summary}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Find this helpful?</span>
              <LikeButton scenarioId={scenarioId} />
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <Card className="overflow-hidden border-l-4 border-l-orange-400">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <AlertTriangle className="h-5 w-5" />
                What Happened
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="leading-relaxed text-slate-700">{scenario.whatHappened}</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-blue-400">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Search className="h-5 w-5" />
                Diagnosis Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {scenario.diagnosisSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-700 h-6 w-6 flex-shrink-0 text-xs font-medium mt-0.5">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed text-slate-700">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-red-400">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Root Cause
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="leading-relaxed text-slate-700">{scenario.rootCause}</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-green-400">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Fix/Workaround
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <pre className="bg-slate-900 text-slate-50 p-6 rounded-md overflow-x-auto font-mono text-sm leading-relaxed">
                <code>{scenario.fix}</code>
              </pre>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-purple-400">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Clock className="h-5 w-5" />
                Lessons Learned
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="leading-relaxed text-slate-700">{scenario.lessonsLearned}</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-teal-400">
            <CardHeader className="bg-teal-50">
              <CardTitle className="flex items-center gap-2 text-teal-700">
                <Lightbulb className="h-5 w-5" />
                How to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {scenario.howToAvoid.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center rounded-full bg-teal-100 text-teal-700 h-6 w-6 flex-shrink-0 text-xs font-medium mt-0.5">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed text-slate-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex justify-between">
          {scenarioId > 1 && (
            <Link
              href={`/scenario/${scenarioId - 1}`}
              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-slate-50 transition-colors hover:text-kubernetes"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous Scenario</span>
            </Link>
          )}
          {scenarioId < scenarios.length && (
            <Link
              href={`/scenario/${scenarioId + 1}`}
              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-slate-50 transition-colors hover:text-kubernetes ml-auto"
            >
              <span>Next Scenario</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
