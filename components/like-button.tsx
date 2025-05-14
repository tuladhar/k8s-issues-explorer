"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface LikeButtonProps {
  scenarioId: number
}

export default function LikeButton({ scenarioId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if the user has already liked this scenario
    const likedScenarios = JSON.parse(localStorage.getItem("likedScenarios") || "[]")
    setIsLiked(likedScenarios.includes(scenarioId))

    // Fetch the current like count
    fetchLikes()
  }, [scenarioId])

  const fetchLikes = async () => {
    try {
      const response = await fetch(`/api/likes?scenarioId=${scenarioId}`)
      if (response.ok) {
        const data = await response.json()
        setLikes(data.likes)
      }
    } catch (error) {
      console.error("Error fetching likes:", error)
    }
  }

  const handleLike = async () => {
    if (isLoading) return

    setIsLoading(true)

    try {
      const method = isLiked ? "DELETE" : "POST"
      const response = await fetch("/api/likes", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scenarioId }),
      })

      if (response.ok) {
        const data = await response.json()
        setLikes(data.likes)

        // Update local storage
        const likedScenarios = JSON.parse(localStorage.getItem("likedScenarios") || "[]")

        if (isLiked) {
          localStorage.setItem(
            "likedScenarios",
            JSON.stringify(likedScenarios.filter((id: number) => id !== scenarioId)),
          )
        } else {
          localStorage.setItem("likedScenarios", JSON.stringify([...likedScenarios, scenarioId]))
        }

        setIsLiked(!isLiked)

        toast({
          title: isLiked ? "Like removed" : "Scenario liked",
          description: isLiked ? "You've removed your like from this scenario." : "Thanks for liking this scenario!",
          variant: isLiked ? "default" : "kubernetes",
        })
      }
    } catch (error) {
      console.error("Error updating likes:", error)
      toast({
        title: "Error",
        description: "There was a problem updating your like. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={isLiked ? "kubernetes" : "outline"}
      size="sm"
      onClick={handleLike}
      disabled={isLoading}
      className="gap-2 transition-all hover:scale-105"
    >
      <ThumbsUp className="h-4 w-4" />
      <span>{likes}</span>
    </Button>
  )
}
