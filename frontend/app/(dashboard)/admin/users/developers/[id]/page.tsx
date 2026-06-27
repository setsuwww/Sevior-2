"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminDeveloperService } from "@/_lib/services/admin/developer.service";
import { ArrowLeft, Mail, Phone, Calendar, CheckCircle2, Clock, XCircle, Briefcase, Activity } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { Card } from "@/_components/ui/card";
import { Skeleton } from "@/_components/ui/skeleton";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DeveloperDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [developer, setDeveloper] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDev = async () => {
            try {
                const res = await adminDeveloperService.getDeveloper(Number(id));
                setDeveloper(res);
            } catch (error) {
                toast.error("Failed to load developer details");
                router.push("/admin/users/developers");
            } finally {
                setLoading(false);
            }
        };
        fetchDev();
    }, [id, router]);

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-32" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="col-span-1 p-6"><Skeleton className="h-64 w-full" /></Card>
                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        <Card className="p-6"><Skeleton className="h-40 w-full" /></Card>
                        <Card className="p-6"><Skeleton className="h-64 w-full" /></Card>
                    </div>
                </div>
            </div>
        );
    }

    if (!developer) return null;

    const completedTasks = developer.AssignedTasks?.filter((t: any) => t.Status === "COMPLETED")?.length || 0;
    const activeTasks = developer.AssignedTasks?.filter((t: any) => t.Status === "IN_PROGRESS" || t.Status === "TODO")?.length || 0;
    const failedTasks = developer.AssignedTasks?.filter((t: any) => t.Status === "FAILED" || t.Status === "CANCELLED")?.length || 0;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center space-x-4">
                <Link href="/admin/users/developers">
                    <Button variant="ghost" size="icon" className="h-9 w-9 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm">
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Developer Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="col-span-1 p-6 border-gray-200 shadow-sm flex flex-col items-center text-center bg-white">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-teal-500 to-teal-400 text-white flex items-center justify-center text-3xl font-bold shadow-md mb-4 border-4 border-white">
                        {developer.ProfileImage ? (
                            <img src={developer.ProfileImage} alt={developer.FullName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            developer.FullName.charAt(0)
                        )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{developer.FullName}</h2>
                    <p className="text-sm font-medium text-teal-600 mb-4">{developer.Role}</p>
                    
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-6 ${developer.IsActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {developer.IsActive ? "Active Account" : "Inactive Account"}
                    </span>

                    <div className="w-full border-t border-gray-100 pt-6 space-y-4 text-left">
                        <div className="flex items-start space-x-3 text-sm text-gray-600">
                            <Mail className="w-4 h-4 mt-0.5 text-gray-400" />
                            <span className="truncate">{developer.Email}</span>
                        </div>
                        <div className="flex items-start space-x-3 text-sm text-gray-600">
                            <Phone className="w-4 h-4 mt-0.5 text-gray-400" />
                            <span>{developer.Phone || "No phone number"}</span>
                        </div>
                        <div className="flex items-start space-x-3 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mt-0.5 text-gray-400" />
                            <span>Joined {new Date(developer.CreatedAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </Card>

                <div className="col-span-1 lg:col-span-2 space-y-6">
                    {/* Bio Card */}
                    <Card className="p-6 border-gray-200 shadow-sm bg-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Briefcase className="w-5 h-5 mr-2 text-teal-600" /> Biography
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {developer.Biography || "This developer has not provided a biography yet."}
                        </p>
                    </Card>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="p-5 border-gray-200 shadow-sm bg-white flex flex-col justify-center">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">Completed Tasks</span>
                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{completedTasks}</span>
                        </Card>
                        <Card className="p-5 border-gray-200 shadow-sm bg-white flex flex-col justify-center">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">Active Tasks</span>
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{activeTasks}</span>
                        </Card>
                        <Card className="p-5 border-gray-200 shadow-sm bg-white flex flex-col justify-center">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">Failed/Cancelled</span>
                                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                                    <XCircle className="w-4 h-4 text-red-600" />
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{failedTasks}</span>
                        </Card>
                    </div>

                    {/* Timeline / Recent Activity */}
                    <Card className="p-6 border-gray-200 shadow-sm bg-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-teal-600" /> Recent Assignments
                        </h3>
                        <div className="space-y-6">
                            {developer.ProjectMembers && developer.ProjectMembers.length > 0 ? (
                                developer.ProjectMembers.map((member: any, i: number) => (
                                    <div key={member.ID || i} className="flex gap-4 relative">
                                        <div className="w-3 mt-1.5 flex flex-col items-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-teal-500 z-10" />
                                            {i !== developer.ProjectMembers.length - 1 && (
                                                <div className="w-0.5 h-full bg-gray-100 absolute top-3" />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <p className="text-sm font-semibold text-gray-900">
                                                Assigned to Project: {member.Project?.Title || "Unknown Project"}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Role: {member.Role} • Added on {new Date(member.CreatedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 italic">No project assignments found.</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
