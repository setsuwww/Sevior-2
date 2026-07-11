import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAgencyOnboarding } from "../steps/logic/useAgencyOnboarding";

export function ProgressHeader() {
    const { currentDisplayStep, entryPoint, submitting } = useAgencyOnboarding();

    return (
        <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-700 tracking-tight">Create your Agency</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-md">Set up your workspace and start managing clients.</p>
                    {!submitting && (
                        <div className="flex items-center space-x-2 text-sm font-semibold text-gray-500 mt-6">
                            <span className={currentDisplayStep === 1 ? "text-teal-600" : ""}>Profile</span>
                            <span className="text-gray-300">/</span>
                            {entryPoint === "register" && (
                                <>
                                    <span className={currentDisplayStep === 2 ? "text-teal-600" : ""}>Plan</span>
                                    <span className="text-gray-300">/</span>
                                </>
                            )}
                            <span className={currentDisplayStep === (entryPoint === "pricing" ? 2 : 3) ? "text-teal-600" : ""}>Review</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
