export type ClientStatus = "Active" | "Inactive" | "VIP" | "New Client";

export interface Client {
    id: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    website?: string;
    industry: string;
    status: ClientStatus;
    joinedDate: string;
    totalProjects: number;
    completedProjects: number;
    pendingProjects: number;
    revenue: number;
    description: string;
    logoUrl?: string;
    invoicesCount?: number;
    recentRequestsCount?: number;
}

export interface ClientStats {
    totalClients: number;
    activeClients: number;
    totalProjects: number;
    totalRevenueGenerated: number;
}
