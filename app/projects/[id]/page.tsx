"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Calendar, User, Tag, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { supabase, type CaseStudy } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

export default function ProjectDetailPage() {
  const params = useParams()
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchCaseStudy(params.id as string)
    }
  }, [params.id])

  const fetchCaseStudy = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          setNotFound(true)
        } else {
          throw error
        }
      } else {
        setCaseStudy(data)
      }
    } catch (error) {
      console.error("Error fetching case study:", error)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const shareProject = async () => {
    if (navigator.share && caseStudy) {
      try {
        await navigator.share({
          title: caseStudy.title,
          text: caseStudy.description,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-32" />
              <div className="h-12 bg-muted rounded w-3/4" />
              <div className="h-64 bg-muted rounded-xl" />
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/6" />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (notFound || !caseStudy) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The project you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild variant="outline" className="glass-card">
                <Link href="/projects">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Back Button */}
            <Button asChild variant="ghost" className="mb-8 -ml-4">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>

            {/* Project Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge variant="secondary" className="glass-card">
                  {caseStudy.category}
                </Badge>
                {caseStudy.is_featured && <Badge className="gradient-primary text-white">Featured Project</Badge>}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(caseStudy.created_at)}</span>
                  </div>
                  {caseStudy.client && (
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{caseStudy.client}</span>
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6">{caseStudy.title}</h1>

              <div className="flex flex-col sm:flex-row gap-4">
                {caseStudy.project_url && (
                  <Button asChild className="gradient-primary text-white">
                    <a href={caseStudy.project_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Project
                    </a>
                  </Button>
                )}
                <Button onClick={shareProject} variant="outline" className="glass-card">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Project
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden"
          >
            <Image
              src={
                caseStudy.image_url ||
                `/placeholder.svg?height=500&width=1200&text=${encodeURIComponent(caseStudy.title) || "/placeholder.svg"}`
              }
              alt={caseStudy.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{caseStudy.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Separator className="my-8" />
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This project presented unique challenges that required innovative solutions and careful planning. Our
                  team worked closely with the client to understand their specific needs and develop a tailored approach
                  that would deliver exceptional results.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Separator className="my-8" />
                <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We developed a comprehensive solution that addressed all the client's requirements while exceeding
                  their expectations. The implementation involved cutting-edge technologies and best practices to ensure
                  optimal performance and user experience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Separator className="my-8" />
                <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The project delivered significant improvements in performance, user engagement, and business outcomes.
                  Our client saw measurable results that directly contributed to their growth and success in the market.
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="glass-card border-0">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Project Details</h3>
                    <div className="space-y-4">
                      {caseStudy.client && (
                        <div>
                          <div className="text-sm text-muted-foreground">Client</div>
                          <div className="font-medium">{caseStudy.client}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-sm text-muted-foreground">Category</div>
                        <div className="font-medium">{caseStudy.category}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                        <div className="font-medium">{formatDate(caseStudy.created_at)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="glass-card border-0">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Card className="glass-card border-0">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Interested in Similar Work?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Let's discuss how we can help you achieve similar results for your business.
                    </p>
                    <Button asChild className="w-full gradient-primary text-white">
                      <Link href="/contact">Get in Touch</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
