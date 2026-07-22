export type DeveloperStatus = "Active" | "Inactive" | "Available" | "Busy";

export interface Developer {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    status: DeveloperStatus;
    joinedDate: string;
    performanceRating: number;
    currentProjects: number;
    completedProjects: number;
    bio: string;
    skills: string[];
    avatarUrl?: string;
    taskCompletionRate?: number;
}

export interface DeveloperStats {
    totalDevelopers: number;
    activeDevelopers: number;
    inactiveDevelopers: number;
    averagePerformanceRating: number;
}
