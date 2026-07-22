"use client";

import { useState } from "react";
import { useDevelopers } from "../../../../../../_hooks/use-developers";
import { DevelopersHeader } from "../../../../../../_components/developer/DevelopersHeader";
import { DevelopersStats } from "../../../../../../_components/developer/DevelopersStats";
import { DeveloperCard } from "../../../../../../_components/developer/DeveloperCard";
import { DeveloperFormModal } from "../../../../../../_components/developer/DeveloperFormModal";
import { DeleteConfirmDialog } from "../../../../../../_components/developer/DeleteConfirmDialog";
import { DevelopersGridSkeleton, DevelopersStatsSkeleton } from "../../../../../../_components/developer/DevelopersSkeleton";
import { DevelopersEmptyState } from "../../../../../../_components/developer/DevelopersEmptyState";
import { Developer } from "../../../../../../types/developer";
import { Button } from "@/_components/ui/button";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

export default function DevelopersManagementPage() {
    const {
        developers,
        stats,
        total,
        loading,
        error,
        page,
        setPage,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        sortBy,
        setSortBy,
        limit,
        refetch,
        addDeveloper,
        updateDeveloper,
        deleteDeveloper
    } = useDevelopers();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleAddClick = () => {
        setSelectedDeveloper(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (dev: Developer) => {
        setSelectedDeveloper(dev);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (dev: Developer) => {
        setSelectedDeveloper(dev);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = async (data: Partial<Developer>) => {
        if (selectedDeveloper) {
            await updateDeveloper(selectedDeveloper.id, data);
        } else {
            await addDeveloper(data);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedDeveloper) return;
        setIsDeleting(true);
        try {
            await deleteDeveloper(selectedDeveloper.id);
            setIsDeleteOpen(false);
            setSelectedDeveloper(null);
        } catch (err) {
            // Error handled in hook
        } finally {
            setIsDeleting(false);
        }
    };

    const totalPages = Math.ceil(total / limit);

    if (error) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Failed to load developers</h3>
                <p className="text-gray-500 mb-6">{error}</p>
                <Button onClick={refetch} variant="outline">Try Again</Button>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
            <DevelopersHeader
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onAddClick={handleAddClick}
            />

            {loading && !stats ? <DevelopersStatsSkeleton /> : <DevelopersStats stats={stats} />}

            {loading ? (
                <DevelopersGridSkeleton />
            ) : developers.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {developers.map(dev => (
                            <DeveloperCard
                                key={dev.id}
                                developer={dev}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to <span className="font-medium">{Math.min(page * limit, total)}</span> of <span className="font-medium">{total}</span> results
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page === 1}
                                    onClick={() => setPage((p: number) => p - 1)}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page === totalPages}
                                    onClick={() => setPage((p: number) => p + 1)}
                                >
                                    Next <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <DevelopersEmptyState onAddClick={handleAddClick} />
            )}

            <DeveloperFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                developer={selectedDeveloper}
                onSubmit={handleFormSubmit}
            />

            <DeleteConfirmDialog
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Developer"
                description={`Are you sure you want to remove ${selectedDeveloper?.fullName}? This action cannot be undone and will permanently delete this developer from your agency.`}
                itemDetails={selectedDeveloper ? {
                    name: selectedDeveloper.fullName,
                    roleOrCompany: selectedDeveloper.role,
                    avatarUrl: selectedDeveloper.avatarUrl
                } : undefined}
                isDeleting={isDeleting}
            />
        </div>
    );
}
