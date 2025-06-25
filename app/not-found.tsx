"use client"

import { motion } from "framer-motion"
import { Home, Mail, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* 404 Animation */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-8xl sm:text-9xl font-bold text-gradient mb-4"
            >
              404
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-32 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full"
            />
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Oops! The page you're looking for seems to have wandered off into the digital void. Don't worry, even the
              best AI can't predict every path!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button asChild size="lg" className="gradient-primary text-white px-8">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass-card px-8">
              <Link href="/contact">
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </Link>
            </Button>
          </motion.div>

          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Homepage</h3>
                <p className="text-sm text-muted-foreground mb-4">Discover our AI-powered solutions</p>
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/">
                    Visit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Services</h3>
                <p className="text-sm text-muted-foreground mb-4">Explore our digital services</p>
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/services">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Projects</h3>
                <p className="text-sm text-muted-foreground mb-4">View our case studies</p>
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/projects">
                    Browse
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Contact</h3>
                <p className="text-sm text-muted-foreground mb-4">Get in touch with us</p>
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/contact">
                    Contact
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 text-sm text-muted-foreground"
          >
            <p>
              Need immediate assistance? Email us at <strong>hello@ainest.com</strong>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
