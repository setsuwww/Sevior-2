"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserService } from "@/_lib/services/user_service";
import AdminLayout from "@/_components/common/dashboard-layouts/AdminLayout";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { toast } from "sonner";
import { PlatformRole } from "@/types/User";

export default function CreateUserPage() {
  const router = useRouter();
  const userService = new UserService();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "CLIENT" as PlatformRole,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await userService.create(formData);
      if (res) {
        toast.success("User created successfully!");
        router.push("/dashboard/admin/users");
      } else {
        toast.error("Failed to create user. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred while creating user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
          <p className="text-gray-500 mt-1">Add a new user to the system.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input 
                id="full_name" name="full_name" required 
                placeholder="John Doe" 
                value={formData.full_name} onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" name="email" type="email" required 
                placeholder="john@example.com" 
                value={formData.email} onChange={handleChange} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" name="phone" 
                placeholder="+62 812-3456-7890" 
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

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="password">Temporary Password *</Label>
              <Input 
                id="password" name="password" type="password" required minLength={6}
                placeholder="Minimum 6 characters" 
                value={formData.password} onChange={handleChange} 
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700">
              {loading ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
