import * as z from "zod";

export const clientSchema = z.object({
    companyName: z.string().min(2, "Company Name must be at least 2 characters"),
    contactName: z.string().min(2, "Contact Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is too short"),
    website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    industry: z.string().min(2, "Industry is required"),
    description: z.string().max(300, "Description must be less than 300 characters").optional(),
    status: z.enum(["Active", "Inactive", "VIP", "New Client"]),
    logoUrl: z.any().optional(), // For file uploads
});

export type ClientFormValues = z.infer<typeof clientSchema>;
