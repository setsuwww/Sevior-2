"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Calendar, Globe, Building, Edit2, Trash2, CheckCircle2, TrendingUp, FolderOpen, FileText } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { Skeleton } from "@/_components/ui/skeleton";
import { clientService } from "../../../../../../services/client.service";
import { Client } from "../../../../../../types/client";
import { ClientFormModal } from "../../../../../../_components/client/ClientFormModal";
import { DeleteConfirmDialog } from "../../../../../../_components/client/DeleteConfirmDialog";

export default function ClientProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const c = await clientService.getClientById(params.id as string);
                setClient(c);
            } catch (err) {
                // Handle error
            } finally {
                setLoading(false);
            }
        };
        fetchClient();
    }, [params.id]);

    const handleEditSubmit = async (data: Partial<Client>) => {
        if (!client) return;
        const updated = await clientService.updateClient(client.id, data);
        setClient(updated);
    };

    const handleDelete = async () => {
        if (!client) return;
        setIsDeleting(true);
        await clientService.deleteClient(client.id);
        setIsDeleting(false);
        router.push("/dashboard/admin/clients");
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    if (loading) {
        return (
            <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
                <Skeleton className="h-6 w-32" />
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 flex items-start gap-8">
                    <Skeleton className="w-32 h-32 rounded-full" />
                    <div className="space-y-4 flex-1">
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                        <div className="flex gap-4 mt-6">
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-10 w-24" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!client) {
        return <div className="p-8 text-center">Client not found</div>;
    }

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto min-h-screen pb-20">
            <button 
                onClick={() => router.back()}
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Clients
            </button>

            {/* Header Card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden mb-8">
                {/* Background decorative gradient */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-900/20 dark:to-indigo-900/20" />
                
                <div className="relative flex flex-col md:flex-row gap-8 items-start">
                    <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-900 shadow-lg bg-gray-50 dark:bg-gray-800">
                        <AvatarImage src={client.logoUrl} className="object-contain p-2" />
                        <AvatarFallback className="text-4xl bg-teal-100 text-teal-700">{client.companyName.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{client.companyName}</h1>
                                <p className="text-lg text-teal-600 dark:text-teal-500 font-medium flex items-center gap-2 mt-1">
                                    <Building className="w-5 h-5" /> {client.industry}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" onClick={() => setIsEditOpen(true)} className="bg-white dark:bg-gray-900">
                                    <Edit2 className="w-4 h-4 mr-2" /> Edit
                                </Button>
                                <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </Button>
                                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                                    <FolderOpen className="w-4 h-4 mr-2" /> Create Project
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-gray-600 dark:text-gray-400 mt-6">
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-3 shrink-0" /> {client.email}
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-3 shrink-0" /> {client.phone || "Not provided"}
                            </div>
                            {client.website && (
                                <div className="flex items-center">
                                    <Globe className="w-4 h-4 mr-3 shrink-0" /> 
                                    <a href={client.website} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 hover:underline">
                                        {client.website.replace(/^https?:\/\//, '')}
                                    </a>
                                </div>
                            )}
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-3 shrink-0" /> Client since {new Date(client.joinedDate).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-8 lg:col-span-2">
                    {/* About */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">About {client.companyName}</h2>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            {client.description || "No description provided."}
                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-500 mb-1">Primary Contact</p>
                                <p className="font-medium text-gray-900 dark:text-gray-100 text-lg">{client.contactName}</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column (Stats) */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-teal-500" /> Account Overview
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                    <FolderOpen className="w-4 h-4 mr-2 text-blue-500" /> Total Projects
                                </div>
                                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{client.totalProjects}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Completed
                                </div>
                                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{client.completedProjects}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                    <FileText className="w-4 h-4 mr-2 text-orange-500" /> Invoices
                                </div>
                                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{client.invoicesCount || 0}</span>
                            </div>
                            
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Revenue Generated</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-500">{formatCurrency(client.revenue)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ClientFormModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                client={client}
                onSubmit={handleEditSubmit}
            />

            <DeleteConfirmDialog
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                title="Delete Client"
                description={`Are you sure you want to remove ${client.companyName}? This action cannot be undone and will delete all associated data.`}
                isDeleting={isDeleting}
            />
        </div>
    );
}
