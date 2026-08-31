"use client";

import { AlertTriangle } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/_components/ui/dialog";

import { Button } from "@/_components/ui/button";

interface DeleteAccountDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    deleting: boolean;
}

export function DeleteAccountDialog({ open, onClose, onConfirm, deleting }: DeleteAccountDialogProps) {
    return (
        <Dialog open={open}
            onOpenChange={(value) => { if (!value && !deleting) { onClose(); } }}
        >
            <DialogContent>
                <DialogHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-red-50">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>

                    <DialogTitle>
                        Delete Account
                    </DialogTitle>

                    <DialogDescription>
                        This action cannot be undone.
                        Your account and associated data
                        will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>

                <div className="rounded-md border border-red-100 bg-red-50 p-4">
                    <p className="text-sm leading-relax text-red-700">
                        Are you sure you want to delete your
                        account? You will be logged out
                        immediately after the deletion.
                    </p>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={deleting}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={deleting}
                    >
                        {deleting
                            ? "Deleting..."
                            : "Delete Account"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
