"use client";

import { useAuthStore } from "@/_stores/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import { Button } from "@/_components/ui/button";
import { Badge } from "@/_components/ui/badge";
import { Bell, Briefcase, Users, PhoneCall, Plus, MoreHorizontal, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Dummy Data
const DUMMY_PROJECTS = [
    { id: 1, name: "E-Commerce Mobile App", client: "Acme Corp", status: "In Progress", progress: 65, devs: ["/avatar1.png", "/avatar2.png"] },
    { id: 2, name: "SaaS Analytics Dashboard", client: "Stark Ind.", status: "Planning", progress: 10, devs: ["/avatar3.png"] },
    { id: 3, name: "Fintech Web Portal", client: "Wayne Ent.", status: "Completed", progress: 100, devs: ["/avatar1.png", "/avatar4.png"] },
];

const DUMMY_CALLS = [
    { id: 1, title: "Requirement Sync with Acme Corp", time: "Today, 14:00", urgent: true },
    { id: 2, title: "Design Review - Stark Ind.", time: "Tomorrow, 10:30", urgent: false },
];

const DUMMY_DEVS = [
    { id: 1, name: "Alex Developer", role: "Frontend Dev", active: true },
    { id: 2, name: "Sam Engineer", role: "Backend Dev", active: true },
    { id: 3, name: "Taylor Coder", role: "Fullstack Dev", active: false },
];

export default function AdminDashboardPage() {
    const { user } = useAuthStore();
    const hasUrgentCall = DUMMY_CALLS.some(call => call.urgent);

    return (
        <div className="p-6 space-y-8 mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 mt-1">Here is the overview of your agency's performance.</p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <Button variant="outline" size="icon" className="relative">
                        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        {hasUrgentCall && (
                            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                            </span>
                        )}
                    </Button>
                    <Link href="/dashboard/admin/users/create">
                        <Button className="bg-teal-600 hover:bg-teal-700">
                            <Plus className="w-4 h-4 mr-2" /> New Developer
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Active Projects</CardTitle>
                        <Briefcase className="w-4 h-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-green-500 mt-1">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Developers</CardTitle>
                        <Users className="w-4 h-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-gray-500 mt-1">2 available for assignment</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Pending Requests</CardTitle>
                        <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-gray-500 mt-1">Requires your approval</p>
                    </CardContent>
                </Card>
                <Card className={hasUrgentCall ? "border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className={`text-sm font-medium ${hasUrgentCall ? "text-red-600 dark:text-red-400" : "text-gray-500"}`}>Upcoming Calls</CardTitle>
                        <PhoneCall className={`w-4 h-4 ${hasUrgentCall ? "text-red-500" : "text-gray-400"}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${hasUrgentCall ? "text-red-600 dark:text-red-400" : ""}`}>
                            2
                        </div>
                        <p className="text-xs text-gray-500 mt-1">1 urgent call today</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Projects Section */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Projects</CardTitle>
                            <CardDescription>Manage your active development projects.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">View All</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {DUMMY_PROJECTS.map((project) => (
                                <div key={project.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 hover:bg-gray-50 transition-colors">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                                            <Badge variant={project.status === "Completed" ? "default" : project.status === "In Progress" ? "secondary" : "outline"} className={project.status === "Completed" ? "bg-green-500" : project.status === "In Progress" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : ""}>
                                                {project.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-500">Client: {project.client}</p>
                                    </div>

                                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                                        {/* Dummy Avatars */}
                                        <div className="flex -space-x-2">
                                            {project.devs.map((_, i) => (
                                                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-medium text-gray-600">
                                                    D{i + 1}
                                                </div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white dark:border-gray-900 flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors" title="Assign Developer">
                                                <Plus className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Column: Calls & Devs */}
                <div className="space-y-8">

                    {/* Calling Notif Widget */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center">
                                <PhoneCall className="w-5 h-5 mr-2 text-teal-500" /> Meeting Requests
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {DUMMY_CALLS.map((call) => (
                                <div key={call.id} className={`p-3 rounded-md border-l-4 ${call.urgent ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-teal-500 bg-gray-50 dark:bg-gray-800/30'}`}>
                                    <div className="flex justify-between items-start">
                                        <h4 className={`text-sm font-medium ${call.urgent ? 'text-red-900 dark:text-red-200' : 'text-gray-900 dark:text-gray-100'}`}>
                                            {call.title}
                                        </h4>
                                        {call.urgent && (
                                            <span className="flex h-2 w-2 mt-1 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-xs mt-1 ${call.urgent ? 'text-red-700 dark:text-red-300' : 'text-gray-500'}`}>{call.time}</p>
                                    <div className="mt-3 flex space-x-2">
                                        <Button size="sm" className={call.urgent ? "bg-red-600 hover:bg-red-700 text-xs h-7" : "bg-teal-600 hover:bg-teal-700 text-xs h-7"}>
                                            Join Call
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-xs h-7">Reschedule</Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Quick Developers Widget */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">Your Developers</CardTitle>
                            <Link href="/dashboard/admin/users" className="text-xs text-teal-600 hover:underline">Manage</Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {DUMMY_DEVS.map((dev) => (
                                    <div key={dev.id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                    {dev.name.charAt(0)}
                                                </div>
                                                {dev.active ? (
                                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                                                ) : (
                                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-gray-400 border-2 border-white dark:border-gray-900 rounded-full"></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium leading-none">{dev.name}</p>
                                                <p className="text-xs text-gray-500 mt-1">{dev.role}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 text-xs">Assign</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
