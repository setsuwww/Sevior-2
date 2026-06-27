"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Eye, Copy, Users } from "lucide-react";
import { adminClientService } from "@/_lib/services/admin/client.service";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/ui/table";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function AdminClientsPage() {
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("NEWEST");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 10;

    const fetchClients = useCallback(async () => {
        try {
            setLoading(true);
            const res = await adminClientService.getClients({ search, sort, page, limit });
            setClients(res.data || []);
            setTotal(res.total || 0);
        } catch (error) {
            console.error("Failed to fetch clients", error);
            toast.error("Failed to fetch clients");
        } finally {
            setLoading(false);
        }
    }, [search, sort, page]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchClients();
        }, 300);
        return () => clearTimeout(debounce);
    }, [fetchClients]);

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied ${label} successfully`);
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Client Management</h1>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full md:w-auto relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search by name, email or phone..."
                        className="pl-10 w-full bg-gray-50 border-gray-200"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex w-full md:w-auto gap-4">
                    <select
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="NEWEST">Sort: Newest First</option>
                        <option value="OLDEST">Sort: Oldest First</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/80 sticky top-0 backdrop-blur-sm z-10">
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Requests / Projects</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><div className="h-10 bg-gray-100 rounded w-48 animate-pulse" /></TableCell>
                                        <TableCell><div className="h-6 bg-gray-100 rounded w-32 animate-pulse" /></TableCell>
                                        <TableCell><div className="h-6 bg-gray-100 rounded w-24 animate-pulse" /></TableCell>
                                        <TableCell><div className="h-6 bg-gray-100 rounded w-24 animate-pulse" /></TableCell>
                                        <TableCell><div className="h-8 bg-gray-100 rounded w-20 animate-pulse ml-auto" /></TableCell>
                                    </TableRow>
                                ))
                            ) : clients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <Users className="w-12 h-12 mb-4 text-gray-300" />
                                            <p className="text-lg font-medium text-gray-900">No clients found</p>
                                            <p className="text-sm">Only clients who have submitted a request to your agency are shown here.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                clients.map((client) => (
                                    <TableRow key={client.ID} className="hover:bg-gray-50/50 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                                                    {client.ProfileImage ? (
                                                        <img src={client.ProfileImage} alt="" className="w-10 h-10 rounded-full object-cover" />
                                                    ) : (
                                                        client.FullName.charAt(0)
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{client.FullName}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center text-sm text-gray-500 group">
                                                    <span className="truncate w-32">{client.Email}</span>
                                                    <button onClick={() => handleCopy(client.Email, 'Email')} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded" title="Copy Email">
                                                        <Copy className="w-3 h-3 text-gray-600" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500 group">
                                                    <span>{client.Phone || "N/A"}</span>
                                                    {client.Phone && (
                                                        <button onClick={() => handleCopy(client.Phone, 'Phone Number')} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded" title="Copy Phone Number">
                                                            <Copy className="w-3 h-3 text-gray-600" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">
                                            <div className="flex flex-col gap-1">
                                                <span>Total Requests: {client.ProjectRequests?.length || 0}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-500">
                                            {new Date(client.CreatedAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end">
                                                <Link href={`/admin/users/clients/${client.ID}`}>
                                                    <Button variant="outline" size="sm" className="h-8 shadow-sm">
                                                        <Eye className="w-4 h-4 mr-1.5" /> View
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                {/* Pagination */}
                <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to <span className="font-medium">{Math.min(page * limit, total)}</span> of <span className="font-medium">{total}</span> clients
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page * limit >= total}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
