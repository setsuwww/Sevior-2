"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/_stores/auth";
import { Users, Building2, Activity, ArrowUpRight, FolderKanban, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/_components/ui/card";
import { superadminDashboardService, DashboardSummary } from "@/_lib/services/superadmin/dashboard.service";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

// Mock data for charts since backend only returns basic summary currently
const userGrowthData = [
  { name: 'Jan', users: 4000 },
  { name: 'Feb', users: 4500 },
  { name: 'Mar', users: 5200 },
  { name: 'Apr', users: 6100 },
  { name: 'May', users: 7000 },
  { name: 'Jun', users: 8492 },
];

const newAgenciesData = [
  { name: 'Jan', agencies: 12 },
  { name: 'Feb', agencies: 19 },
  { name: 'Mar', agencies: 15 },
  { name: 'Apr', agencies: 22 },
  { name: 'May', agencies: 28 },
  { name: 'Jun', agencies: 46 },
];

const COLORS = ['#0f766e', '#0369a1', '#6d28d9'];

export default function SuperAdminDashboard() {
  const { user } = useAuthStore();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await superadminDashboardService.getSummary();
        setSummary(data);
      } catch (error) {
        console.error("Failed to load dashboard summary", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const userDistributionData = [
    { name: 'Admin', value: summary?.total_admins || 0 },
    { name: 'Developer', value: summary?.total_developers || 0 },
    { name: 'Client', value: summary?.total_clients || 0 },
  ];

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-base max-w-2xl">
          Welcome back, {user?.FullName?.split(" ")[0] || "Admin"}. Here is what's happening across the Sevior ecosystem today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Agencies */}
        <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative h-full bg-white p-6 rounded-[15px]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center border border-teal-100">
                <Building2 className="w-5 h-5 text-teal-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Total Agencies</p>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{summary?.total_agencies || 0}</h3>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative h-full bg-white p-6 rounded-[15px]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Active Users</p>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {(summary?.total_admins || 0) + (summary?.total_developers || 0) + (summary?.total_clients || 0)}
              </h3>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative h-full bg-white p-6 rounded-[15px]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100">
                <FolderKanban className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Active Projects</p>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">{summary?.total_active_projects || 0}</h3>
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative h-full bg-white p-6 rounded-[15px]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Monthly Revenue</p>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                ${summary?.monthly_revenue?.toLocaleString() || '0'}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {/* User Growth (Area Chart) */}
        <Card className="xl:col-span-2 bg-white border-gray-200 rounded-2xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Registered Users (Last 6 Months)</h3>
          </div>
          <CardContent className="p-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f766e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="users" stroke="#0f766e" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Distribution (Pie Chart) */}
        <Card className="bg-white border-gray-200 rounded-2xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">User Distribution</h3>
          </div>
          <CardContent className="p-5 h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* New Agencies (Bar Chart) */}
        <Card className="bg-white border-gray-200 rounded-2xl shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">New Agencies</h3>
          </div>
          <CardContent className="p-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newAgenciesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f3f4f6'}}
                />
                <Bar dataKey="agencies" fill="#0369a1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white border-gray-200 rounded-2xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
            <button className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">View All</button>
          </div>
          <div className="flex-1 p-5 overflow-y-auto max-h-[300px]">
            <div className="space-y-5">
              {summary?.recent_activities?.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No recent activity</div>
              ) : (
                summary?.recent_activities?.map((activity, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="mt-1 w-2 h-2 rounded-full bg-teal-500 shrink-0"></div>
                    <div>
                      <p className="text-sm text-gray-900"><span className="font-semibold">{activity.user?.full_name}</span> {activity.action}</p>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">{new Date(activity.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}
