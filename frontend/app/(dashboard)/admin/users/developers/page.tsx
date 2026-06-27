"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Plus, Eye, SquarePen, Trash2, Copy, Clipboard, MoreHorizontal, Users } from "lucide-react";
import { adminDeveloperService } from "@/_lib/services/admin/developer.service";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/ui/table";
import { Card } from "@/_components/ui/card";
import { Skeleton } from "@/_components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/_components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import CreateDeveloperDialog from "@/_components/admin/developers/CreateDeveloperDialog";
import UpdateDeveloperDialog from "@/_components/admin/developers/UpdateDeveloperDialog";
import DeleteDeveloperDialog from "@/_components/admin/developers/DeleteDeveloperDialog";

export default function AdminDevelopersPage() {
    const [developers, setDevelopers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [sort, setSort] = useState("NEWEST");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    // Dialog States
    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedDev, setSelectedDev] = useState<any>(null);

    const limit = 10;

    const fetchDevelopers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await adminDeveloperService.getDevelopers({ search, status: status === "ALL" ? "" : status, sort, page, limit });
            setDevelopers(res.data || []);
            setTotal(res.total || 0);
        } catch (error) {
            console.error("Failed to fetch developers", error);
            toast.error("Failed to fetch developers");
        } finally {
            setLoading(false);
        }
    }, [search, status, sort, page]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchDevelopers();
        }, 300);
        return () => clearTimeout(debounce);
    }, [fetchDevelopers]);

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied ${type} successfully`);
    };

    const handleEditClick = (dev: any) => {
        setSelectedDev(dev);
        setUpdateOpen(true);
    };

    const handleDeleteClick = (dev: any) => {
        setSelectedDev(dev);
        setDeleteOpen(true);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Toaster position="top-right" />
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Developer Management</h1>
                    <p className="text-gray-500 text-base">Manage developers in your agency.</p>
                </div>
                <Button 
                    onClick={() => setCreateOpen(true)}
                    className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm rounded-xl px-4 py-2 flex items-center gap-2 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Create Developer
                </Button>
            </div>

            {/* Main Container */}
            <Card className="rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
                {/* Search & Filters */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-white">
                    <div className="relative w-full md:max-w-md">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search developer..."
                            className="pl-10 w-full bg-gray-50 border-gray-200 rounded-lg focus-visible:ring-teal-500 h-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full md:w-auto gap-3">
                        <select
                            className="px-4 h-10 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-gray-700"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="ALL">All Status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                        </select>
                        <select
                            className="px-4 h-10 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-gray-700"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="NEWEST">Sort: Newest</option>
                            <option value="OLDEST">Sort: Oldest</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto w-full px-6 py-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-gray-100 hover:bg-transparent">
                                <TableHead className="text-gray-500 font-semibold sticky top-0 bg-white">Developer</TableHead>
                                <TableHead className="text-gray-500 font-semibold sticky top-0 bg-white">Contact</TableHead>
                                <TableHead className="text-gray-500 font-semibold sticky top-0 bg-white">Status</TableHead>
                                <TableHead className="text-gray-500 font-semibold sticky top-0 bg-white">Assignments</TableHead>
                                <TableHead className="text-gray-500 font-semibold sticky top-0 bg-white">Timeline</TableHead>
                                <TableHead className="text-right text-gray-500 font-semibold sticky top-0 bg-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={`skeleton-${i}`} className="border-b border-gray-50">
                                        <TableCell><div className="flex items-center space-x-3"><Skeleton className="w-10 h-10 rounded-full" /><Skeleton className="h-4 w-32" /></div></TableCell>
                                        <TableCell><Skeleton className="h-4 w-40 mb-2" /><Skeleton className="h-4 w-28" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-24 mb-2" /><Skeleton className="h-4 w-24" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-24 mb-2" /><Skeleton className="h-4 w-24" /></TableCell>
                                        <TableCell><div className="flex justify-end"><Skeleton className="h-8 w-8 rounded-md" /></div></TableCell>
                                    </TableRow>
                                ))
                            ) : developers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-80 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500 animate-in fade-in duration-500">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 shadow-sm">
                                                <Users className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">No developers found</h3>
                                            <p className="text-sm text-gray-500 mb-6 max-w-sm">Create your first developer to get started or adjust your search filters to find existing ones.</p>
                                            <Button 
                                                onClick={() => setCreateOpen(true)}
                                                variant="outline"
                                                className="border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Create Developer
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                developers.map((dev) => (
                                    <TableRow key={dev.ID} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                                        <TableCell>
                                            <div className="flex items-center space-x-4 py-2">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-teal-400 text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                                                    {dev.ProfileImage ? (
                                                        <img src={dev.ProfileImage} alt="" className="w-10 h-10 rounded-full object-cover" />
                                                    ) : (
                                                        dev.FullName.charAt(0)
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{dev.FullName}</span>
                                                    <span className="text-xs text-gray-500 mt-0.5 truncate max-w-[150px]">{dev.Biography || "No biography provided"}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <span className="truncate w-36">{dev.Email}</span>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button onClick={() => handleCopy(dev.Email, 'email')} className="ml-1.5 p-1 rounded-md text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors">
                                                                <Copy className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Copy Email</TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <span>{dev.Phone || "N/A"}</span>
                                                    {dev.Phone && (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <button onClick={() => handleCopy(dev.Phone, 'phone')} className="ml-1.5 p-1 rounded-md text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors">
                                                                    <Clipboard className="w-3.5 h-3.5" />
                                                                </button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>Copy Phone</TooltipContent>
                                                        </Tooltip>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${dev.IsActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                {dev.IsActive ? "Active" : "Inactive"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <span className="w-16">Projects:</span>
                                                    <span className="font-semibold text-gray-900">{dev.ProjectMembers?.length || 0}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="w-16">Tasks:</span>
                                                    <span className="font-semibold text-gray-900">{dev.AssignedTasks?.length || 0}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-500">
                                            <div className="flex flex-col gap-1 text-xs">
                                                <div><span className="text-gray-400">Created:</span> {new Date(dev.CreatedAt).toLocaleDateString()}</div>
                                                <div><span className="text-gray-400">Updated:</span> {new Date(dev.UpdatedAt).toLocaleDateString()}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-gray-100">
                                                    <Link href={`/admin/users/developers/${dev.ID}`}>
                                                        <DropdownMenuItem className="cursor-pointer text-gray-700 focus:text-gray-900 focus:bg-gray-50">
                                                            <Eye className="w-4 h-4 mr-2 text-gray-400" /> View Detail
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem className="cursor-pointer text-gray-700 focus:text-gray-900 focus:bg-gray-50" onClick={() => handleEditClick(dev)}>
                                                        <SquarePen className="w-4 h-4 mr-2 text-blue-500" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50" onClick={() => handleDeleteClick(dev)}>
                                                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                                                    </DropdownMenuItem>
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
                {total > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{(page - 1) * limit + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(page * limit, total)}</span> of <span className="font-semibold text-gray-900">{total}</span>
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 rounded-lg text-gray-600 border-gray-200 hover:bg-gray-50 shadow-sm"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 rounded-lg text-gray-600 border-gray-200 hover:bg-gray-50 shadow-sm"
                                disabled={page * limit >= total}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Dialogs */}
            <CreateDeveloperDialog 
                open={createOpen} 
                onOpenChange={setCreateOpen} 
                onSuccess={fetchDevelopers} 
            />
            
            <UpdateDeveloperDialog 
                open={updateOpen} 
                onOpenChange={setUpdateOpen} 
                developer={selectedDev}
                onSuccess={fetchDevelopers} 
            />

            <DeleteDeveloperDialog 
                open={deleteOpen} 
                onOpenChange={setDeleteOpen} 
                developer={selectedDev}
                onSuccess={fetchDevelopers} 
            />
        </div>
    );
}
