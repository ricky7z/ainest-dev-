"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Cookie, Settings, BarChart, Shield } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Cookie <span className="text-gradient">Policy</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Learn about how we use cookies and similar technologies on our website.
              </p>
              <p className="text-sm text-muted-foreground mt-2">Last updated: December 20, 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* What are Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cookie className="w-5 h-5" />
                    <span>What Are Cookies?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    Cookies are small text files that are stored on your device when you visit our website. They help us
                    provide you with a better browsing experience by remembering your preferences and analyzing how you
                    use our site.
                  </p>
                  <p>
                    We also use similar technologies such as web beacons, pixels, and local storage to collect
                    information about your interactions with our website.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Types of Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Types of Cookies We Use</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <h3>Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function properly. They enable basic functions like
                    page navigation, access to secure areas, and form submissions.
                  </p>
                  <ul>
                    <li>Session management</li>
                    <li>Security features</li>
                    <li>Load balancing</li>
                  </ul>

                  <h3>Performance Cookies</h3>
                  <p>
                    These cookies help us understand how visitors interact with our website by collecting and reporting
                    information anonymously.
                  </p>
                  <ul>
                    <li>Google Analytics</li>
                    <li>Page load times</li>
                    <li>Error tracking</li>
                  </ul>

                  <h3>Functional Cookies</h3>
                  <p>
                    These cookies enable enhanced functionality and personalization, such as remembering your
                    preferences and settings.
                  </p>
                  <ul>
                    <li>Language preferences</li>
                    <li>Theme settings (dark/light mode)</li>
                    <li>Currency selection</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Third-Party Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart className="w-5 h-5" />
                    <span>Third-Party Services</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>We use the following third-party services that may set cookies:</p>

                  <h3>Google Analytics</h3>
                  <p>
                    We use Google Analytics to analyze website traffic and user behavior. Google Analytics uses cookies
                    to collect information about how you use our website.
                  </p>

                  <h3>Supabase</h3>
                  <p>
                    Our backend services are powered by Supabase, which may use cookies for authentication and session
                    management.
                  </p>

                  <h3>Vercel</h3>
                  <p>
                    Our website is hosted on Vercel, which may use cookies for performance optimization and analytics.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Managing Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Managing Your Cookie Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <h3>Browser Settings</h3>
                  <p>You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
                  <ul>
                    <li>View and delete cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block third-party cookies</li>
                    <li>Clear all cookies when you close the browser</li>
                  </ul>

                  <h3>Browser-Specific Instructions</h3>
                  <ul>
                    <li>
                      <strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data
                    </li>
                    <li>
                      <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
                    </li>
                    <li>
                      <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                    </li>
                    <li>
                      <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
                    </li>
                  </ul>

                  <h3>Opt-Out Links</h3>
                  <ul>
                    <li>
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                        Google Analytics Opt-out
                      </a>
                    </li>
                    <li>
                      <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
                        Digital Advertising Alliance
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Impact of Disabling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Impact of Disabling Cookies</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>If you choose to disable cookies, some features of our website may not function properly:</p>
                  <ul>
                    <li>You may need to re-enter information on each visit</li>
                    <li>Personalized features may not work</li>
                    <li>Some forms may not submit correctly</li>
                    <li>We may not be able to remember your preferences</li>
                  </ul>
                  <p>Essential cookies cannot be disabled as they are necessary for the website to function.</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Data Protection and Privacy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    We are committed to protecting your privacy and ensuring that your personal information is handled
                    in accordance with applicable data protection laws, including GDPR.
                  </p>
                  <p>
                    For more information about how we collect, use, and protect your personal information, please read
                    our{" "}
                    <Link href="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Updates to This Policy</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                    operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                    updated policy on our website.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    If you have any questions about our Cookie Policy, please contact us using our contact form.
                  </p>
                  <div className="mt-4">
                    <ul>
                      <li>
                        <strong>Contact:</strong> Use our contact form
                      </li>
                      <li>
                        <strong>Address:</strong> Ai Nest, Accra, Ghana
                      </li>
                      <li>
                        <strong>Support:</strong> 24/7 Available
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
