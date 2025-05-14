import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would use a database
// This is a simple in-memory store for demonstration
const likesStore: Record<number, number> = {}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const scenarioId = Number.parseInt(searchParams.get("scenarioId") || "0")

  if (!scenarioId) {
    return NextResponse.json({ error: "scenarioId is required" }, { status: 400 })
  }

  return NextResponse.json({
    likes: likesStore[scenarioId] || 0,
  })
}

export async function POST(request: NextRequest) {
  const { scenarioId } = await request.json()

  if (!scenarioId) {
    return NextResponse.json({ error: "scenarioId is required" }, { status: 400 })
  }

  // Initialize if not exists
  if (!likesStore[scenarioId]) {
    likesStore[scenarioId] = 0
  }

  // Increment likes
  likesStore[scenarioId]++

  return NextResponse.json({
    likes: likesStore[scenarioId],
  })
}

export async function DELETE(request: NextRequest) {
  const { scenarioId } = await request.json()

  if (!scenarioId) {
    return NextResponse.json({ error: "scenarioId is required" }, { status: 400 })
  }

  // Decrement likes, but not below 0
  if (likesStore[scenarioId] && likesStore[scenarioId] > 0) {
    likesStore[scenarioId]--
  }

  return NextResponse.json({
    likes: likesStore[scenarioId] || 0,
  })
}
