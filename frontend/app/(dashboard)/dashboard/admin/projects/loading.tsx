import React from "react";

export default function ProjectsLoading() {
    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 mb-8 max-w-[1600px] mx-auto">
                <div>
                    <div className="flex space-x-3 items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                        <div className="space-y-2">
                            <div className="w-32 h-6 bg-gray-200 rounded-md"></div>
                            <div className="w-48 h-4 bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <div className="w-20 h-4 bg-gray-200 rounded-md"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="w-48 h-10 bg-gray-200 rounded-lg"></div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1600px] mx-auto">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 h-[320px] flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between mb-4">
                                <div className="w-20 h-6 bg-gray-100 rounded-md"></div>
                                <div className="w-16 h-8 bg-gray-100 rounded-md"></div>
                            </div>
                            <div className="space-y-2 mb-6">
                                <div className="w-3/4 h-6 bg-gray-100 rounded-md"></div>
                                <div className="w-full h-4 bg-gray-100 rounded-md"></div>
                                <div className="w-5/6 h-4 bg-gray-100 rounded-md"></div>
                            </div>
                        </div>
                        <div>
                            <div className="w-full h-2 bg-gray-100 rounded-full mb-6"></div>
                            <div className="flex justify-between">
                                <div className="w-20 h-4 bg-gray-100 rounded-md"></div>
                                <div className="w-20 h-4 bg-gray-100 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
