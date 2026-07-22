import { Building2, Plus } from "lucide-react";
import { Button } from "@/_components/ui/button";

export function ClientsEmptyState({ onAddClick }: { onAddClick: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No clients found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                You haven't added any clients yet, or no clients match your current search and filter criteria.
            </p>
            <Button onClick={onAddClick} className="bg-teal-600 hover:bg-teal-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Client
            </Button>
        </div>
    );
}
