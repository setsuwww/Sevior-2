import React from "react";
import { DashboardHeader } from "@/_components/dashboard/admin/DashboardHeader";
import { FinancialStatCard } from "@/_components/dashboard/admin/FinancialStatCard";
import { StatCard } from "@/_components/dashboard/admin/StatCard";
import { AreaChartCard } from "@/_components/dashboard/admin/AreaChartCard";
import { RecentProjectsTable } from "@/_components/dashboard/admin/RecentProjectsTable";
import { PaymentList } from "@/_components/dashboard/admin/PaymentList";
import { DeveloperLeaderboard } from "@/_components/dashboard/admin/DeveloperLeaderboard";
import { ActivityTimeline } from "@/_components/dashboard/admin/ActivityTimeline";
import { QuickActionCard } from "@/_components/dashboard/admin/QuickActionCard";
import { SectionHeader } from "@/_components/dashboard/admin/SectionHeader";
import {
    Users,
    Building2,
    FolderKanban,
    PlusCircle,
    UserPlus,
    Briefcase,
    FilePlus,
    CreditCard,
    Settings
} from "lucide-react";
import {
    MOCK_FINANCIAL,
    MOCK_DEVELOPERS,
    MOCK_CLIENTS,
    MOCK_PROJECTS
} from "@/_constants/dashboard.mock";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">

                {/* Header */}
                <DashboardHeader />

                {/* Section 1: Overview Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <FinancialStatCard {...MOCK_FINANCIAL} />
                    <StatCard
                        title="Developers"
                        value={MOCK_DEVELOPERS.total}
                        icon={Users}
                        metrics={[
                            { label: "Active", value: MOCK_DEVELOPERS.active, colorClass: "bg-emerald-400" },
                            { label: "Inactive", value: MOCK_DEVELOPERS.inactive, colorClass: "bg-rose-400" },
                        ]}
                    />
                    <StatCard
                        title="Clients"
                        value={MOCK_CLIENTS.total}
                        icon={Building2}
                    />
                    <StatCard
                        title="Projects"
                        value={MOCK_PROJECTS.total}
                        icon={FolderKanban}
                        metrics={[
                            { label: "Pending", value: MOCK_PROJECTS.pending, colorClass: "bg-yellow-400" },
                            { label: "Success", value: MOCK_PROJECTS.success, colorClass: "bg-green-500" },
                            { label: "Failed", value: MOCK_PROJECTS.failed, colorClass: "bg-red-500" },
                            { label: "Cancelled", value: MOCK_PROJECTS.cancelled, colorClass: "bg-slate-500" },
                        ]}
                    />
                </div>

                {/* Section 2: Chart */}
                <div className="grid grid-cols-1 gap-6">
                    <AreaChartCard />
                </div>

                {/* Section 3: Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <RecentProjectsTable />
                    <PaymentList />
                </div>

                {/* Section 4: Performance & Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    <DeveloperLeaderboard />
                    <ActivityTimeline />
                </div>

                {/* Section 5: Quick Actions */}
                <div className="pt-4">
                    <SectionHeader title="Quick Actions" />
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                        <QuickActionCard title="Create Project" icon={PlusCircle} href="#" />
                        <QuickActionCard title="Invite Developer" icon={UserPlus} href="#" />
                        <QuickActionCard title="Invite Client" icon={Briefcase} href="#" />
                        <QuickActionCard title="Create Invoice" icon={FilePlus} href="#" />
                        <QuickActionCard title="View Billing" icon={CreditCard} href="#" />
                        <QuickActionCard title="Manage Subscription" icon={Settings} href="#" />
                    </div>
                </div>

                <div className="pb-10"></div>
            </div>
        </div>
    );
}
