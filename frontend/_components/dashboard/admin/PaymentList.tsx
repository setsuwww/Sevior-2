import React from "react";
import { MOCK_RECENT_PAYMENTS } from "@/_constants/dashboard.mock";
import { SectionHeader } from "./SectionHeader";
import { StatusBadge } from "./StatusBadge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function PaymentList() {
    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm flex flex-col">
            <SectionHeader 
                title="Recent Payments" 
                action={
                    <Link href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center">
                        View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                }
            />

            <div className="space-y-4 mt-2">
                {MOCK_RECENT_PAYMENTS.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 text-gray-600 font-bold flex items-center justify-center shrink-0">
                                {payment.avatar}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{payment.client}</p>
                                <p className="text-xs text-gray-500">{payment.id} • {payment.date}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                            <span className="text-sm font-bold text-gray-900">{formatCurrency(payment.amount)}</span>
                            <StatusBadge status={payment.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
