"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, Star, Zap, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase, type PricingPlan, type AddOn } from "@/lib/supabase"
import { useCurrency } from "@/contexts/currency-context"
import { formatPrice, convertPrice } from "@/lib/currency"

// Fallback pricing data
const fallbackPricing: PricingPlan[] = [
  {
    id: "fallback-1",
    title: "Starter",
    price: 1188,
    currency: "GHS",
    tier: "starter",
    billing_period: "monthly",
    features: ["Basic Website Design", "Mobile Responsive", "5 Pages", "Contact Form", "Basic SEO", "1 Month Support"],
    is_popular: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    title: "Pro",
    price: 2988,
    currency: "GHS",
    tier: "pro",
    billing_period: "monthly",
    features: [
      "Advanced Website Design",
      "Mobile Responsive",
      "10 Pages",
      "Contact Form",
      "Advanced SEO",
      "AI Chatbot Integration",
      "Analytics Dashboard",
      "3 Months Support",
      "Content Management",
    ],
    is_popular: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    title: "Enterprise",
    price: 0,
    currency: "GHS",
    tier: "enterprise",
    billing_period: "custom",
    features: [
      "Custom Solution",
      "Unlimited Pages",
      "Advanced AI Features",
      "Custom Integrations",
      "Priority Support",
      "Dedicated Account Manager",
      "12 Months Support",
      "Training & Consultation",
    ],
    is_popular: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function PricingPage() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([])
  const [addOns, setAddOns] = useState<AddOn[]>([])
  const [isYearly, setIsYearly] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedAddon, setSelectedAddon] = useState<string>("")
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  const { currency } = useCurrency()
  const router = useRouter()

  useEffect(() => {
    fetchPricingData()
  }, [])

  const fetchPricingData = async () => {
    try {
      setError(null)
      const [plansResponse, addOnsResponse] = await Promise.all([
        supabase
          .from("pricing_plans")
          .select("*")
          .eq("is_active", true)
          .eq("currency", currency)
          .order("price", { ascending: true }),
        supabase.from("add_ons").select("*").eq("is_active", true).order("price_ghs", { ascending: true }),
      ])

      if (plansResponse.error) throw plansResponse.error
      if (addOnsResponse.error) throw addOnsResponse.error

      const plans = plansResponse.data || []

      // If no plans found for current currency, use fallback and convert
      if (plans.length === 0) {
        const convertedPlans = fallbackPricing.map((plan) => ({
          ...plan,
          price: convertPrice(plan.price, plan.currency, currency),
          currency,
        }))
        setPricingPlans(convertedPlans)
      } else {
        setPricingPlans(plans)
      }

      setAddOns(addOnsResponse.data || [])
    } catch (error) {
      console.error("Error fetching pricing data:", error)
      setError("Failed to load pricing data. Showing default pricing.")

      // Use fallback data with currency conversion
      const convertedPlans = fallbackPricing.map((plan) => ({
        ...plan,
        price: convertPrice(plan.price, plan.currency, currency),
        currency,
      }))
      setPricingPlans(convertedPlans)
    } finally {
      setLoading(false)
    }
  }

  // Refetch when currency changes
  useEffect(() => {
    if (!loading) {
      fetchPricingData()
    }
  }, [currency])

  const getDisplayPrice = (plan: PricingPlan) => {
    if (plan.price === 0) return "Custom"

    let price = plan.price
    if (isYearly && price > 0) {
      price = price * 10 // 2 months free on yearly
    }

    return formatPrice(price, currency)
  }

  const getAddOnPrice = (addOn: AddOn) => {
    const price = currency === "GHS" ? addOn.price_ghs : addOn.price_usd
    return formatPrice(price, currency)
  }

  const handleAddonSelection = (addonId: string) => {
    setSelectedAddon(addonId)
  }

  const handlePackageSelection = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const redirectToContact = () => {
    const params = new URLSearchParams()
    if (selectedAddon) {
      params.append('addon', selectedAddon)
    }
    if (selectedPackage) {
      params.append('package', selectedPackage)
    }
    router.push(`/contact?${params.toString()}`)
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-muted rounded w-96 mx-auto" />
                <div className="h-6 bg-muted rounded w-[600px] mx-auto" />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-96 bg-muted rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

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
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Choose the perfect plan for your business needs. All plans include our core features with no hidden fees
              or surprises.
            </p>

            {/* Error Alert */}
            {error && (
              <Alert className="max-w-2xl mx-auto mb-8">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm ${!isYearly ? "text-primary font-medium" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-primary" />
              <span className={`text-sm ${isYearly ? "text-primary font-medium" : "text-muted-foreground"}`}>
                Yearly
              </span>
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${plan.is_popular ? "scale-105" : ""}`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-primary text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card
                  className={`glass-card border-0 h-full ${
                    plan.is_popular ? "ring-2 ring-primary/20 shadow-2xl" : "hover:shadow-xl"
                  } transition-all duration-300`}
                >
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold mb-2">{plan.title}</CardTitle>
                    <div className="mb-4">
                      <div className="text-4xl font-bold">
                        {getDisplayPrice(plan)}
                        {plan.billing_period !== "custom" && (
                          <span className="text-lg font-normal text-muted-foreground">
                            /{isYearly ? "year" : "month"}
                          </span>
                        )}
                      </div>
                      {isYearly && plan.price > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {formatPrice(plan.price, currency)}/month billed annually
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      className={`w-full ${
                        plan.is_popular
                          ? "gradient-primary text-white"
                          : "glass-card hover:bg-primary hover:text-primary-foreground"
                      }`}
                      size="lg"
                    >
                      <Link href="/contact">
                        {plan.billing_period === "custom" ? "Contact Sales" : "Get Started"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      {addOns.length > 0 && (
        <section className="py-24 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Powerful <span className="text-gradient">Add-ons</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Enhance your plan with additional features and services tailored to your specific needs.
              </p>
            </motion.div>

            {/* Package and Addon Selection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="glass-card border-0 max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-center">Select Your Options</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Choose Package</label>
                      <Select value={selectedPackage} onValueChange={handlePackageSelection}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a package" />
                        </SelectTrigger>
                        <SelectContent>
                          {pricingPlans.map((plan) => (
                            <SelectItem key={plan.id} value={plan.id}>
                              {plan.title} - {getDisplayPrice(plan)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Choose Add-on</label>
                      <Select value={selectedAddon} onValueChange={handleAddonSelection}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an add-on" />
                        </SelectTrigger>
                        <SelectContent>
                          {addOns.map((addon) => (
                            <SelectItem key={addon.id} value={addon.id}>
                              {addon.name} - {getAddOnPrice(addon)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={redirectToContact}
                      disabled={!selectedAddon || !selectedPackage}
                      className="w-full gradient-primary text-white"
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {addOns.map((addOn, index) => (
                <motion.div
                  key={addOn.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card border-0 h-full hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{addOn.name}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{addOn.description}</p>
                        </div>
                        <Zap className="w-6 h-6 text-primary flex-shrink-0" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{getAddOnPrice(addOn)}</div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="glass-card"
                          onClick={() => {
                            setSelectedAddon(addOn.id)
                            setSelectedPackage(pricingPlans[0]?.id || "")
                            setTimeout(() => redirectToContact(), 100)
                          }}
                        >
                          Add to Plan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Pricing <span className="text-gradient">FAQ</span>
            </h2>
            <p className="text-lg text-muted-foreground">Common questions about our pricing and plans.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                  prorate any billing differences.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, bank transfers, and mobile money payments for Ghana-based clients.
                  International clients can pay via credit card or wire transfer.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Is there a setup fee?</h3>
                <p className="text-muted-foreground">
                  No setup fees for our standard plans. Custom enterprise solutions may include implementation fees
                  depending on complexity, which will be discussed during consultation.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">What's included in support?</h3>
                <p className="text-muted-foreground">
                  All plans include email support, bug fixes, and security updates. Pro and Enterprise plans include
                  priority support, phone consultations, and dedicated account management.
                </p>
              </CardContent>
            </Card>
          </motion.div>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose your plan and start building smarter, better digital solutions today. Need a custom solution? Let's
              talk!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-white px-8">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass-card px-8">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
