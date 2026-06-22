"use client";

import StatisticCard from "@/_components/common/statistic-card";
import {
  Users,
  FolderKanban,
  Code2,
  PhoneCall,
} from "lucide-react";

export default function StatsDiagram() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">

      {/* USERS */}
      <StatisticCard
        title="Users"
        icon={Users}
        stats={[
          { label: "Total Users", value: 120 },
          { label: "Active Users", value: 95, trend: "positive" },
          { label: "Inactive Users", value: 25, trend: "negative" },
        ]}
      />

      {/* PROJECTS */}
      <StatisticCard
        title="Projects"
        icon={FolderKanban}
        stats={[
          { label: "Total Projects", value: 32 },
          { label: "Active Projects", value: 21, trend: "positive" },
          { label: "Inactive Projects", value: 11, trend: "negative" },
        ]}
      />

      {/* DEVELOPERS */}
      <StatisticCard
        title="Developers"
        icon={Code2}
        stats={[
          { label: "Total Developers", value: 18 },
          { label: "Active Developers", value: 15, trend: "positive" },
          { label: "Inactive Developers", value: 3, trend: "negative" },
        ]}
      />

      {/* LEADS */}
      <StatisticCard
        title="Leads"
        icon={PhoneCall}
        stats={[
          { label: "Pending Leads", value: 14 },
          { label: "Completed Leads", value: 40, trend: "positive" },
          { label: "Failed Leads", value: 6, trend: "negative" },
        ]}
      />
    </div>
  );
}
