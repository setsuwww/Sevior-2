export const MOCK_FINANCIAL = {
    revenue: 12850,
    income: 18200,
    expense: 5350,
    trend: 14.2,
    expenseBreakdown: [
        { label: "Agency Subscription", amount: 1200 },
        { label: "Purchased Add-ons", amount: 800 },
        { label: "Extra Seats", amount: 2500 },
        { label: "Storage", amount: 850 }
    ]
};

export const MOCK_DEVELOPERS = {
    total: 42,
    active: 38,
    inactive: 4,
    trend: 5.1
};

export const MOCK_CLIENTS = {
    total: 124,
};

export const MOCK_PROJECTS = {
    total: 86,
    pending: 45,
    success: 31,
    failed: 3,
    cancelled: 7,
    trend: 12.5
};

export const MOCK_CHART_DATA = {
    weekly: [
        { name: "Mon", requests: 12 },
        { name: "Tue", requests: 19 },
        { name: "Wed", requests: 15 },
        { name: "Thu", requests: 22 },
        { name: "Fri", requests: 28 },
        { name: "Sat", requests: 10 },
        { name: "Sun", requests: 8 },
    ],
    monthly: [
        { name: "Week 1", requests: 45 },
        { name: "Week 2", requests: 52 },
        { name: "Week 3", requests: 38 },
        { name: "Week 4", requests: 65 },
    ],
    yearly: [
        { name: "Jan", requests: 120 },
        { name: "Feb", requests: 150 },
        { name: "Mar", requests: 180 },
        { name: "Apr", requests: 140 },
        { name: "May", requests: 210 },
        { name: "Jun", requests: 250 },
        { name: "Jul", requests: 220 },
        { name: "Aug", requests: 280 },
        { name: "Sep", requests: 310 },
        { name: "Oct", requests: 350 },
        { name: "Nov", requests: 320 },
        { name: "Dec", requests: 400 },
    ]
};

export const MOCK_CHART_STATS = {
    total: 315,
    accepted: 280,
    rejected: 35,
    totalTrend: 15.2,
    acceptedTrend: 18.5,
    rejectedTrend: -5.4
};

export const MOCK_RECENT_PROJECTS = [
    { id: "PRJ-101", name: "E-commerce Redesign", client: "Acme Corp", developer: "John Doe", status: "In Progress", deadline: "Oct 24", progress: 65 },
    { id: "PRJ-102", name: "Mobile App V2", client: "Globex UI", developer: "Jane Smith", status: "Pending", deadline: "Nov 02", progress: 10 },
    { id: "PRJ-103", name: "Marketing Site", client: "Soylent", developer: "Mike Johnson", status: "Completed", deadline: "Sep 15", progress: 100 },
    { id: "PRJ-104", name: "Admin Dashboard", client: "Initech", developer: "Sarah Williams", status: "Cancelled", deadline: "Dec 10", progress: 30 },
    { id: "PRJ-105", name: "API Integration", client: "Stark Ind", developer: "Bruce Banner", status: "Failed", deadline: "Aug 20", progress: 85 },
];

export const MOCK_RECENT_PAYMENTS = [
    { id: "INV-2023-001", client: "Acme Corp", amount: 4500, date: "Today, 10:42 AM", status: "Paid", avatar: "A" },
    { id: "INV-2023-002", client: "Globex UI", amount: 2800, date: "Yesterday", status: "Pending", avatar: "G" },
    { id: "INV-2023-003", client: "Soylent", amount: 1500, date: "Oct 12", status: "Overdue", avatar: "S" },
    { id: "INV-2023-004", client: "Initech", amount: 8200, date: "Oct 10", status: "Paid", avatar: "I" },
];

export const MOCK_TOP_DEVELOPERS = [
    { name: "Jane Smith", avatar: "JS", completed: 42, rating: 4.9, workload: "High" },
    { name: "John Doe", avatar: "JD", completed: 38, rating: 4.8, workload: "Medium" },
    { name: "Mike Johnson", avatar: "MJ", completed: 31, rating: 4.6, workload: "Low" },
];

export const MOCK_RECENT_ACTIVITY = [
    { id: 1, type: "project", message: "New project submitted by Acme Corp", time: "10 mins ago" },
    { id: 2, type: "invoice", message: "Invoice INV-2023-001 paid ($4,500)", time: "2 hours ago" },
    { id: 3, type: "requirement", message: "Globex UI updated project requirements", time: "5 hours ago" },
    { id: 4, type: "comment", message: "Jane Smith added a comment to Mobile App V2", time: "1 day ago" },
];
