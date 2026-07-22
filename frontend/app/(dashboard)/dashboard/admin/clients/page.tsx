"use client";

import { useState } from "react";
import { useClients } from "@/hooks/use-clients";
import { ClientsHeader } from "@/_components/client/ClientsHeader";
import { ClientsStats } from "@/_components/client/ClientsStats";
import { ClientCard } from "@/_components/client/ClientCard";
import { ClientFormModal } from "@/_components/client/ClientFormModal";
import { DeleteConfirmDialog } from "@/_components/client/DeleteConfirmDialog";
import { ClientsGridSkeleton, ClientsStatsSkeleton } from "@/_components/client/ClientsSkeleton";
import { ClientsEmptyState } from "@/_components/client/ClientsEmptyState";
import { Client } from "@/types/client";
import { Button } from "@/_components/ui/button";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

export default function ClientsManagementPage() {
    const {
        clients,
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
        addClient,
        updateClient,
        deleteClient
    } = useClients();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleAddClick = () => {
        setSelectedClient(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (client: Client) => {
        setSelectedClient(client);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (client: Client) => {
        setSelectedClient(client);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = async (data: Partial<Client>) => {
        if (selectedClient) {
            await updateClient(selectedClient.id, data);
        } else {
            await addClient(data);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedClient) return;
        setIsDeleting(true);
        try {
            await deleteClient(selectedClient.id);
            setIsDeleteOpen(false);
            setSelectedClient(null);
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Failed to load clients</h3>
                <p className="text-gray-500 mb-6">{error}</p>
                <Button onClick={refetch} variant="outline">Try Again</Button>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
            <ClientsHeader
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onAddClick={handleAddClick}
            />

            {loading && !stats ? <ClientsStatsSkeleton /> : <ClientsStats stats={stats} />}

            {loading ? (
                <ClientsGridSkeleton />
            ) : clients.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {clients.map(client => (
                            <ClientCard
                                key={client.id}
                                client={client}
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
                <ClientsEmptyState onAddClick={handleAddClick} />
            )}

            <ClientFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                client={selectedClient}
                onSubmit={handleFormSubmit}
            />

            <DeleteConfirmDialog
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Client"
                description={`Are you sure you want to remove ${selectedClient?.companyName}? This action cannot be undone and will permanently delete this client from your agency.`}
                itemDetails={selectedClient ? {
                    name: selectedClient.companyName,
                    roleOrCompany: selectedClient.industry,
                    avatarUrl: selectedClient.logoUrl
                } : undefined}
                isDeleting={isDeleting}
            />
        </div>
    );
}
