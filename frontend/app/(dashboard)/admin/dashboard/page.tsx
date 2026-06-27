"use client";

import { useEffect, useState } from "react";
import { Users, Briefcase, CheckCircle, Clock } from "lucide-react";
import { adminDashboardService } from "@/_lib/services/admin/dashboard.service";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminDashboardService.getStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Mock data for charts as they would typically require separate time-series endpoints
    const areaChartData = [
        { name: 'Jan', projects: 4 },
        { name: 'Feb', projects: 7 },
        { name: 'Mar', projects: 5 },
        { name: 'Apr', projects: 12 },
        { name: 'May', projects: 10 },
        { name: 'Jun', projects: 15 },
        { name: 'Jul', projects: 18 },
        { name: 'Aug', projects: 16 },
        { name: 'Sep', projects: 22 },
        { name: 'Oct', projects: 20 },
        { name: 'Nov', projects: 25 },
        { name: 'Dec', projects: 30 },
    ];

    const barChartData = [
        { name: 'Active', value: stats?.active_projects || 0 },
        { name: 'Pending', value: stats?.pending_projects || 0 },
        { name: 'Completed', value: stats?.completed_projects || 0 },
    ];

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Developers" value={stats?.total_developers} icon={<Users className="w-5 h-5 text-blue-600" />} bg="bg-blue-50" />
                <StatCard title="Total Clients" value={stats?.total_clients} icon={<Users className="w-5 h-5 text-indigo-600" />} bg="bg-indigo-50" />
                <StatCard title="Total Projects" value={stats?.total_projects} icon={<Briefcase className="w-5 h-5 text-purple-600" />} bg="bg-purple-50" />
                
                <StatCard title="Active Projects" value={stats?.active_projects} icon={<CheckCircle className="w-5 h-5 text-emerald-600" />} bg="bg-emerald-50" />
                <StatCard title="Completed Projects" value={stats?.completed_projects} icon={<CheckCircle className="w-5 h-5 text-teal-600" />} bg="bg-teal-50" />
                <StatCard title="Pending Projects" value={stats?.pending_projects} icon={<Clock className="w-5 h-5 text-amber-600" />} bg="bg-amber-50" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Projects Created (Last 12 Months)</h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <RechartsTooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#e5e7eb', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area type="monotone" dataKey="projects" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorProjects)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Project Status</h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <RechartsTooltip 
                                    cursor={{fill: '#f9fafb'}}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} maxBarSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activities Placeholder */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h2>
                <div className="space-y-4">
                    {[
                        { title: "New Developer Joined", time: "2 hours ago", desc: "John Doe joined the agency as a developer." },
                        { title: "New Client", time: "5 hours ago", desc: "Acme Corp submitted a new project request." },
                        { title: "Project Created", time: "1 day ago", desc: "E-Commerce Platform project has been created." },
                        { title: "Task Assigned", time: "2 days ago", desc: "Task 'Setup Database' assigned to Alice." }
                    ].map((activity, i) => (
                        <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                            <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 shrink-0"></div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">{activity.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{activity.desc}</p>
                                <span className="text-xs text-gray-400 mt-1 block">{activity.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, bg }: { title: string, value: number, icon: React.ReactNode, bg: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{value || 0}</h3>
            </div>
        </div>
    );
}
