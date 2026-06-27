"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminClientService } from "@/_lib/services/admin/client.service";
import { ArrowLeft, Mail, Phone, Calendar, Paperclip, CheckCircle } from "lucide-react";
import { Button } from "@/_components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function AdminClientDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    
    const [client, setClient] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const data = await adminClientService.getClient(id);
                setClient(data);
            } catch (error) {
                console.error("Failed to fetch client", error);
                toast.error("Failed to load client data");
                router.push("/admin/users/clients");
            } finally {
                setLoading(false);
            }
        };
        fetchClient();
    }, [id, router]);

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied ${label} successfully`);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-6" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="col-span-1 h-96 bg-gray-100 rounded-xl animate-pulse" />
                    <div className="col-span-2 h-96 bg-gray-100 rounded-xl animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link href="/admin/users/clients">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Client Profile</h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Profile Card */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                        <div className="px-6 pb-6 relative">
                            <div className="absolute -top-12 left-6 p-1 bg-white rounded-full">
                                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-700 shadow-sm border-2 border-white">
                                    {client?.ProfileImage ? (
                                        <img src={client.ProfileImage} alt="" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        client?.FullName?.charAt(0)
                                    )}
                                </div>
                            </div>
                            
                            <div className="mt-12">
                                <h2 className="text-xl font-bold text-gray-900">{client?.FullName}</h2>
                                <p className="text-sm text-gray-500 mb-4">Client</p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm text-gray-600 group">
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 mr-3 text-gray-400" />
                                            {client?.Email}
                                        </div>
                                        <button onClick={() => handleCopy(client?.Email, 'Email')} className="text-indigo-600 hover:text-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity">Copy</button>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-600 group">
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 mr-3 text-gray-400" />
                                            {client?.Phone || "No phone provided"}
                                        </div>
                                        {client?.Phone && (
                                            <button onClick={() => handleCopy(client?.Phone, 'Phone')} className="text-indigo-600 hover:text-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity">Copy</button>
                                        )}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                                        Joined {new Date(client?.CreatedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Details */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Project Requests */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Project Requests & History</h3>
                        </div>
                        <div className="p-0">
                            {client?.ProjectRequests && client.ProjectRequests.length > 0 ? (
                                <ul className="divide-y divide-gray-100">
                                    {client.ProjectRequests.map((req: any, idx: number) => (
                                        <li key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold text-lg text-gray-900">{req.Title}</h4>
                                                        <p className="text-sm text-gray-500 mt-1">{req.Description}</p>
                                                    </div>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        req.Status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                                        req.Status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {req.Status}
                                                    </span>
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-500">Budget: </span>
                                                        <span className="font-medium text-gray-900">${req.BudgetMin} - ${req.BudgetMax}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Deadline: </span>
                                                        <span className="font-medium text-gray-900">{req.Deadline ? new Date(req.Deadline).toLocaleDateString() : 'TBD'}</span>
                                                    </div>
                                                </div>

                                                {req.AttachmentURL && (
                                                    <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                        <Paperclip className="w-5 h-5 text-gray-400" />
                                                        <a href={req.AttachmentURL} target="_blank" rel="noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                                                            View Attachment
                                                        </a>
                                                    </div>
                                                )}

                                                {/* If there are projects associated with this request */}
                                                {req.Projects && req.Projects.length > 0 && (
                                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                                        <h5 className="text-sm font-bold text-gray-700 mb-3">Associated Projects</h5>
                                                        <div className="space-y-3">
                                                            {req.Projects.map((project: any, pIdx: number) => (
                                                                <div key={pIdx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                                                    <div className="flex justify-between items-center mb-2">
                                                                        <h6 className="font-medium text-gray-900">{project.Title}</h6>
                                                                        <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">{project.Status}</span>
                                                                    </div>
                                                                    {project.Tasks && project.Tasks.length > 0 && (
                                                                        <div className="mt-3">
                                                                            <p className="text-xs font-medium text-gray-500 mb-2">Tasks ({project.Tasks.length})</p>
                                                                            <ul className="space-y-1">
                                                                                {project.Tasks.slice(0, 3).map((task: any, tIdx: number) => (
                                                                                    <li key={tIdx} className="text-sm flex items-center">
                                                                                        <CheckCircle className={`w-3 h-3 mr-2 ${task.Status === 'DONE' ? 'text-green-500' : 'text-gray-300'}`} />
                                                                                        <span className="truncate text-gray-600">{task.Title}</span>
                                                                                    </li>
                                                                                ))}
                                                                                {project.Tasks.length > 3 && (
                                                                                    <li className="text-xs text-gray-400 pl-5">+ {project.Tasks.length - 3} more</li>
                                                                                )}
                                                                            </ul>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-6 text-center text-gray-500 text-sm">
                                    No requests history available.
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
