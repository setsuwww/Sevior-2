import React from "react";
import { FolderKanban, Plus } from "lucide-react";
import { Button } from "@/_components/ui/button";

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                <FolderKanban className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-sm text-gray-500 max-w-sm mb-8">
                It looks like there are no projects matching your criteria. Create a new project to get started.
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Create First Project
            </Button>
        </div>
    );
}
