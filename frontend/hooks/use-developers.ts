import { useState, useEffect, useCallback } from "react";
import { Developer, DeveloperStats } from "../types/developer";
import { developerService } from "../services/developer.service";
import { toast } from "sonner";

export function useDevelopers() {
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [stats, setStats] = useState<DeveloperStats | null>(null);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters & Pagination
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchDevelopers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await developerService.getDevelopers(search, statusFilter, sortBy, page, limit);
            setDevelopers(res.data);
            setStats(res.stats);
            setTotal(res.total);
        } catch (err: any) {
            setError(err.message || "Failed to fetch developers");
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, sortBy, page]);

    useEffect(() => {
        fetchDevelopers();
    }, [fetchDevelopers]);

    const addDeveloper = async (data: Partial<Developer>) => {
        try {
            await developerService.createDeveloper(data);
            toast.success("Developer added successfully");
            fetchDevelopers();
        } catch (err: any) {
            toast.error(err.message || "Failed to add developer");
            throw err;
        }
    };

    const updateDeveloper = async (id: string, data: Partial<Developer>) => {
        try {
            await developerService.updateDeveloper(id, data);
            toast.success("Developer updated successfully");
            fetchDevelopers();
        } catch (err: any) {
            toast.error(err.message || "Failed to update developer");
            throw err;
        }
    };

    const deleteDeveloper = async (id: string) => {
        try {
            await developerService.deleteDeveloper(id);
            toast.success("Developer deleted successfully");
            fetchDevelopers();
        } catch (err: any) {
            toast.error(err.message || "Failed to delete developer");
            throw err;
        }
    };

    return {
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
        refetch: fetchDevelopers,
        addDeveloper,
        updateDeveloper,
        deleteDeveloper
    };
}
