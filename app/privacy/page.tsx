"use client"

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
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
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Privacy <span className="text-gradient">Policy</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
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
            {/* Introduction */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Introduction</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>At AiNest, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Information We Collect */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <ul>
                    <li><strong>Personal Information:</strong> Name, email address, phone number, company, and other details you provide via forms.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
                    <li><strong>Cookies & Tracking:</strong> Data collected through cookies and similar technologies (see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>).</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            {/* How We Use Your Information */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <ul>
                    <li>To provide and maintain our services</li>
                    <li>To communicate with you and respond to inquiries</li>
                    <li>To improve our website and services</li>
                    <li>To send updates, newsletters, and marketing (with your consent)</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            {/* Information Sharing and Disclosure */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Information Sharing and Disclosure</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                  <ul>
                    <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and providing services</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            {/* Data Security */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Data Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments.</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Data Retention */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Data Retention</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Your Rights and Choices */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Your Rights and Choices</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <ul>
                    <li><strong>Access:</strong> Request access to your personal information</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                    <li><strong>Restriction:</strong> Request restriction of processing</li>
                    <li><strong>Objection:</strong> Object to processing of your personal information</li>
                    <li><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
                  </ul>
                  <p>To exercise these rights, please use our contact form or reach out to us using the contact information below.</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* International Data Transfers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>International Data Transfers</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>Your personal information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and that appropriate safeguards are in place to protect your information.</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Children's Privacy */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Third-Party Links */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Third-Party Links</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
                </CardContent>
              </Card>
            </motion.div>
            {/* Contact */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }}>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
                  <ul>
                    <li><strong>Email:</strong> legal@ainest.com</li>
                    <li><strong>Address:</strong> Ai Nest, Accra, Ghana</li>
                    <li><strong>Phone:</strong> +233 XX XXX XXXX</li>
                  </ul>
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