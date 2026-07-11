"use client";

import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CHART_DATA, MOCK_CHART_STATS } from "@/_constants/dashboard.mock";
import { TrendBadge } from "./TrendBadge";
import { SectionHeader } from "./SectionHeader";

export function AreaChartCard() {
    const [filter, setFilter] = useState<"weekly" | "monthly" | "yearly">("monthly");

    const data = MOCK_CHART_DATA[filter];

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm col-span-1 lg:col-span-3">
            <SectionHeader
                title="Client Requests"
                subtitle="Shows incoming project requests over time."
                action={
                    <div className="inline-flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                        {(["weekly", "monthly", "yearly"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all capitalize ${filter === f
                                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                                    : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                }
            />

            <div className="h-[280px] w-full mt-8">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="requests"
                            stroke="#14b8a6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRequests)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-100">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Total Requests</p>
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-gray-900">{MOCK_CHART_STATS.total}</span>
                        <TrendBadge value={MOCK_CHART_STATS.totalTrend} />
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Accepted</p>
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-emerald-600">{MOCK_CHART_STATS.accepted}</span>
                        <TrendBadge value={MOCK_CHART_STATS.acceptedTrend} />
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Rejected</p>
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-rose-600">{MOCK_CHART_STATS.rejected}</span>
                        <TrendBadge value={MOCK_CHART_STATS.rejectedTrend} />
                    </div>
                </div>
            </div>
        </div>
    );
}
