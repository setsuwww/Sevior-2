import React from "react";
import { Button } from "@/_components/ui/button";
import { useRouter } from "next/navigation";

export function FooterActions({ loading }: { loading: boolean }) {
    const router = useRouter();

    return (
        <div className="dark:bg-zinc-900 border-t border-gray-100 dark:border-gray-800 p-8 flex items-center justify-between">
            <Button
                type="button"
                variant="ghost"
                onClick={() => router.push("/register")}
                className="bg-slate-100 hover:bg-slate-200 text-gray-700"
            >
                Cancel
            </Button>
            <Button
                type="submit"
                form="client-register-form"
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold"
            >
                {loading ? "Registering..." : "Register"}
            </Button>
        </div>
    );
}
