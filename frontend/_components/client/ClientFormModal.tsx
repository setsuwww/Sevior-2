import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Textarea } from "@/_components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { Client } from "../../types/client";
import { clientSchema, ClientFormValues } from "../../validators/client.validator";

interface ClientFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    client?: Client | null;
    onSubmit: (data: Partial<Client>) => Promise<void>;
}

export function ClientFormModal({ isOpen, onClose, client, onSubmit }: ClientFormModalProps) {
    const isEdit = !!client;
    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            companyName: "",
            contactName: "",
            email: "",
            phone: "",
            website: "",
            industry: "",
            description: "",
            status: "New Client"
        }
    });

    useEffect(() => {
        if (isOpen && client) {
            setValue("companyName", client.companyName);
            setValue("contactName", client.contactName);
            setValue("email", client.email);
            setValue("phone", client.phone || "");
            setValue("website", client.website || "");
            setValue("industry", client.industry);
            setValue("description", client.description || "");
            setValue("status", client.status);
        } else if (isOpen && !client) {
            reset();
        }
    }, [isOpen, client, setValue, reset]);

    const statusVal = watch("status");

    const submitHandler = async (data: ClientFormValues) => {
        setSubmitting(true);
        try {
            const parsedData: Partial<Client> = {
                companyName: data.companyName,
                contactName: data.contactName,
                email: data.email,
                phone: data.phone,
                website: data.website,
                industry: data.industry,
                status: data.status as any,
                description: data.description,
            };
            
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
            <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">{isEdit ? "Edit Client" : "Add New Client"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" {...register("companyName")} placeholder="Acme Corp" />
                            {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Input id="industry" {...register("industry")} placeholder="SaaS, Manufacturing, etc." />
                            {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="contactName">Primary Contact</Label>
                            <Input id="contactName" {...register("contactName")} placeholder="Jane Doe" />
                            {errors.contactName && <p className="text-sm text-red-500">{errors.contactName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={statusVal} onValueChange={(val) => setValue("status", val as any)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="New Client">New Client</SelectItem>
                                    <SelectItem value="VIP">VIP</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" {...register("email")} placeholder="contact@company.com" />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" {...register("phone")} placeholder="+1 (555) 000-0000" />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input id="website" type="url" {...register("website")} placeholder="https://example.com" />
                        {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Company Description</Label>
                        <Textarea id="description" {...register("description")} placeholder="Short description about the client..." className="h-24 resize-none" />
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>Cancel</Button>
                        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white" disabled={submitting}>
                            {submitting ? "Saving..." : (isEdit ? "Update Client" : "Add Client")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
