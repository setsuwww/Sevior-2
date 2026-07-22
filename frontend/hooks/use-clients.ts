import { useState, useEffect, useCallback } from "react";
import { Client, ClientStats } from "../types/client";
import { clientService } from "../services/client.service";
import { toast } from "sonner";

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [stats, setStats] = useState<ClientStats | null>(null);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchClients = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await clientService.getClients(search, statusFilter, sortBy, page, limit);
            setClients(res.data);
            setStats(res.stats);
            setTotal(res.total);
        } catch (err: any) {
            setError(err.message || "Failed to fetch clients");
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, sortBy, page]);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    const addClient = async (data: Partial<Client>) => {
        try {
            await clientService.createClient(data);
            toast.success("Client added successfully");
            fetchClients();
        } catch (err: any) {
            toast.error(err.message || "Failed to add client");
            throw err;
        }
    };

    const updateClient = async (id: string, data: Partial<Client>) => {
        try {
            await clientService.updateClient(id, data);
            toast.success("Client updated successfully");
            fetchClients();
        } catch (err: any) {
            toast.error(err.message || "Failed to update client");
            throw err;
        }
    };

    const deleteClient = async (id: string) => {
        try {
            await clientService.deleteClient(id);
            toast.success("Client deleted successfully");
            fetchClients();
        } catch (err: any) {
            toast.error(err.message || "Failed to delete client");
            throw err;
        }
    };

    return {
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
        refetch: fetchClients,
        addClient,
        updateClient,
        deleteClient
    };
}
