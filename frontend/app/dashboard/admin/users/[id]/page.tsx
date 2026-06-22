"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { UserService } from "@/_lib/services/user_service";
import AdminLayout from "@/_components/common/dashboard-layouts/AdminLayout";
import { Button } from "@/_components/ui/button";
import { Badge } from "@/_components/ui/badge";
import { Avatar, AvatarFallback } from "@/_components/ui/avatar";
import { User } from "@/types/User";
import { ORG_ROLE_COLORS } from "@/_constants/user";
import { Mail, Phone, CalendarDays, KeyRound, Clock, Edit2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);
  const userService = new UserService();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    
    const fetchUser = async () => {
      try {
        const data = await userService.getById(userId);
        setUser(data);
      } catch (err) {
        toast.error("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]);

  const getInitials = (name: string) => {
    return name?.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) || "U";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <h2 className="text-xl font-bold text-gray-700">User not found</h2>
          <Button className="mt-4" onClick={() => router.push("/dashboard/admin/users")}>
            Back to Users
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button 
            onClick={() => router.push(`/dashboard/admin/users/${user.ID}/edit`)}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Edit2 className="mr-2 h-4 w-4" /> Edit User
          </Button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-teal-500 to-emerald-400"></div>
          
          <div className="px-8 pb-8 relative">
            <Avatar className="h-24 w-24 border-4 border-white absolute -top-12 bg-white shadow-sm">
              <AvatarFallback className="bg-teal-700 text-teal-50 text-3xl font-bold">
                {getInitials(user.FullName)}
              </AvatarFallback>
            </Avatar>
            
            <div className="pt-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.FullName}</h1>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  ID: {user.ID}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge className={`${ORG_ROLE_COLORS[user.Role as keyof typeof ORG_ROLE_COLORS]} font-medium px-4 py-1.5 text-sm`}>
                  {user.Role}
                </Badge>
                <Badge
                  variant="outline"
                  className={`${user.IsActive ? 'text-teal-700 bg-teal-50 border-teal-200' : 'text-red-700 bg-red-50 border-red-200'} font-medium px-4 py-1.5 text-sm flex items-center gap-2`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${user.IsActive ? 'bg-teal-400' : 'bg-red-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${user.IsActive ? 'bg-teal-500' : 'bg-red-500'}`}></span>
                  </span>
                  {user.IsActive ? "Active Account" : "Inactive Account"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-3">
              <KeyRound className="h-5 w-5 text-teal-600" /> Contact Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{user.Email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-900">{user.Phone || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 border-b pb-3">
              <CalendarDays className="h-5 w-5 text-teal-600" /> Account History
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <CalendarDays className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="font-medium text-gray-900">{formatDate(user.CreatedAt)}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium text-gray-900">{formatDate(user.UpdatedAt || user.CreatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
