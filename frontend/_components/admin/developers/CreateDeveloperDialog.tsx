"use client";

import { useState } from "react";
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

interface CreateDeveloperDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function CreateDeveloperDialog({ open, onOpenChange, onSuccess }: CreateDeveloperDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        biography: "",
        password: "",
        is_active: true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.full_name || !formData.email || !formData.password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);
            await adminDeveloperService.createDeveloper(formData);
            toast.success("Developer created successfully");
            onSuccess();
            onOpenChange(false);
            setFormData({
                full_name: "",
                email: "",
                phone: "",
                biography: "",
                password: "",
                is_active: true,
            });
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to create developer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">Create New Developer</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                            id="full_name"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            placeholder="John Doe"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 234 567 8900"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Minimum 6 characters"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="biography">Biography</Label>
                        <Textarea
                            id="biography"
                            value={formData.biography}
                            onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                            placeholder="Brief description about the developer..."
                            className="resize-none h-24"
                        />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                            id="is_active"
                            checked={formData.is_active}
                            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
                        />
                        <Label htmlFor="is_active" className="cursor-pointer">Active Account</Label>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white">
                            {loading ? "Creating..." : "Create Developer"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
