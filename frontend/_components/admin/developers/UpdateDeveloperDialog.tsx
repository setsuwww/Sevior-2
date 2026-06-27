"use client";

import { useState, useEffect } from "react";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Textarea } from "@/_components/ui/textarea";
import { Checkbox } from "@/_components/ui/checkbox";
import { Label } from "@/_components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/_components/ui/dialog";
import { adminDeveloperService } from "@/_lib/services/admin/developer.service";
import toast from "react-hot-toast";

interface UpdateDeveloperDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    developer: any;
    onSuccess: () => void;
}

export default function UpdateDeveloperDialog({ open, onOpenChange, developer, onSuccess }: UpdateDeveloperDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        biography: "",
        password: "",
        is_active: true,
    });

    useEffect(() => {
        if (developer && open) {
            setFormData({
                full_name: developer.FullName || "",
                email: developer.Email || "",
                phone: developer.Phone || "",
                biography: developer.Biography || "",
                password: "", // intentionally left blank
                is_active: developer.IsActive ?? true,
            });
        }
    }, [developer, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.full_name || !formData.email) {
            toast.error("Name and Email are required.");
            return;
        }

        if (formData.password && formData.password.length < 6) {
            toast.error("Password must be at least 6 characters if provided.");
            return;
        }

        try {
            setLoading(true);
            // Construct payload: only send password if it's changed
            const payload: any = {
                full_name: formData.full_name,
                email: formData.email,
                phone: formData.phone,
                biography: formData.biography,
                is_active: formData.is_active,
            };
            if (formData.password) {
                payload.password = formData.password;
            }

            await adminDeveloperService.updateDeveloper(developer.ID, payload);
            toast.success("Developer updated successfully");
            onSuccess();
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to update developer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">Update Developer</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="update_full_name">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                            id="update_full_name"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="update_email">Email <span className="text-red-500">*</span></Label>
                        <Input
                            id="update_email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="update_phone">Phone</Label>
                        <Input
                            id="update_phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="update_password">New Password <span className="text-gray-400 font-normal">(Optional)</span></Label>
                        <Input
                            id="update_password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Leave blank to keep current password"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="update_biography">Biography</Label>
                        <Textarea
                            id="update_biography"
                            value={formData.biography}
                            onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                            className="resize-none h-24"
                        />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                            id="update_is_active"
                            checked={formData.is_active}
                            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
                        />
                        <Label htmlFor="update_is_active" className="cursor-pointer">Active Account</Label>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white">
                            {loading ? "Updating..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
