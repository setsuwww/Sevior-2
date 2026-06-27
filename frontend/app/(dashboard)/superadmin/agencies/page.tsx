"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Filter, MoreVertical, ShieldAlert, Building2 } from "lucide-react";
import { superadminAgenciesService, Agency } from "@/_lib/services/superadmin/agencies.service";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/_components/ui/dropdown-menu";

export default function SuperAdminAgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchAgencies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await superadminAgenciesService.getAll({
        page,
        limit: 10,
        search
      });
      setAgencies(res.data || []);
      setTotal(res.total || 0);
    } catch (error) {
      console.error("Failed to fetch agencies", error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchAgencies();
  }, [fetchAgencies]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchAgencies();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Registered Agencies
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform tenants, subscriptions, and their owners.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-sm">
            Onboard Agency
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <form onSubmit={handleSearch} className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search by agency name, owner, or email..." 
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
                <TableHead className="font-semibold text-gray-600">Agency & Owner</TableHead>
                <TableHead className="font-semibold text-gray-600">Subscription</TableHead>
                <TableHead className="font-semibold text-gray-600">Users</TableHead>
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
              ) : agencies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 space-y-2">
                      <Building2 className="w-8 h-8 text-gray-300" />
                      <p className="font-medium text-sm">No agencies found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                agencies.map((a) => (
                  <TableRow key={a.id} className="group border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gray-100 to-gray-50 flex items-center justify-center border border-gray-200 group-hover:border-teal-300 transition-colors">
                          <Building2 className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{a.name}</p>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">
                            {a.owner ? `${a.owner.full_name} (${a.owner.email})` : 'No Owner'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {a.subscription ? (
                        <div>
                          <p className="text-sm font-bold text-gray-700">{a.subscription.plan}</p>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            a.subscription.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {a.subscription.status}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Free / No Sub</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <UsersBadge count={12} type="Developer" />
                        <UsersBadge count={45} type="Client" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${a.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs font-semibold text-gray-700">{a.is_active ? 'Active' : 'Suspended'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl border-gray-200">
                          <DropdownMenuItem className="cursor-pointer font-medium text-gray-700 focus:bg-teal-50 focus:text-teal-700">
                            View Agency Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer font-medium text-gray-700 focus:bg-teal-50 focus:text-teal-700">
                            Manage Projects
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {a.is_active ? (
                            <DropdownMenuItem className="cursor-pointer font-medium text-yellow-600 focus:bg-yellow-50 focus:text-yellow-700">Suspend Agency</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="cursor-pointer font-medium text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700">Activate Agency</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="cursor-pointer font-medium text-red-600 focus:bg-red-50 focus:text-red-700">Delete Agency</DropdownMenuItem>
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
        {!loading && agencies.length > 0 && (
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

function UsersBadge({ count, type }: { count: number, type: string }) {
  return (
    <div className="flex flex-col items-center px-2 py-1 rounded bg-gray-50 border border-gray-100">
      <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider leading-none mb-0.5">{type}</span>
      <span className="text-xs font-bold text-gray-700 leading-none">{count}</span>
    </div>
  );
}
