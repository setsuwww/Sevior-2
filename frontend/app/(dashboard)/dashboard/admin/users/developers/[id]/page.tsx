"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Calendar, Briefcase, Star, Edit2, Trash2, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { Skeleton } from "@/_components/ui/skeleton";
import { developerService } from "../../../../../../../services/developer.service";
import { Developer } from "../../../../../../../types/developer";
import { DeveloperFormModal } from "../../../../../../../_components/developer/DeveloperFormModal";
import { DeleteConfirmDialog } from "../../../../../../../_components/developer/DeleteConfirmDialog";

export default function DeveloperProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [developer, setDeveloper] = useState<Developer | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchDev = async () => {
            try {
                const dev = await developerService.getDeveloperById(params.id as string);
                setDeveloper(dev);
            } catch (err) {
                // Handle error
            } finally {
                setLoading(false);
            }
        };
        fetchDev();
    }, [params.id]);

    const handleEditSubmit = async (data: Partial<Developer>) => {
        if (!developer) return;
        const updated = await developerService.updateDeveloper(developer.id, data);
        setDeveloper(updated);
    };

    const handleDelete = async () => {
        if (!developer) return;
        setIsDeleting(true);
        await developerService.deleteDeveloper(developer.id);
        setIsDeleting(false);
        router.push("/dashboard/admin/developers");
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

    if (!developer) {
        return <div className="p-8 text-center">Developer not found</div>;
    }

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto min-h-screen pb-20">
            <button
                onClick={() => router.back()}
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Developers
            </button>

            {/* Header Card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden mb-8">
                {/* Background decorative gradient */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-teal-500/10 to-blue-500/10 dark:from-teal-900/20 dark:to-blue-900/20" />

                <div className="relative flex flex-col md:flex-row gap-8 items-start">
                    <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-900 shadow-lg">
                        <AvatarImage src={developer.avatarUrl} />
                        <AvatarFallback className="text-4xl bg-teal-100 text-teal-700">{developer.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{developer.fullName}</h1>
                                <p className="text-lg text-teal-600 dark:text-teal-500 font-medium">{developer.role}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" onClick={() => setIsEditOpen(true)} className="bg-white dark:bg-gray-900">
                                    <Edit2 className="w-4 h-4 mr-2" /> Edit
                                </Button>
                                <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </Button>
                                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                                    <Briefcase className="w-4 h-4 mr-2" /> Assign Project
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-3 shrink-0" /> {developer.email}
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-3 shrink-0" /> {developer.phone || "Not provided"}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-3 shrink-0" /> Joined {new Date(developer.joinedDate).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-8 lg:col-span-2">
                    {/* Biography */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Biography</h2>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            {developer.bio || "No biography provided."}
                        </div>
                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Skills & Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                            {developer.skills.map((skill: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-0">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column (Stats) */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-teal-500" /> Performance Overview
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                    <Star className="w-4 h-4 mr-2 text-yellow-500" /> Rating
                                </div>
                                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{developer.performanceRating.toFixed(1)}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Completion Rate
                                </div>
                                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{developer.taskCompletionRate}%</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                    <Briefcase className="w-4 h-4 mr-2 text-blue-500" /> Current Projects
                                </div>
                                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{developer.currentProjects}</span>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Completed Projects</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{developer.completedProjects}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DeveloperFormModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                developer={developer}
                onSubmit={handleEditSubmit}
            />

            <DeleteConfirmDialog
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                title="Delete Developer"
                description={`Are you sure you want to remove ${developer.fullName}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </div>
    );
}
