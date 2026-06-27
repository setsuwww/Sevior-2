"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Search, Filter, MoreVertical, ShieldAlert } from "lucide-react";
import { superadminUsersService, User } from "@/_lib/services/superadmin/users.service";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu";

export default function SuperAdminUsersPage() {
  const params = useParams();
  const roleParam = params.role?.[0]?.toUpperCase() || "ALL";

  // State
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      // Map URL params to DB roles
      let queryRole = roleParam;
      if (roleParam === "SUPERADMINS") queryRole = "SUPER_ADMIN";
      else if (roleParam === "CLIENTS") queryRole = "CLIENT";
      else if (roleParam === "DEVELOPERS") queryRole = "DEVELOPER";

      const res = await superadminUsersService.getAll({
        page,
        limit: 10,
        search,
        role: queryRole !== "ALL" && queryRole !== "AGENCIES" ? queryRole : undefined
      });
      setUsers(res.data || []);
      setTotal(res.total || 0);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, roleParam]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN": return "bg-red-50 text-red-700 border-red-200";
      case "ADMIN": return "bg-purple-50 text-purple-700 border-purple-200";
      case "DEVELOPER": return "bg-blue-50 text-blue-700 border-blue-200";
      case "CLIENT": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {roleParam === "ALL" ? "All Users" : roleParam}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage user accounts and permissions.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-sm">
            Add User
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-gray-200 rounded-xl focus-visible:ring-teal-500"
            />
          </form>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Button variant="outline" className="rounded-xl border-gray-200 text-gray-600 w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow className="border-gray-100 hover:bg-transparent">
                <TableHead className="font-semibold text-gray-600">User</TableHead>
                <TableHead className="font-semibold text-gray-600">Agency</TableHead>
                <TableHead className="font-semibold text-gray-600">Role</TableHead>
                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                <TableHead className="font-semibold text-gray-600 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-500 font-medium">Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 space-y-2">
                      <ShieldAlert className="w-8 h-8 text-gray-300" />
                      <p className="font-medium text-sm">No users found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((u) => (
                  <TableRow key={u.id} className="group border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm border border-teal-100">
                          {u.full_name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{u.full_name}</p>
                          <p className="text-xs text-gray-500 font-medium">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-gray-600">
                        {u.agency?.name || "Independent"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${getRoleBadgeColor(u.role)}`}>
                        {u.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${u.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs font-semibold text-gray-700">{u.is_active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl border-gray-200">
                          <DropdownMenuItem className="cursor-pointer font-medium text-gray-700 focus:bg-teal-50 focus:text-teal-700">View Detail</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer font-medium text-gray-700 focus:bg-teal-50 focus:text-teal-700">Edit User</DropdownMenuItem>
                          {u.is_active ? (
                            <DropdownMenuItem className="cursor-pointer font-medium text-red-600 focus:bg-red-50 focus:text-red-700">Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="cursor-pointer font-medium text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700">Activate</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!loading && users.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
            <p className="text-xs font-medium text-gray-500">
              Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} results
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-lg"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-lg"
                disabled={page * 10 >= total}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
