import { Project } from "../app/(dashboard)/dashboard/admin/projects/types";

// Helper to generate dates easily
const today = new Date();
const daysAgo = (days: number) => new Date(today.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
const daysFromNow = (days: number) => new Date(today.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

const DEV_POOL = [
    { id: "dev-1", name: "Jane Smith", avatar: "JS", role: "Frontend Engineer" },
    { id: "dev-2", name: "John Doe", avatar: "JD", role: "Backend Engineer" },
    { id: "dev-3", name: "Mike Johnson", avatar: "MJ", role: "UI/UX Designer" },
    { id: "dev-4", name: "Sarah Williams", avatar: "SW", role: "Fullstack Engineer" },
    { id: "dev-5", name: "Bruce Banner", avatar: "BB", role: "DevOps Engineer" },
    { id: "dev-6", name: "Natasha R.", avatar: "NR", role: "QA Tester" },
];

export const MOCK_PROJECTS: Project[] = [
    {
        id: "PRJ-001",
        agencyId: 1,
        title: "E-commerce Redesign",
        description: "Complete overhaul of the Acme Corp e-commerce platform with Next.js and Stripe.",
        budget: 15000,
        progress: 72,
        startDate: daysAgo(30),
        endDate: daysFromNow(14),
        status: "In Progress",
        client: { id: "client-1", name: "Acme Corp" },
        developers: [DEV_POOL[0], DEV_POOL[1], DEV_POOL[2]]
    },
    {
        id: "PRJ-002",
        agencyId: 1,
        title: "Mobile App V2",
        description: "React Native application for internal logistics tracking and route optimization.",
        budget: 25000,
        progress: 15,
        startDate: daysAgo(5),
        endDate: daysFromNow(45),
        status: "Pending",
        client: { id: "client-2", name: "Globex UI" },
        developers: [DEV_POOL[3], DEV_POOL[2]]
    },
    {
        id: "PRJ-003",
        agencyId: 1,
        title: "Marketing Site",
        description: "High-performance landing pages for the upcoming Q3 product launch campaign.",
        budget: 8500,
        progress: 100,
        startDate: daysAgo(60),
        endDate: daysAgo(2),
        status: "Completed",
        client: { id: "client-3", name: "Soylent" },
        developers: [DEV_POOL[0]]
    },
    {
        id: "PRJ-004",
        agencyId: 1,
        title: "Admin Dashboard",
        description: "Internal management dashboard with Real-time Analytics for HR and Payroll systems.",
        budget: 12000,
        progress: 30,
        startDate: daysAgo(40),
        endDate: daysAgo(30), // This will trigger overdue
        status: "Cancelled",
        client: { id: "client-4", name: "Initech" },
        developers: [DEV_POOL[1], DEV_POOL[4]]
    },
    {
        id: "PRJ-005",
        agencyId: 1,
        title: "API Integration Gateway",
        description: "Building a scalable GraphQL gateway for legacy REST microservices.",
        budget: 32000,
        progress: 85,
        startDate: daysAgo(90),
        endDate: daysFromNow(5),
        status: "In Progress",
        client: { id: "client-5", name: "Stark Ind" },
        developers: [DEV_POOL[1], DEV_POOL[3], DEV_POOL[4], DEV_POOL[5], DEV_POOL[0]] // 5 devs to test the +1 feature
    },

];
