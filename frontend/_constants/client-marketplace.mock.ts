// Types for the mock data
export interface MarketplaceDeveloper {
    id: string;
    name: string;
    avatar: string;
    role: string;
    rating: number;
    completedProjects: number;
}

export interface MarketplaceReview {
    id: string;
    clientName: string;
    clientAvatar: string;
    clientCompany: string;
    rating: number;
    text: string;
    date: string;
}

export interface MarketplaceAgency {
    id: string;
    name: string;
    logo: string;
    isExecutive: boolean;
    description: string;
    since: string;
    totalProjects: number;
    totalDevelopers: number;
    averageRating: number;
    topDevelopers: MarketplaceDeveloper[];
    recentProjects: { id: string; name: string; category: string }[];
    reviews: MarketplaceReview[];
}

// Mock Data
export const MARKETPLACE_AGENCIES: MarketplaceAgency[] = [
    {
        id: "agency-001",
        name: "Nexus Studio",
        logo: "NS",
        isExecutive: true,
        description: "A premium software development agency specializing in scalable React and Node.js architectures for enterprise clients.",
        since: "2018",
        totalProjects: 142,
        totalDevelopers: 24,
        averageRating: 4.9,
        topDevelopers: [
            { id: "dev-1", name: "Alice Chen", avatar: "AC", role: "Lead Frontend", rating: 5.0, completedProjects: 45 },
            { id: "dev-2", name: "Bob Smith", avatar: "BS", role: "Senior Backend", rating: 4.9, completedProjects: 38 },
            { id: "dev-3", name: "Charlie Davis", avatar: "CD", role: "UI/UX Designer", rating: 4.8, completedProjects: 62 },
            { id: "dev-4", name: "Diana Prince", avatar: "DP", role: "DevOps Engineer", rating: 5.0, completedProjects: 20 },
            { id: "dev-5", name: "Ethan Hunt", avatar: "EH", role: "Fullstack Developer", rating: 4.7, completedProjects: 31 },
        ],
        recentProjects: [
            { id: "p-1", name: "E-commerce Redesign", category: "Web App" },
            { id: "p-2", name: "Fintech Mobile Wallet", category: "Mobile App" },
            { id: "p-3", name: "AI Customer Support", category: "AI Integration" },
        ],
        reviews: [
            { id: "rev-1", clientName: "Sarah Jenkins", clientAvatar: "SJ", clientCompany: "Acme Corp", rating: 5, text: "Nexus Studio delivered our e-commerce platform ahead of schedule. Their attention to detail is unmatched.", date: "Oct 12, 2026" },
            { id: "rev-2", clientName: "Mark T.", clientAvatar: "MT", clientCompany: "Globex UI", rating: 4, text: "Great team to work with. Very responsive and technically proficient.", date: "Sep 28, 2026" },
        ]
    },
    {
        id: "agency-002",
        name: "CodeCrafters",
        logo: "CC",
        isExecutive: false,
        description: "Rapid prototyping and MVP development for startups.",
        since: "2021",
        totalProjects: 85,
        totalDevelopers: 12,
        averageRating: 4.7,
        topDevelopers: [
            { id: "dev-6", name: "Fiona Gallagher", avatar: "FG", role: "Fullstack", rating: 4.8, completedProjects: 22 },
            { id: "dev-7", name: "George Costanza", avatar: "GC", role: "Backend", rating: 4.6, completedProjects: 18 },
        ],
        recentProjects: [
            { id: "p-4", name: "Social Media MVP", category: "Web App" },
            { id: "p-5", name: "Fitness Tracker", category: "Mobile App" },
        ],
        reviews: [
            { id: "rev-3", clientName: "Tom Hanks", clientAvatar: "TH", clientCompany: "Startup Inc", rating: 5, text: "Built our MVP in 4 weeks. Unbelievable speed.", date: "Aug 15, 2026" },
        ]
    },
    {
        id: "agency-003",
        name: "Vanguard Tech",
        logo: "VT",
        isExecutive: true,
        description: "Enterprise digital transformation and legacy system modernization.",
        since: "2015",
        totalProjects: 310,
        totalDevelopers: 65,
        averageRating: 4.8,
        topDevelopers: [
            { id: "dev-8", name: "Hannah Abbott", avatar: "HA", role: "Software Architect", rating: 4.9, completedProjects: 55 },
            { id: "dev-9", name: "Ian Malcolm", avatar: "IM", role: "Data Scientist", rating: 5.0, completedProjects: 40 },
            { id: "dev-10", name: "Julia Roberts", avatar: "JR", role: "Lead UI", rating: 4.7, completedProjects: 60 },
        ],
        recentProjects: [
            { id: "p-6", name: "Banking Portal Migration", category: "Enterprise" },
            { id: "p-7", name: "Supply Chain Analytics", category: "Data Science" },
        ],
        reviews: [
            { id: "rev-4", clientName: "Bruce Wayne", clientAvatar: "BW", clientCompany: "Wayne Ent", rating: 5, text: "They modernized our entire legacy infrastructure flawlessly.", date: "Jul 22, 2026" },
        ]
    }
];

export const MOCK_PROJECT_REQUESTS = [
    {
        id: "REQ-001",
        agencyName: "Nexus Studio",
        title: "Build a new React Native app",
        status: "Pending",
        budgetMin: 15000,
        budgetMax: 25000,
        date: "Today"
    },
    {
        id: "REQ-002",
        agencyName: "Vanguard Tech",
        title: "Legacy PHP Migration",
        status: "Accepted",
        budgetMin: 40000,
        budgetMax: 60000,
        date: "Oct 15, 2026"
    },
    {
        id: "REQ-003",
        agencyName: "CodeCrafters",
        title: "Simple Landing Page",
        status: "Rejected",
        budgetMin: 1000,
        budgetMax: 2000,
        date: "Sep 10, 2026"
    }
];
