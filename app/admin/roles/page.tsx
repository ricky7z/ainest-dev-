"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2, Shield, Users, Settings, Eye, EyeOff } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { supabase, type AdminRole, type AdminPermission } from "@/lib/supabase"
import { toast } from "sonner"

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

const AVAILABLE_PERMISSIONS: Permission[] = [
  // Dashboard
  { id: 'dashboard_view', name: 'View Dashboard', description: 'Access to admin dashboard', category: 'Dashboard' },
  
  // Content Management
  { id: 'blog_manage', name: 'Manage Blog', description: 'Create, edit, and delete blog posts', category: 'Content' },
  { id: 'testimonials_manage', name: 'Manage Testimonials', description: 'Manage client testimonials', category: 'Content' },
  { id: 'case_studies_manage', name: 'Manage Case Studies', description: 'Manage project case studies', category: 'Content' },
  { id: 'team_manage', name: 'Manage Team', description: 'Manage team member profiles', category: 'Content' },
  
  // Communication
  { id: 'contacts_view', name: 'View Contacts', description: 'View contact submissions', category: 'Communication' },
  { id: 'contacts_manage', name: 'Manage Contacts', description: 'Update contact status and respond', category: 'Communication' },
  { id: 'chat_manage', name: 'Manage Chat', description: 'Respond to visitor chat messages', category: 'Communication' },
  
  // Analytics & Stats
  { id: 'stats_view', name: 'View Statistics', description: 'View site statistics', category: 'Analytics' },
  { id: 'stats_manage', name: 'Manage Statistics', description: 'Update homepage statistics', category: 'Analytics' },
  
  // Admin Management (Super Admin Only)
  { id: 'admins_manage', name: 'Manage Admins', description: 'Create and manage admin users', category: 'Admin' },
  { id: 'roles_manage', name: 'Manage Roles', description: 'Create and manage roles', category: 'Admin' },
  { id: 'work_tracking_view', name: 'View Work Tracking', description: 'View admin work sessions', category: 'Admin' },
  { id: 'work_tracking_manage', name: 'Manage Work Tracking', description: 'Manage work sessions and pay', category: 'Admin' },
  
  // Settings
  { id: 'settings_view', name: 'View Settings', description: 'View system settings', category: 'Settings' },
  { id: 'settings_manage', name: 'Manage Settings', description: 'Update system settings', category: 'Settings' },
]

export default function RolesPage() {
  const [roles, setRoles] = useState<AdminRole[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<AdminRole | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
    is_active: true,
  })

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_roles")
        .select("*")
        .order("name")

      if (error) throw error
      setRoles(data || [])
    } catch (error) {
      console.error("Error fetching roles:", error)
      toast.error("Failed to fetch roles")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingRole) {
        const { error } = await supabase
          .from("admin_roles")
          .update({
            name: formData.name,
            description: formData.description,
            permissions: formData.permissions,
            is_active: formData.is_active,
          })
          .eq("id", editingRole.id)

        if (error) throw error
        toast.success("Role updated successfully")
      } else {
        const { error } = await supabase.from("admin_roles").insert([
          {
            name: formData.name,
            description: formData.description,
            permissions: formData.permissions,
            is_active: formData.is_active,
          },
        ])

        if (error) throw error
        toast.success("Role created successfully")
      }

      setIsDialogOpen(false)
      setEditingRole(null)
      resetForm()
      fetchRoles()
    } catch (error) {
      console.error("Error saving role:", error)
      toast.error("Failed to save role")
    }
  }

  const handleEdit = (role: AdminRole) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions || [],
      is_active: role.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("admin_roles").delete().eq("id", id)

      if (error) throw error
      toast.success("Role deleted successfully")
      fetchRoles()
    } catch (error) {
      console.error("Error deleting role:", error)
      toast.error("Failed to delete role")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      permissions: [],
      is_active: true,
    })
  }

  const handlePermissionToggle = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const groupedPermissions = AVAILABLE_PERMISSIONS.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Roles & Permissions</h1>
            <p className="text-muted-foreground">Manage admin roles and their access permissions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingRole(null)
                resetForm()
              }} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingRole ? "Edit Role" : "Add New Role"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Role Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Permissions</Label>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {Object.entries(groupedPermissions).map(([category, permissions]) => (
                      <div key={category} className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">{category}</h4>
                        <div className="space-y-2">
                          {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={permission.id}
                                checked={formData.permissions.includes(permission.id)}
                                onCheckedChange={() => handlePermissionToggle(permission.id)}
                              />
                              <Label htmlFor={permission.id} className="text-sm cursor-pointer">
                                <div className="font-medium">{permission.name}</div>
                                <div className="text-muted-foreground">{permission.description}</div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto">
                    {editingRole ? "Update" : "Create"} Role
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
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Roles Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredRoles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
          >
            <Card className="glass-card border-0 h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <Badge variant="outline" className="text-xs">{role.name}</Badge>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {role.is_active ? (
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">Inactive</Badge>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{role.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Permissions:</span>
                    <span className="font-medium">{role.permissions?.length || 0}</span>
                  </div>
                  {role.permissions && role.permissions.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {role.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(role)}
                      className="h-8 px-2"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 px-2">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Role</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{role.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(role.id)}>
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

      {filteredRoles.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No roles found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms." : "Get started by creating your first role."}
          </p>
        </motion.div>
      )}
    </div>
  )
} 