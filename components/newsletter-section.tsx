"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type NewsletterForm = z.infer<typeof newsletterSchema>

export function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterForm) => {
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("newsletter_subscribers").insert([{ email: data.email }])

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          toast.error("You are already subscribed to our newsletter!")
        } else {
          throw error
        }
      } else {
        setIsSubscribed(true)
        reset()
        toast.success("Successfully subscribed to our newsletter!")
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="glass-card border-0 overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Stay in the <span className="text-gradient">Loop</span>
                </h2>

                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get the latest insights on AI, web development trends, and exclusive tips delivered straight to your
                  inbox. Join our community of innovators!
                </p>

                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center space-x-2 text-green-600"
                  >
                    <CheckCircle className="w-6 h-6" />
                    <span className="text-lg font-medium">Thank you for subscribing!</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Input
                          {...register("email")}
                          type="email"
                          placeholder="Enter your email address"
                          className="glass-card border-white/20 h-12"
                          disabled={isSubmitting}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>}
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="gradient-primary text-white h-12 px-8 whitespace-nowrap"
                      >
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </div>
                  </form>
                )}

                <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
