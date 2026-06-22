"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { UserService } from "@/_lib/services/user_service";
import AdminLayout from "@/_components/common/dashboard-layouts/AdminLayout";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { toast } from "sonner";
import { PlatformRole } from "@/types/User";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);
  const userService = new UserService();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "CLIENT" as PlatformRole,
    isActive: true,
    password: "", // Optional for update
  });

  useEffect(() => {
    if (!userId) return;
    
    const fetchUser = async () => {
      try {
        const user = await userService.getById(userId);
        if (user) {
          setFormData({
            full_name: user.FullName,
            email: user.Email,
            phone: user.Phone || "",
            role: user.Role,
            isActive: user.IsActive,
            password: "",
          });
        }
      } catch (err) {
        toast.error("Failed to load user data.");
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create payload. Only include password if it was filled out.
      const payload: any = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        isActive: formData.isActive,
      };
      
      if (formData.password.trim() !== "") {
        payload.password = formData.password;
      }
      
      const res = await userService.update(userId, payload);
      if (res) {
        toast.success("User updated successfully!");
        router.push("/dashboard/admin/users");
      } else {
        toast.error("Failed to update user. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred while updating user.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
          <p className="text-gray-500 mt-1">Update user information and access.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input 
                id="full_name" name="full_name" required 
                value={formData.full_name} onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" name="email" type="email" required 
                value={formData.email} onChange={handleChange} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" name="phone" 
                value={formData.phone} onChange={handleChange} 
              />
            </div>

            <div className="space-y-2">
              <Label>Role *</Label>
              <Select 
                value={formData.role} 
                onValueChange={(val: PlatformRole) => setFormData({ ...formData, role: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="DEVELOPER">Developer</SelectItem>
                  <SelectItem value="CLIENT">Client</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Account Status</Label>
              <Select 
                value={formData.isActive ? "true" : "false"} 
                onValueChange={(val) => setFormData({ ...formData, isActive: val === "true" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Change Password</Label>
              <Input 
                id="password" name="password" type="password" 
                placeholder="Leave blank to keep current" minLength={6}
                value={formData.password} onChange={handleChange} 
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
