"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { UserService } from "@/_lib/services/user_service";
import { User } from "@/types/User";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/_components/ui/card";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Badge } from "@/_components/ui/badge";
import { Search, Code2, Plus, ArrowUpDown, Eye, Trash2, Edit } from "lucide-react";
import Link from "next/link";

export default function DevelopersPage() {
    const router = useRouter();
    const userService = new UserService();

    const [developers, setDevelopers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const limit = 10;
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [stats, setStats] = useState({ total: 0 });

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const fetchDevelopers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await userService.getAll({
                page,
                limit,
                role: "DEVELOPER",
                search: debouncedSearch || undefined,
            });
            setDevelopers(res.data);
            setStats({ total: res.meta?.total || 0 });
        } catch (err) {
            console.error("Failed to fetch developers", err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, debouncedSearch]);

    useEffect(() => {
        fetchDevelopers();
    }, [fetchDevelopers]);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this developer?")) return;
        try {
            await userService.delete(id);
            fetchDevelopers();
        } catch (err) {
            alert("Failed to delete developer");
        }
    };

    return (
        <div className="p-6 space-y-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
                        <Code2 className="w-8 h-8 mr-3 text-teal-600" />
                        Developer Management
                    </h1>
                    <p className="text-gray-500 mt-1 ml-11">Manage your agency's developers, view their performance and active projects.</p>
                </div>
                <Link href="/dashboard/admin/developers/create" className="mt-4 md:mt-0">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="w-4 h-4 mr-2" /> Add Developer
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="pb-3 border-b">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <CardTitle className="text-lg flex items-center">
                            <Code2 className="w-5 h-5 mr-2 text-teal-600" /> All Developers
                        </CardTitle>
                        <div className="flex items-center space-x-2 w-full md:w-auto">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    className="pl-8"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline">
                                <ArrowUpDown className="w-4 h-4 mr-2" /> Sort
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-6 py-4">Developer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Active Projects</th>
                                    <th className="px-6 py-4">Performance Score</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading developers...</td>
                                    </tr>
                                ) : developers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No developers found.</td>
                                    </tr>
                                ) : (
                                    developers.map((dev) => (
                                        <tr key={dev.ID} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center font-bold text-teal-700 dark:text-teal-300">
                                                        {dev.FullName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 dark:text-white">{dev.FullName}</p>
                                                        <p className="text-xs text-gray-500">{dev.Email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant={dev.IsActive ? "default" : "secondary"} className={dev.IsActive ? "bg-green-500" : ""}>
                                                    {dev.IsActive ? "Active" : "Inactive"}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                {/* Mock Data */}
                                                <div className="flex -space-x-2">
                                                    <div className="w-6 h-6 rounded-full bg-blue-100 border border-white flex items-center justify-center text-[10px] text-blue-700" title="Project A">PA</div>
                                                    <div className="w-6 h-6 rounded-full bg-purple-100 border border-white flex items-center justify-center text-[10px] text-purple-700" title="Project B">PB</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {/* Mock Data */}
                                                <div className="flex items-center">
                                                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                                    </div>
                                                    <span className="text-xs font-medium">85%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link href={`/dashboard/admin/developers/${dev.ID}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50" onClick={() => handleDelete(dev.ID)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t flex items-center justify-between text-sm text-gray-500">
                        <p>Showing {developers.length} of {stats.total} developers</p>
                        <div className="flex items-center space-x-2">
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
                                disabled={developers.length < limit || loading}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
