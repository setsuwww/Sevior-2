"use client";

import {
    Lock,
    LogOut,
    Trash2,
} from "lucide-react";

import { Button } from "@/_components/ui/button";

interface ProfileFooterProps {
    onChangePassword: () => void;
    onLogout: () => void;
    onDeleteAccount: () => void;
    loggingOut: boolean;
}

export default function ProfileFooterSection({
    onChangePassword,
    onLogout,
    onDeleteAccount,
    loggingOut,
}: ProfileFooterProps) {
    return (
        <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
            <Button
                type="button"
                onClick={onChangePassword}
                variant="outline"
                size="sm"
            >
                <Lock className="h-4 w-4" />
                Change Password
            </Button>

            <div className="ml-auto flex gap-3">
                <Button
                    type="button"
                    onClick={onLogout}
                    disabled={loggingOut}
                    variant="outline"
                    size="sm"
                    className="text-red-500"
                >
                    <LogOut className="h-4 w-4" />

                    {loggingOut
                        ? "Logging out..."
                        : "Logout"}
                </Button>

                <Button
                    type="button"
                    onClick={onDeleteAccount}
                    variant="outline"
                    size="sm"
                    className="text-red-500"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                </Button>
            </div>
        </div>
    );
}
