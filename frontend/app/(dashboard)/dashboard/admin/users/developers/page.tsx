"use client";

import Link from "next/link";
import { Code2, Plus } from "lucide-react";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { SectionHeader } from "@/_components/ui/common/SectionHeader";

import { useAdminDeveloper } from "./logic/useAdminDeveloper";

import { DevelopersTable } from "./components/DevelopersTable";
import { DeveloperEditModal } from "./components/modals/DeveloperEditModal";
import { DeveloperDetailModal } from "./components/modals/DeveloperDetailModal";
import { DeveloperDeleteModal } from "./components/modals/DeveloperDeleteModal";

import DeveloperTableSkeleton from "./table-skeleton";

export default function DevelopersPage() {
  const {
    filteredDevelopers,

    loading,
    submitting,
    deleting,
    detailLoading,

    search,
    setSearch,

    form,
    formError,
    editingDeveloper,

    selectedDeveloper,
    deleteTarget,

    error,

    copiedField,
    handleCopy,

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
  } = useAdminDeveloper();

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <SectionHeader
          icon={Code2}
          title="Developers"
          description="Manage agency developers."
        />

        <Link href="/dashboard/admin/users/developers/create">
          <Button type="button">
            <Plus />
            Add Developer
          </Button>
        </Link>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 flex items-center justify-between rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <span>{error}</span>

          <button type="button" onClick={handleClearError} className="ml-4 font-medium text-red-700">
            ✕
          </button>
        </div>
      )}

      {/* SEARCH */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Input value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search developer by name..."
            type="text"
            typeSearch
          />
        </div>

        {!loading && (
          <p className="shrink-0 text-sm text-gray-500">
            {filteredDevelopers.length}{" "}
            {filteredDevelopers.length === 1 ? "developer" : "developers"}
          </p>
        )}
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
        {loading ? (
          <DeveloperTableSkeleton />
        ) : (
          <DevelopersTable
            developers={filteredDevelopers}
            copiedField={copiedField}
            handleCopy={handleCopy}
            handleOpenEdit={handleOpenEdit}
            handleOpenDetail={handleOpenDetail}
            handleOpenDelete={handleOpenDelete}
          />
        )}
      </div>

      {/* EDIT */}
      {editingDeveloper && (
        <DeveloperEditModal
          developer={editingDeveloper}
          form={form}
          formError={formError}
          submitting={submitting}
          handleClose={handleCloseForm}
          handleFormChange={handleFormChange}
          handleSubmit={handleSubmit}
        />
      )}

      {/* DETAIL */}
      {(detailLoading || selectedDeveloper) && (
        <DeveloperDetailModal
          developer={selectedDeveloper}
          loading={detailLoading}
          onClose={handleCloseDetail}
        />
      )}

      {/* DELETE */}
      {deleteTarget && (
        <DeveloperDeleteModal
          developer={deleteTarget}
          deleting={deleting}
          onClose={handleCloseDelete}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
