export function getInitials(name: string) {
    const words = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 0) {
        return "?";
    }

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function getPhoneFormat(phone?: string | null): string {
    if (!phone) return "-";

    const cleaned = phone.replace(/\D/g, "");

    return cleaned.replace(
        /^(\d{4})(\d{4})(\d{0,4})$/,
        (_, a, b, c) => [a, b, c].filter(Boolean).join("-")
    );
}

export function getErrorMessage(
    error: unknown,
    fallback: string
) {
    if (
        typeof error === "object" &&
        error !== null
    ) {
        const axiosError = error as {
            response?: {
                data?: {
                    error?: string;
                    message?: string;
                };
            };
            message?: string;
        };

        const responseError =
            axiosError.response?.data?.error;

        if (responseError) {
            return responseError;
        }

        const responseMessage =
            axiosError.response?.data?.message;

        if (responseMessage) {
            return responseMessage;
        }

        if (axiosError.message) {
            return axiosError.message;
        }
    }

    return fallback;
}
