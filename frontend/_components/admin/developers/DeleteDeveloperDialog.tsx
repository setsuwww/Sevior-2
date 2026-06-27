"use client";

import { useState } from "react";
import { Button } from "@/_components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
} from "@/_components/ui/alert-dialog";
import { adminDeveloperService } from "@/_lib/services/admin/developer.service";
import toast from "react-hot-toast";

interface DeleteDeveloperDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    developer: any;
    onSuccess: () => void;
}

export default function DeleteDeveloperDialog({ open, onOpenChange, developer, onSuccess }: DeleteDeveloperDialogProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!developer) return;
        
        try {
            setLoading(true);
            await adminDeveloperService.deleteDeveloper(developer.ID);
            toast.success("Developer deleted successfully");
            onSuccess();
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to delete developer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold text-gray-900">
                        Delete {developer?.FullName}?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-500">
                        This action cannot be undone. This will permanently delete the developer account and remove their access to the platform.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-6">
                    <Button variant="outline" disabled={loading} onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="destructive" 
                        disabled={loading} 
                        onClick={handleDelete}
                    >
                        {loading ? "Deleting..." : "Delete Developer"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
