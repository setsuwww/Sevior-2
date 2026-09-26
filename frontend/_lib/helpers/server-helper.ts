import { cookies } from "next/headers";

import { API_URL } from "../axiosInstance";
import { RefreshResponse } from "@/types/Auth";

async function refreshAccessToken(): Promise<string> {
    const cookieStore = await cookies();

    const response = await fetch(
        `${API_URL}/auth/refresh`,
        {
            method: "POST",
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to refresh access token");
    }

    const data: RefreshResponse = await response.json();

    return data.accessToken;
}

export async function serverFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cookieStore = await cookies();

    let accessToken = await refreshAccessToken();

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers: {
                ...options.headers,
                Cookie: cookieStore.toString(),
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        }
    );

    if (response.status === 401) {
        accessToken = await refreshAccessToken();

        const retryResponse = await fetch(
            `${API_URL}${endpoint}`,
            {
                ...options,
                headers: {
                    ...options.headers,
                    Cookie: cookieStore.toString(),
                    Authorization: `Bearer ${accessToken}`,
                },
                cache: "no-store",
            }
        );

        if (!retryResponse.ok) {
            const error = await retryResponse.text();

            throw new Error(
                `Server fetch failed: ${retryResponse.status} ${error}`
            );
        }

        return retryResponse.json();
    }

    if (!response.ok) {
        const error = await response.text();

        throw new Error(
            `Server fetch failed: ${response.status} ${error}`
        );
    }

    return response.json();
}
