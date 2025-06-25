"use client"

import { motion } from "framer-motion";
import { ArrowLeft, Cookie, Shield } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CookiesPage() {
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
                Learn how we use cookies to enhance your experience on our website.
              </p>
              <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* What Are Cookies */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>What Are Cookies?</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>Cookies are small text files placed on your device when you visit our website. They help us remember your preferences, analyze site usage, and personalize your experience.</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Types of Cookies */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Types of Cookies We Use</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <ul>
                    <li><strong>Essential Cookies:</strong> Necessary for website functionality (e.g., navigation, secure areas, forms).</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site to improve performance.</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and choices for a personalized experience.</li>
                    <li><strong>Marketing Cookies:</strong> Track visitors to display relevant ads and measure campaign effectiveness.</li>
                  </ul>
                  {/* Styled Table */}
                  <div className="overflow-x-auto mt-8">
                    <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="px-4 py-3 text-left font-semibold">Cookie Name</th>
                          <th className="px-4 py-3 text-left font-semibold">Purpose</th>
                          <th className="px-4 py-3 text-left font-semibold">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-3">session_id</td>
                          <td className="px-4 py-3">Maintains your session while browsing</td>
                          <td className="px-4 py-3">Session</td>
                        </tr>
                        <tr className="bg-muted/50 border-b">
                          <td className="px-4 py-3">preferences</td>
                          <td className="px-4 py-3">Stores your site preferences</td>
                          <td className="px-4 py-3">1 year</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3">analytics_id</td>
                          <td className="px-4 py-3">Tracks website usage for analytics</td>
                          <td className="px-4 py-3">2 years</td>
                        </tr>
                        <tr className="bg-muted/50">
                          <td className="px-4 py-3">marketing_tracker</td>
                          <td className="px-4 py-3">Used for marketing campaigns</td>
                          <td className="px-4 py-3">6 months</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            {/* Third-Party Cookies */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Third-Party Cookies</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>We may use third-party services that place cookies on your device, such as:</p>
                  <ul>
                    <li>Google Analytics for website analytics</li>
                    <li>Google Ads for advertising</li>
                    <li>Social media platforms for sharing features</li>
                    <li>Payment processors for secure transactions</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            {/* Managing Cookies */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Managing Cookies</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>You can control and manage cookies through your browser settings. Disabling cookies may affect your experience and some features may not work as intended.</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Data Protection and Privacy */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Data Protection and Privacy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>We are committed to protecting your privacy and ensuring your personal information is handled in accordance with applicable laws. For more information, please read our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Updates */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Updates to This Policy</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>We may update this Cookie Policy from time to time. Material changes will be posted on this page.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 