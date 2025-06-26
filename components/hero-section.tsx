"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { supabase, type SiteStat } from "@/lib/supabase"

export function HeroSection() {
  const [stats, setStats] = useState<SiteStat[]>([])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from("site_stats")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (error) throw error
      setStats(data || [])
    } catch (error) {
      console.error("Error fetching stats:", error)
      // Fallback to default stats if fetch fails
      setStats([
        { id: "1", stat_key: "projects_completed", stat_value: "50+", stat_label: "Projects Completed", is_active: true, sort_order: 1, created_at: "", updated_at: "" },
        { id: "2", stat_key: "happy_clients", stat_value: "30+", stat_label: "Happy Clients", is_active: true, sort_order: 2, created_at: "", updated_at: "" },
        { id: "3", stat_key: "years_experience", stat_value: "5+", stat_label: "Years Experience", is_active: true, sort_order: 3, created_at: "", updated_at: "" },
        { id: "4", stat_key: "support_available", stat_value: "24/7", stat_label: "Support Available", is_active: true, sort_order: 4, created_at: "", updated_at: "" },
      ])
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full glass-card text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
            AI-Powered Digital Solutions
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="block">Build Smarter.</span>
            <span className="block text-gradient">Design Better.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Transform your business with cutting-edge AI integrations, stunning web development, and innovative digital
            solutions. We don't just build websites—we craft intelligent experiences that drive growth.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 text-sm"
          >
            {[
              { icon: Zap, text: "AI Integrations" },
              { icon: Target, text: "Web Development" },
              { icon: Sparkles, text: "Custom Solutions" },
            ].map((item, index) => (
              <div key={index} className="flex items-center px-4 py-2 glass-card rounded-full">
                <item.icon className="w-4 h-4 mr-2 text-primary" />
                {item.text}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="gradient-primary text-white px-8 py-6 text-lg font-semibold rounded-full hover:scale-105 transition-transform animate-glow"
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-full glass-card hover:scale-105 transition-transform"
            >
              <Link href="/projects">View Our Work</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16"
          >
            {stats.map((stat, index) => (
              <div key={stat.id} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{stat.stat_value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.stat_label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
