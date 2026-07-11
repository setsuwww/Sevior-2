export type ProjectStatus = "Pending" | "In Progress" | "Success" | "Failed" | "Cancelled";

export interface Developer {
    id: string;
    name: string;
    avatar: string;
    role: string;
}

export interface Client {
    id: string;
    name: string;
}

export interface Project {
    id: string; // Used to avoid exposing internal DB ID in UI easily, but mapped to uint if needed.
    agencyId: number;
    title: string;
    description: string;
    budget: number;
    progress: number;
    startDate: string; // ISO string for easy manipulation
    endDate: string; // Deadline
    status: ProjectStatus;
    client: Client;
    developers: Developer[];
}
