"use client";

import { ClockFading, Receipt } from "lucide-react";
import Link from "next/link";

import RecentPaymentsTable from "./RecentPaymentsTable";

interface Payment {
    id: number | string;
    amount: number;
    status: string;
    payment_date: string | null;
    created_at: string;
}

interface RecentPaymentsProps {
    payments: Payment[];
    totalPayments: number;
}

export default function RecentPayments({
    payments,
    totalPayments,
}: RecentPaymentsProps) {
    return (
        <div className="rounded-sm border border-slate-200 bg-white shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-orange-50">
                        <ClockFading className="h-5 w-5 text-orange-500" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-slate-900">
                            Recent Payments
                        </h2>

                        <p className="text-sm text-slate-500">
                            Displaying your 5 recent payments
                        </p>
                    </div>
                </div>

                {totalPayments > 0 && (
                    <Link
                        href="/dashboard/admin/subscription/history"
                        className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
                    >
                        View History
                    </Link>
                )}
            </div>

            {/* Content */}
            {payments.length === 0 ? (
                <div className="p-10 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-slate-100">
                        <Receipt className="h-5 w-5 text-slate-400" />
                    </div>

                    <p className="mt-3 text-sm font-medium text-slate-700">
                        There is no Transaction
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Your transaction history will appear here.
                    </p>
                </div>
            ) : (
                <RecentPaymentsTable payments={payments} />
            )}

            {/* Footer */}
            {totalPayments > 5 && (
                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
                    <p className="text-xs text-slate-500">
                        Menampilkan 5 dari {totalPayments}{" "}
                        pembayaran
                    </p>

                    <Link
                        href="/dashboard/admin/subscription/history"
                        className="text-xs font-medium text-teal-600 hover:text-teal-700"
                    >
                        Lihat semua pembayaran
                    </Link>
                </div>
            )}
        </div>
    );
}
