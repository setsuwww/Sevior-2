// @/types/Header-interface.ts
import React from "react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface ToolbarFilter<T = string> {
  label: string;
  options: FilterOption[];
  value: T;
  onChange: (val: T) => void;
}

export interface ToolbarAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?: "default" | "ghost" | "outline" | "destructive";
}

export interface ToolbarProps {
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  filters?: ToolbarFilter<string>[];
  actions?: ToolbarAction[];
  selectedCount?: number;
  totalCount?: number;
}
