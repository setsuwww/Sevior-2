import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Textarea } from "@/_components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { Developer } from "../../types/developer";
import { developerSchema, DeveloperFormValues } from "../../validators/developer.validator";

interface DeveloperFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    developer?: Developer | null;
    onSubmit: (data: Partial<Developer>) => Promise<void>;
}

export function DeveloperFormModal({ isOpen, onClose, developer, onSubmit }: DeveloperFormModalProps) {
    const isEdit = !!developer;
    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<DeveloperFormValues>({
        resolver: zodResolver(developerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            phone: "",
            role: "",
            skills: "",
            bio: "",
            status: "Available"
        }
    });

    // Populate form on edit
    useEffect(() => {
        if (isOpen && developer) {
            setValue("fullName", developer.fullName);
            setValue("email", developer.email);
            setValue("phone", developer.phone || "");
            setValue("role", developer.role);
            setValue("skills", developer.skills.join(", "));
            setValue("bio", developer.bio || "");
            setValue("status", developer.status);
        } else if (isOpen && !developer) {
            reset();
        }
    }, [isOpen, developer, setValue, reset]);

    const statusVal = watch("status");

    const submitHandler = async (data: DeveloperFormValues) => {
        setSubmitting(true);
        try {
            const parsedData: Partial<Developer> = {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                role: data.role,
                status: data.status as any,
                bio: data.bio,
                skills: data.skills.split(",").map(s => s.trim()).filter(Boolean),
            };
            
            // Note: password would be handled by backend, adding here if provided
            if (data.password && !isEdit) {
                (parsedData as any).password = data.password;
            }

            await onSubmit(parsedData);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <DialogHeader>
                    <DialogTitle className="text-xl">{isEdit ? "Edit Developer" : "Add New Developer"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" {...register("fullName")} placeholder="John Doe" />
                            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" {...register("email")} placeholder="john@example.com" />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        {!isEdit && (
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
                                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" {...register("phone")} placeholder="+1 (555) 000-0000" />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Position / Role</Label>
                            <Input id="role" {...register("role")} placeholder="Senior Frontend Engineer" />
                            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={statusVal} onValueChange={(val) => setValue("status", val as any)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Available">Available</SelectItem>
                                    <SelectItem value="Busy">Busy</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="skills">Skills (Comma separated)</Label>
                        <Input id="skills" {...register("skills")} placeholder="React, Node.js, TypeScript" />
                        {errors.skills && <p className="text-sm text-red-500">{errors.skills.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Biography</Label>
                        <Textarea id="bio" {...register("bio")} placeholder="Short description about the developer..." className="h-24 resize-none" />
                        {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>Cancel</Button>
                        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white" disabled={submitting}>
                            {submitting ? "Saving..." : (isEdit ? "Update Developer" : "Add Developer")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
