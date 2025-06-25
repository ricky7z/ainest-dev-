"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit, Trash2, Shield, Users, Mail, Phone, Calendar, Eye, EyeOff, Crown } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase, type AdminUser, type AdminRole } from "@/lib/supabase"
import { toast } from "sonner"
import bcrypt from 'bcryptjs'

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [roles, setRoles] = useState<AdminRole[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    role_id: "",
    is_active: true,
    is_super_admin: false,
  })

  useEffect(() => {
    fetchAdmins()
    fetchRoles()
  }, [])

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select(`
          *,
          role:admin_roles(name, description)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error
      setAdmins(data || [])
    } catch (error) {
      console.error("Error fetching admins:", error)
      toast.error("Failed to fetch admins")
    } finally {
      setLoading(false)
    }
  }

  const fetchRoles = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_roles")
        .select("*")
        .eq("is_active", true)
        .order("name")

      if (error) throw error
      setRoles(data || [])
    } catch (error) {
      console.error("Error fetching roles:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingAdmin) {
        const updateData: any = {
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          role_id: formData.role_id,
          is_active: formData.is_active,
          is_super_admin: formData.is_super_admin,
        }
        // Only update password if provided
        if (formData.password) {
          updateData.password_hash = await bcrypt.hash(formData.password, 10)
        }
        const { error } = await supabase
          .from('admin_users')
          .update(updateData)
          .eq('id', editingAdmin.id)
        if (error) throw error
        toast.success('Admin updated successfully')
      } else {
        const password_hash = await bcrypt.hash(formData.password, 10)
        const { error } = await supabase.from('admin_users').insert([
          {
            email: formData.email,
            password_hash,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            role_id: formData.role_id,
            is_active: formData.is_active,
            is_super_admin: formData.is_super_admin,
          },
        ])
        if (error) throw error
        toast.success('Admin created successfully')
      }
      setIsDialogOpen(false)
      setEditingAdmin(null)
      resetForm()
      fetchAdmins()
    } catch (error) {
      console.error('Error saving admin:', error)
      toast.error('Failed to save admin')
    }
  }

  const handleEdit = (admin: AdminUser) => {
    setEditingAdmin(admin)
    setFormData({
      email: admin.email,
      password: "",
      first_name: admin.first_name || "",
      last_name: admin.last_name || "",
      phone: admin.phone || "",
      role_id: admin.role_id || "",
      is_active: admin.is_active,
      is_super_admin: admin.is_super_admin,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("admin_users").delete().eq("id", id)

      if (error) throw error
      toast.success("Admin deleted successfully")
      fetchAdmins()
    } catch (error) {
      console.error("Error deleting admin:", error)
      toast.error("Failed to delete admin")
    }
  }

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
      role_id: "",
      is_active: true,
      is_super_admin: false,
    })
    setShowPassword(false)
  }

  const filteredAdmins = admins.filter((admin) =>
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Management</h1>
            <p className="text-muted-foreground">Create and manage admin users and their roles</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingAdmin(null)
                resetForm()
              }} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingAdmin ? "Edit Admin" : "Add New Admin"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name *</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    {editingAdmin ? "New Password (leave blank to keep current)" : "Password *"}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required={!editingAdmin}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={formData.role_id} onValueChange={(value) => setFormData({ ...formData, role_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_super_admin"
                      checked={formData.is_super_admin}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_super_admin: checked })}
                    />
                    <Label htmlFor="is_super_admin">Super Admin</Label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto">
                    {editingAdmin ? "Update" : "Create"} Admin
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
            placeholder="Search admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Admins Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredAdmins.map((admin, index) => (
          <motion.div
            key={admin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
          >
            <Card className="glass-card border-0 h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    {admin.is_super_admin && <Crown className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {admin.is_active ? (
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">Inactive</Badge>
                    )}
                    {admin.is_super_admin && (
                      <Badge variant="default" className="text-xs bg-yellow-500">Super Admin</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="text-lg font-semibold">
                    {admin.first_name} {admin.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {admin.email}
                  </p>
                  {admin.phone && (
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {admin.phone}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Joined {new Date(admin.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Role:</span>
                    <Badge variant="outline" className="text-xs">
                      {admin.role?.name || "No Role"}
                    </Badge>
                  </div>
                  {admin.role?.description && (
                    <p className="text-xs text-muted-foreground">{admin.role.description}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(admin)}
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
                        <AlertDialogTitle>Delete Admin</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{admin.first_name} {admin.last_name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(admin.id)}>
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

      {filteredAdmins.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No admins found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms." : "Get started by creating your first admin user."}
          </p>
        </motion.div>
      )}
    </div>
  )
} 