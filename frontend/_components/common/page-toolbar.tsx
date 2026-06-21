// app/_components/common/table-toolbar.tsx
"use client";

import { Card } from "@/_components/ui/card";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/_components/ui/select";
import { Filter, Search } from "lucide-react";
import { ToolbarProps } from "@/types/Header-interface";

export default function PageToolbar({
  searchPlaceholder = "Search...",
  onSearch,
  filters = [],
  actions = [],
  selectedCount = 0,
  totalCount = 0,
}: ToolbarProps) {
  return (
    <Card className="border border-gray-200 shadow-none dark:border-gray-800">
      <div className="flex flex-col lg:flex-row gap-4 px-4 py-4">
        {/* Search */}
        {onSearch && (
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:border-teal-500 focus:ring-teal-500"
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters?.map((f) => (
            <Select key={f.label} onValueChange={(val) => f.onChange(val)}>
              <SelectTrigger className="w-fit bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder={f.label} />
              </SelectTrigger>
              <SelectContent>
                {f.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>

      {/* Actions + Selection Info */}
      {actions.length > 0 && (
        <div className="flex flex-wrap justify-between items-center pt-4 px-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {selectedCount} of {totalCount} selected
          </p>
          <div className="flex gap-2">
            {actions.map((a) => (
              <Button
                key={a.label}
                onClick={a.onClick}
                disabled={a.disabled}
                variant={a.variant || "outline"}
                size="sm"
                className="flex items-center gap-1"
              >
                {a.icon}
                {a.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
