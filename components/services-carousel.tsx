"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Code, Palette, GraduationCap, Wrench, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Bot,
    title: "AI Integrations",
    description:
      "Smart chatbots, automation workflows, and AI-powered features that transform how your business operates.",
    features: ["Custom Chatbots", "Process Automation", "AI Analytics", "Smart Recommendations"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code,
    title: "Web & App Development",
    description: "Modern, responsive websites and applications built with cutting-edge technologies like Next.js.",
    features: ["Next.js Development", "Mobile Apps", "E-commerce", "Progressive Web Apps"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "Creative Branding",
    description: "Stunning visual identities and content that capture your brand essence and engage your audience.",
    features: ["Logo Design", "Brand Guidelines", "Content Creation", "Marketing Materials"],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: GraduationCap,
    title: "AI Consulting",
    description: "Expert guidance on AI strategy, implementation, and training to maximize your technology investment.",
    features: ["AI Strategy", "Team Training", "Implementation Planning", "ROI Optimization"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Wrench,
    title: "Custom Software",
    description: "Tailored software solutions designed specifically for your unique business requirements.",
    features: ["Custom Applications", "API Development", "Database Design", "System Integration"],
    color: "from-indigo-500 to-blue-500",
  },
]

export function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  const ServiceIcon = services[currentIndex].icon

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We offer comprehensive digital solutions that combine the power of AI with exceptional design and
            development expertise.
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full glass-card border-0 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant="ghost"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Link href="/services">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="lg:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-card border-0">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${services[currentIndex].color} flex items-center justify-center mb-6`}
                    >
                      <ServiceIcon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{services[currentIndex].title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{services[currentIndex].description}</p>

                    <ul className="space-y-2 mb-8">
                      {services[currentIndex].features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button asChild variant="outline" className="w-full">
                      <Link href="/services">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <Button variant="outline" size="icon" onClick={prevSlide} className="glass-card">
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button variant="outline" size="icon" onClick={nextSlide} className="glass-card">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="gradient-primary text-white px-8">
            <Link href="/services">
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
