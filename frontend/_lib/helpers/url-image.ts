import { API_URL } from "../axiosInstance";

export function getImageUrl(path?: string | null): string | null {
    if (!path) {
        return null;
    }

    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
