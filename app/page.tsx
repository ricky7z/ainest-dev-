import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { HomepageNote } from "@/components/homepage-note"
import { ServicesCarousel } from "@/components/services-carousel"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CaseStudiesSection } from "@/components/case-studies-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <HomepageNote />
      </div>
      <ServicesCarousel />
      <TestimonialsSection />
      <CaseStudiesSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
