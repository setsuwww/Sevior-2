import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ProgressHeader() {
    return (
        <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-700 tracking-tight">Create your Account</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-md">Set up your account and make your Project ideas real.</p>
                </div>
            </div>
        </div>
    );
}
