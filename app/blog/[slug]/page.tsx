"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock, Share2, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase, type BlogPost } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

export default function BlogPostPage() {
  const params = useParams()
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchBlogPost(params.slug as string)
    }
  }, [params.slug])

  const fetchBlogPost = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          setNotFound(true)
        } else {
          throw error
        }
      } else {
        setBlogPost(data)
        fetchRelatedPosts(data.category, data.id)
      }
    } catch (error) {
      console.error("Error fetching blog post:", error)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async (category: string | null, currentPostId: string) => {
    if (!category) return

    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("category", category)
        .eq("is_published", true)
        .neq("id", currentPostId)
        .limit(3)
        .order("published_at", { ascending: false })

      if (error) throw error
      setRelatedPosts(data || [])
    } catch (error) {
      console.error("Error fetching related posts:", error)
    }
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min read`
  }

  const sharePost = async () => {
    if (navigator.share && blogPost) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt || blogPost.title,
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

  if (notFound || !blogPost) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Tag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild variant="outline" className="glass-card">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
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

      {/* Article Header */}
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Back Button */}
            <Button asChild variant="ghost" className="mb-8 -ml-4">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {blogPost.category && (
                <Badge variant="secondary" className="glass-card">
                  {blogPost.category}
                </Badge>
              )}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blogPost.published_at || blogPost.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{getReadingTime(blogPost.content)}</span>
                </div>
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">{blogPost.title}</h1>

            {/* Article Excerpt */}
            {blogPost.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">{blogPost.excerpt}</p>
            )}

            {/* Share Button */}
            <Button onClick={sharePost} variant="outline" className="glass-card mb-8">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {blogPost.image_url && (
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src={blogPost.image_url || "/placeholder.svg"}
                alt={blogPost.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: blogPost.content.replace(/\n/g, "<br />"),
              }}
            />
          </motion.div>

          {/* Tags */}
          {blogPost.tags && blogPost.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Related Articles</h2>
              <p className="text-muted-foreground">Continue reading with these related posts</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="glass-card border-0 rounded-xl overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={
                            post.image_url ||
                            `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(post.title) || "/placeholder.svg"}`
                          }
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {post.category && (
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="glass-card">
                              {post.category}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.published_at || post.created_at)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{getReadingTime(post.content)}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt || post.content.substring(0, 120) + "..."}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
