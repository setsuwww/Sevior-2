import { api } from "@/_lib/axiosInstance";

export async function approveProjectRequest(
    id: number
): Promise<void> {
    await api.patch(
        `/api/v1/agency-admin/project-requests/${id}/approve`
    );
}

export async function rejectProjectRequest(
    id: number
): Promise<void> {
    await api.patch(
        `/api/v1/agency-admin/project-requests/${id}/reject`
    );
}
