"use client"

import { motion } from "framer-motion"
import { ArrowLeft, FileText, Scale, AlertTriangle, CreditCard } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
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
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Terms of <span className="text-gradient">Service</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Please read these terms carefully before using our services.
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
            {/* Agreement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Scale className="w-5 h-5" />
                    <span>Agreement to Terms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    By accessing and using Ai Nest's website and services, you accept and agree to be bound by the terms
                    and provision of this agreement. If you do not agree to abide by the above, please do not use this
                    service.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Our Services</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>Ai Nest provides the following services:</p>
                  <ul>
                    <li>AI-powered web development and design</li>
                    <li>Digital transformation consulting</li>
                    <li>Custom software development</li>
                    <li>Process automation solutions</li>
                    <li>Technical support and maintenance</li>
                  </ul>
                  <p>
                    We reserve the right to modify, suspend, or discontinue any aspect of our services at any time
                    without prior notice.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* User Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>User Responsibilities</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>As a user of our services, you agree to:</p>
                  <ul>
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Respect intellectual property rights</li>
                    <li>Not interfere with or disrupt our services</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Payment Terms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <h3>Pricing and Billing</h3>
                  <ul>
                    <li>All prices are quoted in Ghana Cedis (GHS) or US Dollars (USD)</li>
                    <li>Payment terms are specified in individual service agreements</li>
                    <li>Late payments may incur additional fees</li>
                    <li>We accept various payment methods including bank transfers and mobile money</li>
                  </ul>

                  <h3>Refunds</h3>
                  <ul>
                    <li>Refund policies vary by service type and are outlined in service agreements</li>
                    <li>Custom development work is generally non-refundable once commenced</li>
                    <li>Refund requests must be submitted within specified timeframes</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <h3>Our Rights</h3>
                  <p>
                    All content, features, and functionality of our website and services, including but not limited to
                    text, graphics, logos, and software, are owned by Ai Nest and protected by copyright, trademark, and
                    other intellectual property laws.
                  </p>

                  <h3>Client Rights</h3>
                  <p>
                    Upon full payment for custom development services, clients receive ownership rights to the delivered
                    work product, subject to any third-party licenses and our retained rights to methodologies and
                    general knowledge.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Limitations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Limitations of Liability</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    To the fullest extent permitted by law, Ai Nest shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, including but not limited to loss of profits, data, or
                    business interruption.
                  </p>
                  <p>
                    Our total liability for any claims arising from or related to our services shall not exceed the
                    amount paid by you for the specific service giving rise to the claim.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Warranties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Warranties and Disclaimers</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    We provide our services on an "as is" and "as available" basis. While we strive to deliver
                    high-quality services, we make no warranties, express or implied, regarding:
                  </p>
                  <ul>
                    <li>Uninterrupted or error-free service</li>
                    <li>Specific results or outcomes</li>
                    <li>Compatibility with all systems or software</li>
                    <li>Security against all threats</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Termination */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Termination</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    Either party may terminate service agreements with appropriate notice as specified in individual
                    contracts. We reserve the right to terminate or suspend access to our services immediately for
                    violations of these terms.
                  </p>
                  <p>
                    Upon termination, your right to use our services ceases immediately, and we may delete your data
                    according to our data retention policies.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Governing Law */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    These terms shall be governed by and construed in accordance with the laws of Ghana. Any disputes
                    arising from these terms or our services shall be subject to the exclusive jurisdiction of the
                    courts of Ghana.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <ul>
                    <li>
                      <strong>Email:</strong> legal@ainest.com
                    </li>
                    <li>
                      <strong>Address:</strong> Ai Nest, Accra, Ghana
                    </li>
                    <li>
                      <strong>Phone:</strong> +233 XX XXX XXXX
                    </li>
                  </ul>
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
