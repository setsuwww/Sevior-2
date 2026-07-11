import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface QuickActionCardProps {
    title: string;
    icon: LucideIcon;
    href: string;
}

export function QuickActionCard({ title, icon: Icon, href }: QuickActionCardProps) {
    return (
        <Link 
            href={href}
            className="bg-white rounded-2xl p-5 border border-gray-200/60 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300 flex flex-col items-center justify-center text-center group"
        >
            <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-teal-50 border border-gray-100 group-hover:border-teal-100 flex items-center justify-center mb-3 transition-colors">
                <Icon className="w-6 h-6 text-gray-500 group-hover:text-teal-600 transition-colors" />
            </div>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-teal-700 transition-colors">{title}</span>
        </Link>
    );
}
