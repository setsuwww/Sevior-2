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

export interface ProjectRequest {
    id: number;
    clientId: number;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientImage: string;
    title: string;
    description: string;
    category: string;
    budgetMin: number | null;
    budgetMax: number | null;
    deadline: string | null;
    attachmentUrl: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectRequestListResponse {
    data: ProjectRequest[];
}

export interface ProjectRequestDetail {
    id: number;
    clientId: number;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientImage: string;
    title: string;
    description: string;
    category: string;
    budgetMin: number | null;
    budgetMax: number | null;
    deadline: string | null;
    attachmentUrl: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectRequestCountResponse {
    count: number;
}
