import React from "react";
import { MOCK_RECENT_PAYMENTS } from "@/_constants/dashboard.mock";
import { Download } from "lucide-react";
import { Button } from "@/_components/ui/button";

export default function Invoices() {
    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1000px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Invoices</h1>
                    <p className="text-slate-500">Manage your billing and payment history.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Agency</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_RECENT_PAYMENTS.map((payment) => (
                                <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6 text-sm font-semibold text-slate-900">{payment.id}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-slate-600">{payment.client}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-slate-900">{formatCurrency(payment.amount)}</td>
                                    <td className="py-4 px-6 text-sm text-slate-500">{payment.date}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            payment.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                                            payment.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                            'bg-rose-100 text-rose-700'
                                        }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
