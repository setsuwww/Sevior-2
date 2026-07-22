import { Search, Plus, Users } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { CLIENT_STATUS_OPTIONS, CLIENT_SORT_OPTIONS } from "../../_constants/filters/client-filters";

interface ClientsHeaderProps {
    search: string;
    setSearch: (val: string) => void;
    statusFilter: string;
    setStatusFilter: (val: string) => void;
    sortBy: string;
    setSortBy: (val: string) => void;
    onAddClick: () => void;
}

export function ClientsHeader({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    onAddClick
}: ClientsHeaderProps) {
    return (
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Users className="w-8 h-8 text-teal-600 dark:text-teal-500" /> Clients
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage your agency clients.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Search clients..."
                        className="pl-9 w-full sm:w-[250px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-teal-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[140px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-teal-500">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {CLIENT_STATUS_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[160px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-teal-500">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        {CLIENT_SORT_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    onClick={onAddClick}
                    className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-all"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                </Button>
            </div>
        </div>
    );
}
