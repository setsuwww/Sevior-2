"use client";

import { Users, Download, Trash2 } from "lucide-react";
import PageHeader from "@/_components/common/page-header";
import PageToolbar from "@/_components/common/page-toolbar";
import { FilterOption } from "@/types/Header-interface";

interface UserHeaderProps {
  selectedCount: number;
  totalCount: number;

  onSearch: (query: string) => void;

  title?: string;
  description?: string;

  statusOptions: FilterOption[];
  statusFilter: string;
  onFilterStatus: (val: string) => void;

  onExport: () => void;
  onDeleteSelected: () => void;
  onDeleteAll: () => void;
  onAddUser: () => void;
}

export default function UserHeader({
  selectedCount, totalCount,
  onSearch,
  title = "Users", description = "Manage and organize your users",
  statusOptions, statusFilter, onFilterStatus,
  onExport, onDeleteSelected, onDeleteAll, onAddUser,
}: UserHeaderProps) {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={Users}
        title={title}
        description={description}
        action={{ label: "Add User", onClick: onAddUser }}
      />

      <PageToolbar
        searchPlaceholder="Search users..."
        onSearch={onSearch}
        filters={[
          { label: "Status", options: statusOptions, value: statusFilter, onChange: onFilterStatus },
        ]}
        actions={[
          {
            label: "Export",
            onClick: onExport,
            icon: <Download /> },
          {
            label: "Delete Selected",
            onClick: onDeleteSelected,
            icon: <Trash2 />, disabled: selectedCount === 0,
          },
          {
            label: "Delete All",
            onClick: onDeleteAll,
            icon: <Trash2 /> },
        ]}
        selectedCount={selectedCount}
        totalCount={totalCount}
      />
    </div>
  );
}
