"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserService } from "@/_lib/services/user_service";
import { User } from "@/types/User";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/_components/ui/card";
import { Button } from "@/_components/ui/button";
import { Badge } from "@/_components/ui/badge";
import { ArrowLeft, User as UserIcon, Mail, Phone, Calendar, Briefcase, Activity, CheckCircle2, Edit, Copy, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DeveloperDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    const userService = new UserService();

    const [developer, setDeveloper] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchDeveloper = useCallback(async () => {
        try {
            const data = await userService.getById(id);
            setDeveloper(data);
        } catch (err) {
            console.error("Failed to fetch developer details", err);
            alert("Developer not found.");
            router.push("/dashboard/admin/developers");
        } finally {
            setLoading(false);
        }
    }, [id, router]);

    useEffect(() => {
        fetchDeveloper();
    }, [fetchDeveloper]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this developer?")) return;
        try {
            await userService.delete(id);
            router.push("/dashboard/admin/developers");
        } catch (err) {
            alert("Failed to delete developer.");
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Loading developer profile...</div>;
    }

    if (!developer) {
        return <div className="p-6 text-center text-red-500">Developer not found.</div>;
    }

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
                <Link href="/dashboard/admin/developers">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Developer Profile</h1>
                    <p className="text-gray-500 mt-1">View comprehensive details and performance of the developer.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Profile Overview Card */}
                <Card className="lg:col-span-1 border-t-4 border-teal-500">
                    <CardHeader>
                        <CardTitle className="text-lg">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-24 h-24 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center font-bold text-4xl text-teal-700 dark:text-teal-300">
                                {developer.FullName.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{developer.FullName}</h3>
                                <p className="text-sm text-gray-500">{developer.Role}</p>
                            </div>
                            <Badge variant={developer.IsActive ? "default" : "secondary"} className={developer.IsActive ? "bg-green-500" : ""}>
                                {developer.IsActive ? "Active" : "Inactive"}
                            </Badge>
                        </div>

                        <div className="pt-4 border-t space-y-4">
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 group">
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-3 text-gray-400" /> {developer.Email}
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copyToClipboard(developer.Email)}>
                                    <Copy className="w-3 h-3" />
                                </Button>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 group">
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-3 text-gray-400" /> {developer.Phone || "Not provided"}
                                </div>
                                {developer.Phone && (
                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copyToClipboard(developer.Phone)}>
                                        <Copy className="w-3 h-3" />
                                    </Button>
                                )}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <Calendar className="w-4 h-4 mr-3 text-gray-400" /> Joined on {new Date(developer.CreatedAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <Button className="w-full" variant="outline" onClick={() => alert("Edit form coming soon")}>
                                <Edit className="w-4 h-4 mr-2" /> Edit Profile
                            </Button>
                            <Button className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" variant="outline" onClick={handleDelete}>
                                <Trash2 className="w-4 h-4 mr-2" /> Delete Developer
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                    {/* Performance Metrics Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="text-lg flex items-center">
                                    <Activity className="w-5 h-5 mr-2 text-blue-500" /> Performance Metrics
                                </CardTitle>
                                <CardDescription>Dummy data visualization for developer output.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center border">
                                    <h4 className="text-3xl font-bold text-gray-900 dark:text-white">85%</h4>
                                    <p className="text-xs text-gray-500 mt-1">Reliability Score</p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center border">
                                    <h4 className="text-3xl font-bold text-gray-900 dark:text-white">12</h4>
                                    <p className="text-xs text-gray-500 mt-1">Projects Completed</p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center border">
                                    <h4 className="text-3xl font-bold text-gray-900 dark:text-white">142</h4>
                                    <p className="text-xs text-gray-500 mt-1">Tasks Resolved</p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center border">
                                    <h4 className="text-3xl font-bold text-gray-900 dark:text-white">99%</h4>
                                    <p className="text-xs text-gray-500 mt-1">On-time Delivery</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Assigned Projects Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                            <div>
                                <CardTitle className="text-lg flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2 text-purple-500" /> Assigned Projects
                                </CardTitle>
                                <CardDescription>Currently active project assignments.</CardDescription>
                            </div>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => alert("Assign Project dialog coming soon")}>Assign Project</Button>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-4">
                                {/* Dummy List */}
                                {[
                                    { id: 1, name: "E-Commerce Mobile App", role: "Lead Frontend", progress: 65, status: "In Progress" },
                                    { id: 2, name: "Fintech Web Portal", role: "Reviewer", progress: 100, status: "Completed" }
                                ].map((project) => (
                                    <div key={project.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 hover:bg-gray-50 transition-colors">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                                            <p className="text-sm text-gray-500 mt-1">Role: {project.role}</p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                                            <Badge variant={project.status === "Completed" ? "default" : "secondary"} className={project.status === "Completed" ? "bg-green-500" : "bg-blue-100 text-blue-700"}>
                                                {project.status}
                                            </Badge>
                                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={() => alert("Unassign developer from project?")}>
                                                Unassign
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
