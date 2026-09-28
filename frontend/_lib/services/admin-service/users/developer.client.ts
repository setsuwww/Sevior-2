"use client";

import { api } from "@/_lib/axiosInstance";
import { Developer } from "./developer.server";

export interface CreateDeveloperPayload {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    biography: string;
}

export interface UpdateDeveloperPayload {
    full_name: string;
    email: string;
    phone: string;
    biography: string;
    is_active: boolean;
}

export async function createDeveloper(
    payload: CreateDeveloperPayload
): Promise<Developer> {
    const response = await api.post<Developer>(
        "/api/v1/agency-admin/developers",
        payload
    );

    return response.data;
}

export async function updateDeveloper(
    id: number,
    payload: UpdateDeveloperPayload
): Promise<Developer> {
    const response = await api.patch<Developer>(
        `/api/v1/agency-admin/developers/${id}`,
        payload
    );

    return response.data;
}

export async function deleteDeveloper(
    id: number
): Promise<void> {
    await api.delete(
        `/api/v1/agency-admin/developers/${id}`
    );
}
