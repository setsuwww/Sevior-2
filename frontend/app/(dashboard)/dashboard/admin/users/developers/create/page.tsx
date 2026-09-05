"use client";

import { Code2 } from "lucide-react";

import { SectionHeader } from "@/_components/ui/common/SectionHeader";

import { useAdminDeveloper } from "../logic/useAdminDeveloper";
import { DeveloperCreateForm } from "./DeveloperCreateForm";

export default function DeveloperCreatePage() {
    const {
        form,
        formError,
        submitting,

        handleFormChange,
        handleSubmit,
    } = useAdminDeveloper();

    return (
        <div className="p-6">
            <div className="mb-6">
                <SectionHeader
                    icon={Code2}
                    title="Create Developer"
                    description="Create a new developer account for your agency."
                />
            </div>

            <DeveloperCreateForm
                form={form}
                formError={formError}
                submitting={submitting}
                handleFormChange={handleFormChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}
