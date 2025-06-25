"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Calendar, User, Tag, ArrowRight, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase, type CaseStudy } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

const categories = [
  { value: "all", label: "All Projects" },
  { value: "AI Integration", label: "AI Integration" },
  { value: "Web Development", label: "Web Development" },
  { value: "Branding", label: "Branding" },
  { value: "Custom Software", label: "Custom Software" },
]

export default function ProjectsPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  useEffect(() => {
    filterStudies()
  }, [caseStudies, searchTerm, selectedCategory])

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })

      if (error) throw error
      setCaseStudies(data || [])
    } catch (error) {
      console.error("Error fetching case studies:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterStudies = () => {
    let filtered = caseStudies

    if (selectedCategory !== "all") {
      filtered = filtered.filter((study) => study.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (study) =>
          study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredStudies(filtered)
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-muted rounded w-96 mx-auto" />
                <div className="h-6 bg-muted rounded w-[600px] mx-auto" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-xl mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of successful projects and see how we've helped businesses transform their digital
              presence with innovative AI-powered solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Filter Projects:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="w-full sm:w-64">
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-card border-white/20"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 glass-card border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredStudies.length} of {caseStudies.length} projects
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredStudies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No Projects Found</h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                variant="outline"
                className="glass-card"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="glass-card border-0 overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={
                          study.image_url ||
                          `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(study.title) || "/placeholder.svg"}`
                        }
                        alt={study.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="glass-card">
                          {study.category}
                        </Badge>
                      </div>

                      {/* Featured Badge */}
                      {study.is_featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="gradient-primary text-white">Featured</Badge>
                        </div>
                      )}

                      {/* External Link */}
                      {study.project_url && (
                        <div className="absolute bottom-4 right-4">
                          <Button
                            asChild
                            size="icon"
                            variant="secondary"
                            className="glass-card opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <a href={study.project_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(study.created_at)}</span>
                        </div>
                        {study.client && (
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{study.client}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {study.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">{study.description}</p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {study.technologies.slice(0, 3).map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {study.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{study.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <Button
                        asChild
                        variant="ghost"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <Link href={`/projects/${study.id}`}>
                          View Case Study
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch to discuss your project and see how we can help
              bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-white px-8">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass-card px-8">
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
