"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Filter, FolderKanban, Calendar } from "lucide-react";
import { superadminProjectsService, Project } from "@/_lib/services/superadmin/projects.service";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/ui/table";

export default function SuperAdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await superadminProjectsService.getAll({
        page,
        limit: 10,
        search
      });
      setProjects(res.data || []);
      setTotal(res.total || 0);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProjects();
  };

  const getStatusBadgeColor = (status: string) => {
    switch(status.toUpperCase()) {
      case "COMPLETED": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "IN_PROGRESS": return "bg-blue-50 text-blue-700 border-blue-200";
      case "PENDING": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "CANCELLED": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Global Projects
          </h1>
          <p className="text-sm text-gray-500 mt-1">Monitor all projects running across all agencies on the platform.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <form onSubmit={handleSearch} className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search by project name, agency, or client..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-gray-200 rounded-xl focus-visible:ring-teal-500" 
            />
          </form>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Button variant="outline" className="rounded-xl border-gray-200 text-gray-600 w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter Status
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow className="border-gray-100 hover:bg-transparent">
                <TableHead className="font-semibold text-gray-600">Project Detail</TableHead>
                <TableHead className="font-semibold text-gray-600">Agency</TableHead>
                <TableHead className="font-semibold text-gray-600">Client</TableHead>
                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                <TableHead className="font-semibold text-gray-600">Deadline</TableHead>
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
              ) : projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 space-y-2">
                      <FolderKanban className="w-8 h-8 text-gray-300" />
                      <p className="font-medium text-sm">No projects found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((p) => (
                  <TableRow key={p.id} className="group border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
                          <FolderKanban className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">
                            Budget: <span className="text-gray-700">${p.budget?.toLocaleString() || 0}</span>
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold text-gray-700">{p.agency?.name || 'N/A'}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold text-gray-700">{p.client?.full_name || 'N/A'}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${getStatusBadgeColor(p.status)}`}>
                        {p.status.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{new Date(p.deadline).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!loading && projects.length > 0 && (
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
