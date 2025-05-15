import type React from "react"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { GitHubIcon, LinkedInIcon, KubernetesLogo } from "@/components/icons"
import { PromoBanner } from "@/components/promo-banner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
})

export const metadata = {
  title: "K8s Production Issues Explorer",
  description: "A collection of real-world Kubernetes production issues and their solutions",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <nav className="border-b py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
              <div className="container mx-auto flex items-center px-4">
                <a
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl text-kubernetes hover:opacity-90 transition-opacity"
                >
                  <KubernetesLogo className="h-8 w-8" />
                  <span>K8s Issues Explorer</span>
                </a>
                <div className="ml-auto flex items-center gap-6">
                  <a
                    href="https://github.com/tuladhar/k8s-issues-explorer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-kubernetes transition-colors"
                  >
                    <GitHubIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/ptuladhar3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-kubernetes transition-colors"
                  >
                    <LinkedInIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                </div>
              </div>
            </nav>
            <PromoBanner />
            <main className="flex-1 bg-slate-50">{children}</main>
            <footer className="border-t py-8 bg-white">
              <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
                  <p className="text-sm text-muted-foreground">
                    Based on the work by{" "}
                    <a
                      href="https://github.com/vijay2181/k8s-500-prod-issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline underline-offset-4 hover:text-kubernetes"
                    >
                      Vijay2181
                    </a>
                  </p>
                  <span className="hidden md:inline text-muted-foreground">•</span>
                  <p className="text-sm text-muted-foreground">
                    Created by{" "}
                    <a
                      href="https://linkedin.com/in/ptuladhar3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline underline-offset-4 hover:text-kubernetes"
                    >
                      Puru Tuladhar
                    </a>
                  </p>
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()} K8s Issues Explorer. This site is not affiliated with the official
                  Kubernetes project.
                </p> */}
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
