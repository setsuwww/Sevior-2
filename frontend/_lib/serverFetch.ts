import { cookies } from "next/headers";
import { API_URL } from "./axiosInstance";

interface RefreshResponse {
    accessToken: string;
}

export async function serverFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore.toString();

    // 1. Refresh access token menggunakan refresh_token cookie
    const refreshResponse = await fetch(
        `${API_URL}/auth/refresh`,
        {
            method: "POST",
            headers: {
                Cookie: cookieHeader,
            },
            cache: "no-store",
        }
    );

    if (!refreshResponse.ok) {
        const error = await refreshResponse.text();

        throw new Error(
            `Server refresh failed: ${refreshResponse.status} ${error}`
        );
    }

    const refreshData =
        (await refreshResponse.json()) as RefreshResponse;

    // 2. Gunakan access token hasil refresh
    const headers = new Headers(options.headers);

    headers.set(
        "Authorization",
        `Bearer ${refreshData.accessToken}`
    );

    // 3. Request API sebenarnya
    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers,
            cache: "no-store",
        }
    );

    if (!response.ok) {
        const error = await response.text();

        throw new Error(
            `Server fetch failed: ${response.status} ${error}`
        );
    }

    return response.json();
}
