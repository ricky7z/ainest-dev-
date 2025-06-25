"use client"

import { motion } from "framer-motion"
import { Bot, Code, Palette, GraduationCap, Wrench, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    id: "ai-integrations",
    icon: Bot,
    title: "AI Integrations",
    subtitle: "Intelligent Automation Solutions",
    description:
      "Transform your business operations with cutting-edge AI technologies that automate processes, enhance customer experiences, and drive intelligent decision-making.",
    features: [
      "Custom AI Chatbots & Virtual Assistants",
      "Process Automation & Workflow Optimization",
      "Predictive Analytics & Data Intelligence",
      "Natural Language Processing Solutions",
      "Computer Vision & Image Recognition",
      "AI-Powered Recommendation Systems",
    ],
    benefits: [
      "24/7 Customer Support Automation",
      "Reduced Operational Costs by 40-60%",
      "Improved Customer Satisfaction",
      "Data-Driven Business Insights",
    ],
    color: "from-blue-500 to-cyan-500",
    technologies: ["OpenAI", "TensorFlow", "PyTorch", "Dialogflow", "Azure AI", "AWS AI"],
  },
  {
    id: "web-development",
    icon: Code,
    title: "Web & App Development",
    subtitle: "Modern Digital Experiences",
    description:
      "Build fast, scalable, and user-friendly websites and applications using the latest technologies and best practices in web development.",
    features: [
      "Next.js & React Development",
      "Progressive Web Applications (PWAs)",
      "E-commerce Solutions",
      "Mobile-First Responsive Design",
      "API Development & Integration",
      "Database Design & Optimization",
    ],
    benefits: [
      "Lightning-Fast Performance",
      "SEO-Optimized Architecture",
      "Scalable & Maintainable Code",
      "Cross-Platform Compatibility",
    ],
    color: "from-purple-500 to-pink-500",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"],
  },
  {
    id: "branding",
    icon: Palette,
    title: "Project Conceptualization & Branding",
    subtitle: "Vision to Reality",
    description:
      "Transform your ideas into compelling brand identities and strategic project roadmaps. We help you conceptualize, plan, and execute projects that resonate with your audience.",
    features: [
      "Project Ideation & Strategy Development",
      "Brand Identity Design & Guidelines",
      "Market Research & Competitive Analysis",
      "Content Strategy & Messaging",
      "Visual Identity & Logo Design",
      "Brand Implementation & Rollout",
    ],
    benefits: [
      "Clear Project Vision & Direction",
      "Strong Brand Recognition",
      "Consistent Brand Experience",
      "Strategic Market Positioning",
    ],
    color: "from-orange-500 to-red-500",
    technologies: ["Figma", "Adobe Creative Suite", "Miro", "Notion", "Canva"],
  },
  {
    id: "consulting",
    icon: GraduationCap,
    title: "AI Consulting & Training",
    subtitle: "Strategic AI Implementation",
    description:
      "Get expert guidance on AI strategy, implementation roadmaps, and comprehensive training to maximize your technology investments.",
    features: [
      "AI Strategy & Roadmap Development",
      "Technology Assessment & Planning",
      "Team Training & Workshops",
      "Implementation Support",
      "Performance Monitoring & Optimization",
      "Change Management & Adoption",
    ],
    benefits: [
      "Clear AI Implementation Strategy",
      "Skilled Internal Teams",
      "Maximized ROI on AI Investments",
      "Competitive Market Advantage",
    ],
    color: "from-green-500 to-emerald-500",
    technologies: ["Strategic Planning", "Training Programs", "Workshops", "Documentation"],
  },
  {
    id: "custom-software",
    icon: Wrench,
    title: "Custom Software Tools",
    subtitle: "Tailored Business Solutions",
    description:
      "Develop bespoke software solutions designed specifically for your unique business requirements and operational workflows.",
    features: [
      "Custom Application Development",
      "Business Process Automation",
      "API Development & Integration",
      "Database Design & Management",
      "Cloud Solutions & Deployment",
      "Maintenance & Support Services",
    ],
    benefits: [
      "Perfect Fit for Your Business",
      "Improved Operational Efficiency",
      "Scalable Architecture",
      "Ongoing Support & Updates",
    ],
    color: "from-indigo-500 to-blue-500",
    technologies: ["Python", "Node.js", "React", "PostgreSQL", "AWS", "Docker"],
  },
]

export default function ServicesPage() {
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
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From AI integration to complete digital transformation, we offer comprehensive solutions
              tailored to your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="scroll-mt-32"
              >
                <Card className="glass-card border-0">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div>
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}
                        >
                          <service.icon className="w-8 h-8 text-white" />
                        </div>

                        <Badge
                          variant="outline"
                          className={`mb-4 bg-gradient-to-r ${service.color} text-white border-0`}
                        >
                          {service.subtitle}
                        </Badge>

                        <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        <div className="space-y-6">
                          <div>
                            <h3 className="font-semibold mb-3">Key Features</h3>
                            <ul className="grid sm:grid-cols-2 gap-2">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm">
                                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3`} />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3">Benefits</h3>
                            <ul className="grid sm:grid-cols-2 gap-2">
                              {service.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center text-sm">
                                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3`} />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="lg:border-l lg:pl-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-semibold mb-3">Technologies & Tools</h3>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech, idx) => (
                                <Badge key={idx} variant="outline">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="pt-6 border-t">
                            <h3 className="font-semibold mb-4">Ready to Get Started?</h3>
                            <Button asChild className="w-full sm:w-auto gradient-primary text-white">
                              <Link href="/contact">
                                Discuss Your Project
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals. Our team is ready to
              create a custom solution that perfectly fits your needs.
            </p>
            <Button asChild size="lg" className="gradient-primary text-white px-8">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
