"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import {
    createDeveloper,
    updateDeveloper,
} from "@/_lib/services/admin-service/users/developer.client";

import type { Developer } from "@/_lib/services/admin-service/users/developer.server";

import { getErrorMessage } from "./adminDeveloperHelpers";

import { customToast } from "@/_components/ui/sonner";

export interface DeveloperForm {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    biography: string;
    is_active: boolean;
}

const INITIAL_FORM: DeveloperForm = {
    full_name: "",
    email: "",
    phone: "",
    password: "password123",
    biography: "",
    is_active: true,
};

export function useDeveloperForm(
    developer?: Developer | null
) {
    const router = useRouter();

    const [form, setForm] = useState<DeveloperForm>(() => {
        if (!developer) {
            return INITIAL_FORM;
        }

        return {
            full_name: developer.FullName,
            email: developer.Email,
            phone: developer.Phone,
            password: "",
            biography: developer.Biography,
            is_active: developer.IsActive,
        };
    });

    const [formError, setFormError] =
        useState<string | null>(null);

    const [submitting, setSubmitting] =
        useState(false);

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

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            setFormError(null);

            const fullName = form.full_name.trim();
            const email = form.email.trim();
            const phone = form.phone.trim();
            const biography = form.biography.trim();

            if (!fullName) {
                const message =
                    "Full name is required.";

                setFormError(message);

                customToast.warning(
                    "Incomplete form",
                    "Please enter the developer's full name."
                );

                return;
            }

            if (!email) {
                const message =
                    "Email is required.";

                setFormError(message);

                customToast.warning(
                    "Incomplete form",
                    "Please enter the developer's email."
                );

                return;
            }

            try {
                setSubmitting(true);

                if (developer) {
                    await updateDeveloper(
                        developer.ID,
                        {
                            full_name: fullName,
                            email,
                            phone,
                            biography,
                            is_active:
                                form.is_active,
                        }
                    );

                    customToast.success(
                        "Developer updated",
                        `${fullName}'s profile has been updated successfully.`
                    );
                } else {
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

                router.push(
                    "/dashboard/admin/users/developers"
                );

                router.refresh();
            } catch (err) {
                const message =
                    getErrorMessage(
                        err, "Failed to create developer."
                    );

                setFormError(message);

                customToast.error("Failed to create developer",
                    message
                );
            } finally {
                setSubmitting(false);
            }
        },
        [developer, form, router]
    );

    return {
        form,
        formError,
        submitting,

        handleFormChange,
        handleSubmit,
    };
}
