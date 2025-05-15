"use client"

import { useState, useEffect } from "react"
import { X, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

interface PromoBannerProps {
  className?: string
}

export function PromoBanner({ className }: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()
  const discountCode = "K8SISSUE"

  useEffect(() => {
    // Check if banner was previously dismissed
    const bannerDismissed = localStorage.getItem("cks-promo-dismissed")
    if (bannerDismissed) {
      setIsVisible(false)
    }
    setIsClient(true)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("cks-promo-dismissed", "true")
  }

  const copyDiscountCode = () => {
    navigator.clipboard.writeText(discountCode)
    setIsCopied(true)
    toast({
      title: "Copied to clipboard!",
      description: `Discount code ${discountCode} has been copied to your clipboard.`,
      duration: 3000,
    })

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  if (!isClient || !isVisible) return null

  return (
    <>
      <Toaster />
      <div className={cn("bg-kubernetes/10 border-b border-kubernetes/20 py-4 px-4 relative", className)}>
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-base">
          <span className="font-medium text-center sm:text-left text-lg">
            <span className="bg-kubernetes/10 text-kubernetes px-2 py-0.5 rounded font-mono">NEW</span> <span className="text-kubernetes">CKS Handbook -
            2nd Edition now available!</span>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={copyDiscountCode}
              className="font-mono font-bold text-kubernetes text-lg bg-kubernetes/5 px-3 py-1 rounded flex items-center gap-1 hover:bg-kubernetes/10 transition-colors cursor-pointer"
              aria-label="Copy discount code"
            >
              {discountCode}
              {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
            <span className="text-muted-foreground text-lg">for 25% off</span>
            <Button
              variant="kubernetes"
              size="sm"
              className="whitespace-nowrap text-base px-4 py-2 h-auto"
              onClick={() => window.open("https://cks.purutuladhar.com", "_blank")}
            >
              Get the Book
            </Button>
          </div>
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss promotion"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  )
}
