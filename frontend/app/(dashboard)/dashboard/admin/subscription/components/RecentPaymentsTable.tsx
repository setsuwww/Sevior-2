"use client";

import {
    formatCurrency,
    formatDate,
    getStatusClass,
} from "../logic/useAdminSubscription";

interface Payment {
    id: number | string;
    amount: number;
    status: string;
    payment_date: string | null;
    created_at: string;
}

interface RecentPaymentsTableProps {
    payments: Payment[];
}

export default function RecentPaymentsTable({
    payments,
}: RecentPaymentsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-olive-100 bg-olive-50/70">
                        <th className="px-5 py-3 text-left font-medium text-olive-500">
                            ID
                        </th>

                        <th className="px-5 py-3 text-left font-medium text-olive-500">
                            Amount
                        </th>

                        <th className="px-5 py-3 text-left font-medium text-olive-500">
                            Status
                        </th>

                        <th className="px-5 py-3 text-left font-medium text-olive-500">
                            Payment Date
                        </th>

                        <th className="px-5 py-3 text-left font-medium text-olive-500">
                            Created
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map((payment) => (
                        <tr
                            key={payment.id}
                            className="border-b border-olive-100 last:border-0"
                        >
                            <td className="px-5 py-4 font-medium text-olive-900">
                                #{payment.id}
                            </td>

                            <td className="px-5 py-4 text-olive-700">
                                {formatCurrency(payment.amount)}
                            </td>

                            <td className="px-5 py-4">
                                <span
                                    className={`inline-flex rounded-sm border px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                        payment.status,
                                    )}`}
                                >
                                    {payment.status}
                                </span>
                            </td>

                            <td className="px-5 py-4 text-olive-600">
                                {formatDate(payment.payment_date)}
                            </td>

                            <td className="px-5 py-4 text-olive-600">
                                {formatDate(payment.created_at)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
