import * as z from "zod";

export const developerSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").optional(), // Optional for edit
    phone: z.string().min(10, "Phone number is too short"),
    role: z.string().min(2, "Position/Role is required"),
    skills: z.string().min(2, "At least one skill is required (comma separated)"),
    bio: z.string().max(300, "Bio must be less than 300 characters").optional(),
    status: z.enum(["Active", "Inactive", "Available", "Busy"]),
    avatarUrl: z.any().optional(), // For file uploads
});

export type DeveloperFormValues = z.infer<typeof developerSchema>;
