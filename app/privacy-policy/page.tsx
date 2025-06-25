"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Privacy <span className="text-gradient">Policy</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
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
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    At Ai Nest ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the
                    security of your personal information. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Information We Collect</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <h3>Personal Information</h3>
                  <p>We may collect personal information that you voluntarily provide to us, including:</p>
                  <ul>
                    <li>Name and contact information (email address, phone number)</li>
                    <li>Company information and job title</li>
                    <li>Project requirements and budget information</li>
                    <li>Communication preferences</li>
                    <li>Any other information you choose to provide</li>
                  </ul>

                  <h3>Automatically Collected Information</h3>
                  <p>When you visit our website, we may automatically collect:</p>
                  <ul>
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website information</li>
                  </ul>

                  <h3>Cookies and Tracking Technologies</h3>
                  <p>
                    We use cookies and similar tracking technologies to enhance your browsing experience, analyze site
                    traffic, and understand user preferences.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* How We Use Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>We use the collected information for the following purposes:</p>
                  <ul>
                    <li>Providing and improving our services</li>
                    <li>Responding to your inquiries and requests</li>
                    <li>Sending you relevant updates and marketing communications (with your consent)</li>
                    <li>Analyzing website usage and optimizing user experience</li>
                    <li>Complying with legal obligations</li>
                    <li>Protecting against fraud and security threats</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Information Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Information Sharing and Disclosure</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share your
                    information in the following circumstances:
                  </p>
                  <ul>
                    <li>
                      <strong>Service Providers:</strong> With trusted third-party service providers who assist us in
                      operating our website and conducting our business
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
                    </li>
                    <li>
                      <strong>Consent:</strong> With your explicit consent for specific purposes
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span>Data Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal
                    information against unauthorized access, alteration, disclosure, or destruction. These measures
                    include:
                  </p>
                  <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication measures</li>
                    <li>Employee training on data protection</li>
                  </ul>
                  <p>
                    However, no method of transmission over the internet or electronic storage is 100% secure, and we
                    cannot guarantee absolute security.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Your Rights and Choices</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <ul>
                    <li>
                      <strong>Access:</strong> Request access to your personal information
                    </li>
                    <li>
                      <strong>Correction:</strong> Request correction of inaccurate information
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your personal information
                    </li>
                    <li>
                      <strong>Portability:</strong> Request a copy of your data in a portable format
                    </li>
                    <li>
                      <strong>Opt-out:</strong> Unsubscribe from marketing communications
                    </li>
                    <li>
                      <strong>Restriction:</strong> Request restriction of processing
                    </li>
                  </ul>
                  <p>
                    To exercise these rights, please use our contact form or reach out to us using the contact information below.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* International Transfers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>International Data Transfers</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    Your information may be transferred to and processed in countries other than your own. We ensure
                    that such transfers comply with applicable data protection laws and implement appropriate safeguards
                    to protect your information.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
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
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
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
