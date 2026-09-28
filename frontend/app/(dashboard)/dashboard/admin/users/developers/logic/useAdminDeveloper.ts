"use client";

import { useCallback, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createDeveloper, deleteDeveloper, updateDeveloper } from "@/_lib/services/admin-service/users/developer.client";

import { getErrorMessage } from "./adminDeveloperHelpers";
import { Developer } from "@/_lib/services/admin-service/users/developer.server";

import { customToast } from "@/_components/ui/sonner";

export type DeveloperForm = {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    biography: string;
    is_active: boolean;
};

const INITIAL_FORM: DeveloperForm = {
    full_name: "",
    email: "",
    phone: "",
    password: "password123",
    biography: "",
    is_active: true,
};

export function useAdminDeveloper(initialDevelopers: Developer[]) {
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editTarget, setEditTarget] = useState<Developer | null>(null);
    const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Developer | null>(null);
    const [form, setForm] = useState<DeveloperForm>(INITIAL_FORM);
    const [formError, setFormError] = useState("");
    const [error, setError] = useState("");

    const [copiedField, setCopiedField] = useState<string | null>(null);

    const router = useRouter();

    const filteredDevelopers = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return initialDevelopers;
        }

        return initialDevelopers.filter((developer) =>
            developer.FullName.toLowerCase().includes(keyword)
        );
    }, [initialDevelopers, search]);


    const handleOpenCreate = useCallback(() => {
        setEditTarget(null);
        setForm(INITIAL_FORM);
        setFormError("");
        setShowForm(true);
    }, []);


    const handleOpenEdit = useCallback(
        (developer: Developer) => {
            setEditTarget(developer);

            setForm({
                full_name: developer.FullName,
                email: developer.Email,
                phone: developer.Phone,
                password: "",
                biography: developer.Biography,
                is_active: developer.IsActive,
            });

            setFormError("");
            setShowForm(true);
        },
        []
    );


    const handleCloseForm = useCallback(() => {
        if (submitting) {
            return;
        }

        setShowForm(false);
        setEditTarget(null);
        setForm(INITIAL_FORM);
        setFormError("");
    }, [submitting]);


    const handleFormChange = useCallback(
        (field: keyof DeveloperForm, value: string | boolean) => {
            setForm((current) => ({
                ...current,
                [field]: value,
            }));
        },
        []
    );


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

                customToast.warning(
                    "Incomplete form",
                    "Please enter the developer's full name."
                );

                return;
            }

            if (!email) {
                setFormError("Email is required.");

                customToast.warning(
                    "Incomplete form",
                    "Please enter the developer's valid email."
                );

                return;
            }

            try {
                setSubmitting(true);

                if (editTarget) {
                    await updateDeveloper(
                        editTarget.ID,
                        {
                            full_name: fullName,
                            email,
                            phone,
                            biography,
                            is_active: form.is_active,
                        }
                    );
                    customToast.success(
                        "Developer updated",
                        `${fullName}'s profile has been updated successfully.`
                    );
                }
                else {
                    await createDeveloper({
                        full_name: fullName,
                        email,
                        phone,
                        password: form.password,
                        biography,
                    });
                    customToast.success(
                        "Developer created",
                        `${fullName}'s profile has been created successfully.`
                    );
                }

                setShowForm(false);
                setEditTarget(null);
                setForm(INITIAL_FORM);
                setFormError("");

                router.push("/dashboard/admin/users/developers");
            }
            catch (err) {
                const message = getErrorMessage(
                    err, editTarget ? "Failed to update developer." : "Failed to create developer."
                );

                setFormError(message);

                customToast.error(
                    "Failed to update developer",
                    message
                );
            } finally {
                setSubmitting(false);
            }
        },
        [editTarget, form, router]
    );


    const handleOpenDetail = useCallback(
        (developer: Developer) => {
            setSelectedDeveloper(developer);
        },
        []
    );

    const handleCloseDetail = useCallback(() => {
        setSelectedDeveloper(null);
    }, []);


    const handleOpenDelete = useCallback(
        (developer: Developer) => {setDeleteTarget(developer)}, []
    );


    const handleCloseDelete = useCallback(() => {
        if (deleting) {return}
        setDeleteTarget(null);
    }, [deleting]);


    const handleDelete = useCallback(
        async () => {
            if (!deleteTarget) {
                return;
            }

            const developerName = deleteTarget.FullName;

            try {
                setDeleting(true);
                setError("");

                await deleteDeveloper(deleteTarget.ID);

                setDeleteTarget(null);

                customToast.success(
                    "Developer deleted",
                    `${developerName}'s profile has been deleted.`
                );

                router.push("/dashboard/admin/users/developers");
            }
            catch (err) {
                const message = getErrorMessage(
                    err, "Failed to delete developer."
                );

                setError(message);

                customToast.error(
                    "Failed",
                    message
                );
            }
            finally {setDeleting(false)}
        },
        [deleteTarget,router]
    );


    const handleClearError = useCallback(() => {
        setError("");
    }, []);


    const handleCopy = useCallback(
        async (
            value: string,
            field: string
        ) => {
            if (!value) {
                return;
            }

            try {
                await navigator.clipboard.writeText(
                    value
                );

                setCopiedField(field);

                setTimeout(() => {
                    setCopiedField(null);
                }, 1500);
            } catch (err) {
                console.error(
                    "Failed to copy:",
                    err
                );
            }
        },
        []
    );


    return {
        initialDevelopers,
        filteredDevelopers,

        form,
        formError,
        editTarget,
        showForm,

        selectedDeveloper,

        deleteTarget,

        submitting,
        deleting,

        search,
        setSearch,

        error,

        copiedField,
        handleCopy,

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
