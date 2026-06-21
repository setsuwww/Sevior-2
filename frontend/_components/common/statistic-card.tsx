"use client";

import { LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  trend?: "positive" | "negative" | "neutral";
}

interface StatsCardProps {
  title: string;
  icon: LucideIcon;
  stats: StatItem[];
}

export default function StatisticCard({
  title,
  icon: Icon,
  stats,
}: StatsCardProps) {
  const getTrendColor = (trend?: StatItem["trend"]) => {
    switch (trend) {
      case "positive":
        return "bg-lime-500";
      case "negative":
        return "bg-rose-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all duration-200">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
          <Icon size={20} className="text-teal-600" />
        </div>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          {title}
        </h3>
      </div>

      {/* Stats Breakdown */}
      <div className="space-y-2">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-gray-500">{item.label}</span>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">
                {item.value}
              </span>

              {/* Trend Dot */}
              <span
                className={`w-2.5 h-2.5 rounded-full ${getTrendColor(
                  item.trend
                )}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
