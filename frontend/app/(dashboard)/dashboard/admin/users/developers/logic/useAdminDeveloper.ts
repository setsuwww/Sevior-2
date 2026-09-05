"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type FormEvent,
} from "react";

import {
    createDeveloper,
    deleteDeveloper,
    fetchDeveloperById,
    fetchDevelopers,
    updateDeveloper,
    type Developer,
} from "@/_lib/services/admin/users/developer.service";

export type DeveloperForm = {
    full_name: string;
    email: string;
    phone: string;
    biography: string;
    is_active: boolean;
};

const emptyForm: DeveloperForm = {
    full_name: "",
    email: "",
    phone: "",
    biography: "",
    is_active: true,
};

export function useAdminDeveloper() {
    // ==========================================================
    // STATE
    // ==========================================================

    const [developers, setDevelopers] = useState<Developer[]>([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null);
    const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState<Developer | null>(null);
    const [form, setForm] = useState<DeveloperForm>(emptyForm);

    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");

    // ==========================================================
    // LOAD DEVELOPERS
    // ==========================================================

    const loadDevelopers = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await fetchDevelopers();

            setDevelopers(data);
        }
        catch (err) {
            setError(getErrorMessage(err, "Failed to load developers."));
        }
        finally { setLoading(false) }
    }, []);

    useEffect(() => {
        loadDevelopers();
    }, [loadDevelopers]);

    // ==========================================================
    // SEARCH
    // ==========================================================

    const filteredDevelopers = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return developers;
        }

        return developers.filter((developer) =>
            developer.FullName.toLowerCase().includes(keyword)
        );
    }, [developers, search]);

    // ==========================================================
    // OPEN CREATE
    // ==========================================================

    const handleOpenCreate = useCallback(() => {
        setEditingDeveloper(null);
        setForm(emptyForm);
        setFormError("");
        setShowForm(true);
    }, []);

    // ==========================================================
    // OPEN EDIT
    // ==========================================================

    const handleOpenEdit = useCallback(
        (developer: Developer) => {
            setEditingDeveloper(developer);

            setForm({
                full_name: developer.FullName,
                email: developer.Email,
                phone: developer.Phone,
                biography: developer.Biography,
                is_active: developer.IsActive,
            });

            setFormError("");
            setShowForm(true);
        },
        []
    );

    // ==========================================================
    // CLOSE FORM
    // ==========================================================

    const handleCloseForm = useCallback(() => {
        if (submitting) {
            return;
        }

        setShowForm(false);
        setEditingDeveloper(null);
        setForm(emptyForm);
        setFormError("");
    }, [submitting]);

    // ==========================================================
    // FORM CHANGE
    // ==========================================================

    const handleFormChange = useCallback(
        (
            field: keyof DeveloperForm,
            value: string | boolean
        ) => {
            setForm((current) => ({
                ...current,
                [field]: value,
            }));
        },
        []
    );

    // ==========================================================
    // CREATE / UPDATE
    // ==========================================================

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            setFormError("");

            const fullName = form.full_name.trim();
            const email = form.email.trim();
            const phone = form.phone.trim();
            const biography = form.biography.trim();

            if (!fullName) {
                setFormError("Full name is required.");
                return;
            }

            if (!email) {
                setFormError("Email is required.");
                return;
            }

            try {
                setSubmitting(true);

                // ==================================================
                // UPDATE
                // ==================================================

                if (editingDeveloper) {
                    await updateDeveloper(
                        editingDeveloper.ID,
                        {
                            full_name: fullName,
                            email,
                            phone,
                            biography,
                            is_active: form.is_active,
                        }
                    );
                }

                // ==================================================
                // CREATE
                // ==================================================

                else {
                    await createDeveloper({
                        full_name: fullName,
                        email,
                        phone,
                        biography,
                    });
                }

                await loadDevelopers();

                setShowForm(false);
                setEditingDeveloper(null);
                setForm(emptyForm);
                setFormError("");
            } catch (err) {
                console.error(err);

                setFormError(
                    getErrorMessage(
                        err,
                        editingDeveloper
                            ? "Failed to update developer."
                            : "Failed to create developer."
                    )
                );
            } finally {
                setSubmitting(false);
            }
        },
        [
            editingDeveloper,
            form,
            loadDevelopers,
        ]
    );

    // ==========================================================
    // OPEN DETAIL
    // ==========================================================

    const handleOpenDetail = useCallback(
        async (developer: Developer) => {
            try {
                setDetailLoading(true);
                setSelectedDeveloper(null);
                setError("");

                const detail = await fetchDeveloperById(
                    developer.ID
                );

                setSelectedDeveloper(detail);
            } catch (err) {
                console.error(err);

                setError(
                    getErrorMessage(
                        err,
                        "Failed to load developer detail."
                    )
                );
            } finally {
                setDetailLoading(false);
            }
        },
        []
    );

    // ==========================================================
    // CLOSE DETAIL
    // ==========================================================

    const handleCloseDetail = useCallback(() => {
        if (detailLoading) {
            return;
        }

        setSelectedDeveloper(null);
    }, [detailLoading]);

    // ==========================================================
    // OPEN DELETE
    // ==========================================================

    const handleOpenDelete = useCallback(
        (developer: Developer) => {
            setDeleteTarget(developer);
        },
        []
    );

    // ==========================================================
    // CLOSE DELETE
    // ==========================================================

    const handleCloseDelete = useCallback(() => {
        if (deleting) {
            return;
        }

        setDeleteTarget(null);
    }, [deleting]);

    // ==========================================================
    // DELETE
    // ==========================================================

    const handleDelete = useCallback(async () => {
        if (!deleteTarget) {
            return;
        }

        try {
            setDeleting(true);
            setError("");

            await deleteDeveloper(deleteTarget.ID);

            setDeleteTarget(null);

            await loadDevelopers();
        } catch (err) {
            console.error(err);

            setError(
                getErrorMessage(
                    err,
                    "Failed to delete developer."
                )
            );
        } finally {
            setDeleting(false);
        }
    }, [deleteTarget, loadDevelopers]);

    // ==========================================================
    // CLEAR ERROR
    // ==========================================================

    const handleClearError = useCallback(() => {
        setError("");
    }, []);

    // ==========================================================
    // RETURN
    // ==========================================================

    return {
        // Data
        developers,
        filteredDevelopers,

        // Loading
        loading,
        submitting,
        deleting,
        detailLoading,

        // Search
        search,
        setSearch,

        // Form
        form,
        formError,
        editingDeveloper,
        showForm,

        // Detail
        selectedDeveloper,

        // Delete
        deleteTarget,

        // General error
        error,

        // Actions
        loadDevelopers,
        handleOpenCreate,
        handleOpenEdit,
        handleCloseForm,
        handleFormChange,
        handleSubmit,

        handleOpenDetail,
        handleCloseDetail,

        handleOpenDelete,
        handleCloseDelete,
        handleDelete,

        handleClearError,
    };
}

// ==========================================================
// HELPERS
// ==========================================================

export function getInitials(name: string) {
    const words = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 0) {
        return "?";
    }

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function formatDate(date: string) {
    if (!date) {
        return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return parsedDate.toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function getErrorMessage(
    error: unknown,
    fallback: string
) {
    if (
        typeof error === "object" &&
        error !== null
    ) {
        const axiosError = error as {
            response?: {
                data?: {
                    error?: string;
                    message?: string;
                };
            };
            message?: string;
        };

        const responseError =
            axiosError.response?.data?.error;

        if (responseError) {
            return responseError;
        }

        const responseMessage =
            axiosError.response?.data?.message;

        if (responseMessage) {
            return responseMessage;
        }

        if (axiosError.message) {
            return axiosError.message;
        }
    }

    return fallback;
}
