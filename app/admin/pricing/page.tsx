"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase, type PricingPlan } from "@/lib/supabase"
import { toast } from "sonner"

export default function AdminPricingPage() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    currency: "GHS",
    tier: "",
    billing_period: "monthly",
    features: "",
    is_popular: false,
    is_active: true,
  })

  useEffect(() => {
    fetchPricingPlans()
  }, [])

  const fetchPricingPlans = async () => {
    try {
      const { data, error } = await supabase.from("pricing_plans").select("*").order("price", { ascending: true })

      if (error) throw error
      setPricingPlans(data || [])
    } catch (error) {
      console.error("Error fetching pricing plans:", error)
      toast.error("Failed to fetch pricing plans")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const featuresArray = formData.features
        .split("\n")
        .map((feature) => feature.trim())
        .filter((feature) => feature.length > 0)

      const planData = {
        ...formData,
        features: featuresArray,
      }

      if (editingPlan) {
        const { error } = await supabase.from("pricing_plans").update(planData).eq("id", editingPlan.id)

        if (error) throw error
        toast.success("Pricing plan updated successfully!")
      } else {
        const { error } = await supabase.from("pricing_plans").insert([planData])

        if (error) throw error
        toast.success("Pricing plan created successfully!")
      }

      setIsDialogOpen(false)
      setEditingPlan(null)
      resetForm()
      fetchPricingPlans()
    } catch (error) {
      console.error("Error saving pricing plan:", error)
      toast.error("Failed to save pricing plan")
    }
  }

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan)
    setFormData({
      title: plan.title,
      price: plan.price,
      currency: plan.currency || "GHS",
      tier: plan.tier || "",
      billing_period: plan.billing_period,
      features: plan.features.join("\n"),
      is_popular: plan.is_popular,
      is_active: plan.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("pricing_plans").delete().eq("id", id)

      if (error) throw error

      setPricingPlans((prev) => prev.filter((plan) => plan.id !== id))
      toast.success("Pricing plan deleted successfully")
    } catch (error) {
      console.error("Error deleting pricing plan:", error)
      toast.error("Failed to delete pricing plan")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      price: 0,
      currency: "GHS",
      tier: "",
      billing_period: "monthly",
      features: "",
      is_popular: false,
      is_active: true,
    })
  }

  const filteredPlans = pricingPlans.filter(
    (plan) =>
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.tier?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Pricing Plans</h1>
          <p className="text-muted-foreground">Manage your service pricing and plans</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="gradient-primary text-white"
              onClick={() => {
                setEditingPlan(null)
                resetForm()
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPlan ? "Edit Pricing Plan" : "Create New Pricing Plan"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Plan Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tier">Tier</Label>
                  <Input
                    id="tier"
                    value={formData.tier}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tier: e.target.value }))}
                    placeholder="starter, pro, enterprise"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GHS">GHS (₵)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing_period">Billing Period</Label>
                  <Select
                    value={formData.billing_period}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, billing_period: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (one per line) *</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData((prev) => ({ ...prev, features: e.target.value }))}
                  rows={6}
                  placeholder="Basic Website Design&#10;Mobile Responsive&#10;5 Pages&#10;Contact Form"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_popular"
                    checked={formData.is_popular}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_popular: checked }))}
                  />
                  <Label htmlFor="is_popular">Popular plan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="gradient-primary text-white">
                  {editingPlan ? "Update" : "Create"} Plan
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center space-x-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search pricing plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Pricing Plans Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filteredPlans.length === 0 ? (
          <Card className="glass-card border-0">
            <CardContent className="text-center py-12">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No pricing plans found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search" : "Get started by creating your first pricing plan"}
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>Create New Plan</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`glass-card border-0 h-full hover:shadow-lg transition-all duration-300 ${
                    plan.is_popular ? "ring-2 ring-primary/20" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold">{plan.title}</h3>
                          {plan.is_popular && <Badge variant="default">Popular</Badge>}
                        </div>
                        <div className="text-3xl font-bold mb-1">
                          {plan.price === 0 ? (
                            "Custom"
                          ) : (
                            <>
                              {plan.currency === "GHS" ? "₵" : "$"}
                              {plan.price.toLocaleString()}
                            </>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {plan.billing_period === "custom" ? "Contact for pricing" : `per ${plan.billing_period}`}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(plan)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Pricing Plan</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the "{plan.title}" pricing plan? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(plan.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <Badge variant={plan.is_active ? "secondary" : "outline"}>
                        {plan.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">{plan.currency}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
