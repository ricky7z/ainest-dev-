"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, Clock, MapPin, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase, type PricingPlan, type AddOn } from "@/lib/supabase"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

interface ContactFormProps {
  className?: string
}

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  selectedPackage: z.string().optional(),
  selectedAddon: z.string().optional()
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm({ className }: ContactFormProps) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      budget: "",
      message: "",
      selectedPackage: "",
      selectedAddon: ""
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([])
  const [addOns, setAddOns] = useState<AddOn[]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchPricingData()
    
    const addon = searchParams.get('addon')
    const packageParam = searchParams.get('package')
    
    if (addon || packageParam) {
      form.setValue('selectedAddon', addon || "")
      form.setValue('selectedPackage', packageParam || "")
    }
  }, [searchParams, form])

  const fetchPricingData = async () => {
    try {
      const [plansResponse, addonsResponse] = await Promise.all([
        supabase.from('pricing_plans').select('*').eq('is_active', true),
        supabase.from('add_ons').select('*').eq('is_active', true)
      ])

      if (plansResponse.error) throw plansResponse.error
      if (addonsResponse.error) throw addonsResponse.error

      setPricingPlans(plansResponse.data || [])
      setAddOns(addonsResponse.data || [])
    } catch (error) {
      console.error('Error fetching pricing data:', error)
      toast.error('Failed to load pricing options')
    }
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          budget: data.budget,
          message: data.message,
          selected_package: data.selectedPackage,
          selected_addon: data.selectedAddon,
          status: "new",
        },
      ])

      if (error) throw error

      setIsSuccess(true)
      form.reset()
      toast.success("Message sent successfully! We'll get back to you soon.")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-2xl mx-auto ${className}`}
      >
        <Card className="glass-card border-0 text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              variant="outline"
              className="glass-card"
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl mx-auto ${className}`}
    >
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Get in Touch</CardTitle>
          <p className="text-muted-foreground text-center">
            Ready to start your project? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {pricingPlans.length > 0 && (
                <FormField
                  control={form.control}
                  name="selectedPackage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Selection</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a package (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {pricingPlans.map((plan) => (
                            <SelectItem key={plan.id} value={plan.id}>
                              {plan.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {addOns.length > 0 && (
                <FormField
                  control={form.control}
                  name="selectedAddon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add-on Selection</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an add-on (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {addOns.map((addon) => (
                            <SelectItem key={addon.id} value={addon.id}>
                              {addon.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Under $1,000">Under $1,000</SelectItem>
                        <SelectItem value="$1,000 - $5,000">$1,000 - $5,000</SelectItem>
                        <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="$10,000 - $25,000">$10,000 - $25,000</SelectItem>
                        <SelectItem value="$25,000+">$25,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Details *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your project, requirements, timeline, and any specific features you need..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-primary text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-8 pt-8 border-t">
            <h4 className="font-semibold mb-4">Other Ways to Reach Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+233(0)554305658</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Response Time</p>
                  <p className="text-sm text-muted-foreground">Within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Accra, Ghana</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 