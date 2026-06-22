"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { UserService } from "@/_lib/services/user_service";
import { User, PlatformRole } from "@/types/User";
import UserHeader from "./user-header";
import UserTable from "./user-table";
import AdminLayout from "@/_components/common/dashboard-layouts/AdminLayout";
import { Card, CardContent } from "@/_components/ui/card";
import { Users as UsersIcon, UserCheck, UserX } from "lucide-react";
import { Button } from "@/_components/ui/button";

interface UserPageProps {
  role?: PlatformRole;
  title?: string;
  description?: string;
}

export default function UserPage({ role, title = "Users", description = "Manage all users in the system" }: UserPageProps) {
  const router = useRouter();
  const userService = new UserService();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Stats
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset page on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userService.getAll({
        page,
        limit,
        role,
        search: debouncedSearch || undefined,
      });
      
      let fetchedUsers = res.data;
      
      // Client-side status filtering if backend doesn't support it yet
      if (statusFilter !== "all") {
        const isActive = statusFilter === "active";
        fetchedUsers = fetchedUsers.filter(u => u.IsActive === isActive);
      }

      setUsers(fetchedUsers);
      setStats({
        total: res.meta.total || 0,
        active: res.meta.active || 0,
        inactive: res.meta.inactive || 0,
      });
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, role, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === users.length && users.length > 0) setSelectedIds([]);
    else setSelectedIds(users.map(u => u.ID));
  };

  const handleDeleteSelected = async () => {
    if (!confirm(`Delete ${selectedIds.length} selected users?`)) return;

    for (const id of selectedIds) {
      await userService.delete(id);
    }
    setSelectedIds([]);
    fetchUsers();
  };

  const handleDeleteAll = async () => {
    if (!confirm(`Delete all users in this view?`)) return;

    for (const user of users) {
      await userService.delete(user.ID);
    }
    setSelectedIds([]);
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this user?")) return;
    await userService.delete(id);
    fetchUsers();
  };

  const handleExport = () => {
    const dataToExport = selectedIds.length > 0
      ? users.filter(u => selectedIds.includes(u.ID))
      : users;

    console.log("Exporting:", dataToExport);
  };

  const statusOptions = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-10xl mx-auto space-y-6">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
                <UsersIcon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                <UserCheck size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Active Users</p>
                <h3 className="text-2xl font-bold">{stats.active}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                <UserX size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Inactive Users</p>
                <h3 className="text-2xl font-bold">{stats.inactive}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <UserHeader 
          title={title}
          description={description}
          selectedCount={selectedIds.length} 
          totalCount={stats.total}
          onSearch={setSearchQuery}
          statusOptions={statusOptions} 
          statusFilter={statusFilter} 
          onFilterStatus={setStatusFilter}
          onExport={handleExport} 
          onDeleteSelected={handleDeleteSelected} 
          onDeleteAll={handleDeleteAll}
          onAddUser={() => router.push("/dashboard/admin/users/create")}
        />

        <UserTable
          users={users} selectedIds={selectedIds} loading={loading}
          onToggleSelect={toggleSelect} onToggleSelectAll={toggleSelectAll}
          onDelete={handleDelete}
        />

        {/* Pagination Controls */}
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-gray-500">
            Showing {users.length} users. Total: {stats.total}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1 || loading}
              onClick={() => setPage(p => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={users.length < limit || loading}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
