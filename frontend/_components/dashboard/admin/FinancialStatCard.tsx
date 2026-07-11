import React from "react";
import { Wallet } from "lucide-react";
import { TrendBadge } from "./TrendBadge";

interface FinancialStatCardProps {
    revenue: number;
    income: number;
    expense: number;
    trend: number;
}

export function FinancialStatCard({ revenue, income, expense, trend }: FinancialStatCardProps) {
    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60 group-hover:bg-emerald-100 transition-colors"></div>

            <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-sky-600">
                    <Wallet className="w-5 h-5" />
                </div>
                <TrendBadge value={trend} />
            </div>

            <div className="mb-6 relative z-10">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{formatCurrency(income)}</h3>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 relative z-10">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center">
                        <span className="w-2 h-2 rounded-full mr-2 bg-emerald-400"></span>
                        Gross Income
                    </span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(income)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center">
                        <span className="w-2 h-2 rounded-full mr-2 bg-rose-400"></span>
                        Expenses
                    </span>
                    <span className="font-semibold text-rose-600">-{formatCurrency(expense)}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2 pt-4 border-t border-dashed border-gray-200">
                    <span className="text-gray-700 font-medium">Net Profit</span>
                    <span className="font-bold text-gray-900 text-base">{formatCurrency(revenue)}</span>
                </div>
            </div>
        </div>
    );
}
