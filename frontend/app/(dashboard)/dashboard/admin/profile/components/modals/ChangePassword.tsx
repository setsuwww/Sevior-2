"use client";

import { LockKeyhole } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/_components/ui/dialog";

import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Button } from "@/_components/ui/button";

import {
    FieldErrors,
    UseFormRegister,
} from "react-hook-form";
import { PasswordFormValues } from "../../logic/useAdminProfile";

interface ChangePasswordDialogProps {
    open: boolean;
    onClose: () => void;

    register: UseFormRegister<PasswordFormValues>;
    errors: FieldErrors<PasswordFormValues>;

    onSubmit: React.FormEventHandler<HTMLFormElement>;
    submitting: boolean;
}

export function ChangePasswordDialog({ open, onClose, register, errors, onSubmit, submitting }: ChangePasswordDialogProps) {
    return (
        <Dialog open={open}
            onOpenChange={(value) => { if (!value) onClose(); }}
        >
            <DialogContent>
                <DialogHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-teal-50">
                        <LockKeyhole className="h-5 w-5 text-teal-600" />
                    </div>

                    <DialogTitle>
                        Change Password
                    </DialogTitle>

                    <DialogDescription>
                        Update your account password.
                        Make sure your new password is
                        strong and easy for you to remember.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={onSubmit}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                            Current Password
                        </Label>

                        <Input
                            id="currentPassword"
                            type="password"
                            placeholder="Enter current password"
                            {...register(
                                "currentPassword",
                                {
                                    required:
                                        "Current password is required.",
                                }
                            )}
                            aria-invalid={
                                !!errors.currentPassword
                            }
                        />

                        {errors.currentPassword && (
                            <p className="text-sm text-red-500">
                                {
                                    errors.currentPassword
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">
                            New Password
                        </Label>

                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            {...register(
                                "newPassword",
                                {
                                    required:
                                        "New password is required.",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters.",
                                    },
                                }
                            )}
                            aria-invalid={
                                !!errors.newPassword
                            }
                        />

                        {errors.newPassword && (
                            <p className="text-sm text-red-500">
                                {
                                    errors.newPassword
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                            Confirm New Password
                        </Label>

                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            {...register(
                                "confirmPassword",
                                {
                                    required:
                                        "Password confirmation is required.",
                                    validate: (
                                        value,
                                        formValues
                                    ) =>
                                        value ===
                                            formValues.newPassword
                                            ? true
                                            : "Password confirmation does not match.",
                                }
                            )}
                            aria-invalid={
                                !!errors.confirmPassword
                            }
                        />

                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                                {
                                    errors.confirmPassword
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="bg-teal-600 hover:bg-teal-700"
                        >
                            {submitting
                                ? "Changing..."
                                : "Change Password"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
