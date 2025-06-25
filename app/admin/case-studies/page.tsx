"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2, FolderOpen, ExternalLink } from "lucide-react"
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
import { supabase, type CaseStudy } from "@/lib/supabase"
import { toast } from "sonner"

const categories = ["AI Integration", "Web Development", "Branding", "Custom Software", "E-commerce", "Mobile App"]

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    category: "",
    technologies: [] as string[],
    image_url: "",
    project_url: "",
    is_featured: false,
    is_active: true,
  })

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setCaseStudies(data || [])
    } catch (error) {
      console.error("Error fetching case studies:", error)
      toast.error("Failed to fetch case studies")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCaseStudy) {
        const { error } = await supabase
          .from("case_studies")
          .update(formData)
          .eq("id", editingCaseStudy.id)

        if (error) throw error
        toast.success("Case study updated successfully")
      } else {
        const { error } = await supabase.from("case_studies").insert([formData])

        if (error) throw error
        toast.success("Case study created successfully")
      }

      setIsDialogOpen(false)
      setEditingCaseStudy(null)
      resetForm()
      fetchCaseStudies()
    } catch (error) {
      console.error("Error saving case study:", error)
      toast.error("Failed to save case study")
    }
  }

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCaseStudy(caseStudy)
    setFormData({
      title: caseStudy.title,
      description: caseStudy.description,
      client: caseStudy.client || "",
      category: caseStudy.category,
      technologies: caseStudy.technologies,
      image_url: caseStudy.image_url || "",
      project_url: caseStudy.project_url || "",
      is_featured: caseStudy.is_featured,
      is_active: caseStudy.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("case_studies").delete().eq("id", id)

      if (error) throw error
      toast.success("Case study deleted successfully")
      fetchCaseStudies()
    } catch (error) {
      console.error("Error deleting case study:", error)
      toast.error("Failed to delete case study")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      client: "",
      category: "",
      technologies: [],
      image_url: "",
      project_url: "",
      is_featured: false,
      is_active: true,
    })
  }

  const filteredCaseStudies = caseStudies.filter((caseStudy) =>
    caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseStudy.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseStudy.category.toLowerCase().includes(searchTerm.toLowerCase())
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Case Studies</h1>
            <p className="text-muted-foreground">Manage your portfolio projects and case studies</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingCaseStudy(null)
                resetForm()
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Case Study
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCaseStudy ? "Edit Case Study" : "Add New Case Study"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                    <Input
                      id="technologies"
                      value={formData.technologies.join(", ")}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(",").map(t => t.trim()).filter(t => t) })}
                      placeholder="React, Node.js, AI"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project_url">Project URL</Label>
                    <Input
                      id="project_url"
                      value={formData.project_url}
                      onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingCaseStudy ? "Update" : "Create"} Case Study
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search case studies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Case Studies Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredCaseStudies.map((caseStudy, index) => (
          <motion.div
            key={caseStudy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
          >
            <Card className="glass-card border-0 h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="w-5 h-5 text-primary" />
                    <Badge variant="outline">{caseStudy.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    {caseStudy.is_featured && <Badge variant="secondary">Featured</Badge>}
                    {!caseStudy.is_active && <Badge variant="destructive">Inactive</Badge>}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{caseStudy.title}</h3>
                {caseStudy.client && (
                  <p className="text-sm text-muted-foreground mb-3">Client: {caseStudy.client}</p>
                )}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{caseStudy.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {caseStudy.technologies.slice(0, 3).map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {caseStudy.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{caseStudy.technologies.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(caseStudy)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {caseStudy.project_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={caseStudy.project_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Case Study</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{caseStudy.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(caseStudy.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredCaseStudies.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No case studies found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms." : "Get started by creating your first case study."}
          </p>
        </motion.div>
      )}
    </div>
  )
} 