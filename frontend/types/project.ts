export interface ProjectRequest {
    id: number;
    agencyId: number;
    clientId: number;
    title: string;
    description: string;
    category: string;
    budgetMin: number | null;
    budgetMax: number | null;
    deadline: string | null;
    attachmentUrl: string;
    status: string;
    createdAt: string;
}

export interface Project {
    id: number;
    agencyId: number;
    projectRequestId: number | null;
    clientId: number | null;
    title: string;
    description: string;
    budget: number | null;
    progress: number | null;
    currentPhase: string;
    startDate: string | null;
    endDate: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
}
