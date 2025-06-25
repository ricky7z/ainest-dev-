"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2, BarChart3, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Switch } from "@/components/ui/switch"
import { supabase, type SiteStat } from "@/lib/supabase"
import { toast } from "sonner"

export default function StatsPage() {
  const [stats, setStats] = useState<SiteStat[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStat, setEditingStat] = useState<SiteStat | null>(null)
  const [formData, setFormData] = useState({
    stat_key: "",
    stat_value: "",
    stat_label: "",
    is_active: true,
    sort_order: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from("site_stats")
        .select("*")
        .order("sort_order", { ascending: true })

      if (error) throw error
      setStats(data || [])
    } catch (error) {
      console.error("Error fetching stats:", error)
      toast.error("Failed to fetch stats")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingStat) {
        const { error } = await supabase
          .from("site_stats")
          .update(formData)
          .eq("id", editingStat.id)

        if (error) throw error
        toast.success("Stat updated successfully")
      } else {
        const { error } = await supabase.from("site_stats").insert([formData])

        if (error) throw error
        toast.success("Stat created successfully")
      }

      setIsDialogOpen(false)
      setEditingStat(null)
      resetForm()
      fetchStats()
    } catch (error) {
      console.error("Error saving stat:", error)
      toast.error("Failed to save stat")
    }
  }

  const handleEdit = (stat: SiteStat) => {
    setEditingStat(stat)
    setFormData({
      stat_key: stat.stat_key,
      stat_value: stat.stat_value,
      stat_label: stat.stat_label,
      is_active: stat.is_active,
      sort_order: stat.sort_order,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("site_stats").delete().eq("id", id)

      if (error) throw error
      toast.success("Stat deleted successfully")
      fetchStats()
    } catch (error) {
      console.error("Error deleting stat:", error)
      toast.error("Failed to delete stat")
    }
  }

  const handleToggleActive = async (stat: SiteStat) => {
    try {
      const { error } = await supabase
        .from("site_stats")
        .update({ is_active: !stat.is_active })
        .eq("id", stat.id)

      if (error) throw error
      toast.success(`Stat ${!stat.is_active ? "activated" : "deactivated"} successfully`)
      fetchStats()
    } catch (error) {
      console.error("Error toggling stat:", error)
      toast.error("Failed to update stat")
    }
  }

  const resetForm = () => {
    setFormData({
      stat_key: "",
      stat_value: "",
      stat_label: "",
      is_active: true,
      sort_order: 0,
    })
  }

  const filteredStats = stats.filter((stat) =>
    stat.stat_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stat.stat_label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stat.stat_value.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-xl" />
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
            <h1 className="text-3xl font-bold mb-2">Site Statistics</h1>
            <p className="text-muted-foreground">Manage homepage statistics and metrics</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingStat(null)
                resetForm()
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Stat
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingStat ? "Edit Stat" : "Add New Stat"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stat_key">Stat Key *</Label>
                  <Input
                    id="stat_key"
                    value={formData.stat_key}
                    onChange={(e) => setFormData({ ...formData, stat_key: e.target.value })}
                    placeholder="projects_completed"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stat_value">Value *</Label>
                  <Input
                    id="stat_value"
                    value={formData.stat_value}
                    onChange={(e) => setFormData({ ...formData, stat_value: e.target.value })}
                    placeholder="50+"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stat_label">Label *</Label>
                  <Input
                    id="stat_label"
                    value={formData.stat_label}
                    onChange={(e) => setFormData({ ...formData, stat_label: e.target.value })}
                    placeholder="Projects Completed"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Sort Order</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingStat ? "Update" : "Create"} Stat
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
            placeholder="Search stats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredStats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
          >
            <Card className="glass-card border-0 h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <Badge variant="outline">#{stat.sort_order}</Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.is_active ? (
                      <Badge variant="secondary">Active</Badge>
                    ) : (
                      <Badge variant="destructive">Inactive</Badge>
                    )}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gradient mb-2">{stat.stat_value}</div>
                  <div className="text-sm text-muted-foreground">{stat.stat_label}</div>
                </div>

                <div className="text-xs text-muted-foreground mb-4">
                  <p><strong>Key:</strong> {stat.stat_key}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(stat)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(stat)}
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Stat</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{stat.stat_label}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(stat.id)}>
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

      {filteredStats.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No stats found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms." : "Get started by creating your first stat."}
          </p>
        </motion.div>
      )}

      {/* Preview Section */}
      {stats.filter(s => s.is_active).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Homepage Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats
                  .filter(s => s.is_active)
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((stat, index) => (
                    <div key={stat.id} className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-gradient">{stat.stat_value}</div>
                      <div className="text-sm text-muted-foreground mt-1">{stat.stat_label}</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
} 