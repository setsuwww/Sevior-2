export type ProfileTheme =
    | "teal"
    | "red"
    | "orange"
    | "yellow"
    | "blue"
    | "purple";

export const PROFILE_THEMES: Record<
    ProfileTheme,
    {
        banner: string;
        avatar: string;
        color: string;
        label: string;
    }
> = {
    teal: {
        banner: "from-slate-900 via-slate-800 to-teal-800",
        avatar: "from-slate-600 to-teal-600",
        color: "bg-teal-600",
        label: "Teal",
    },

    red: {
        banner: "from-slate-900 via-slate-800 to-red-800",
        avatar: "from-slate-600 to-red-600",
        color: "bg-red-600",
        label: "Red",
    },

    orange: {
        banner: "from-slate-900 via-slate-800 to-orange-800",
        avatar: "from-slate-600 to-orange-600",
        color: "bg-orange-600",
        label: "Orange",
    },

    yellow: {
        banner: "from-slate-900 via-slate-800 to-yellow-700",
        avatar: "from-slate-600 to-yellow-600",
        color: "bg-yellow-500",
        label: "Yellow",
    },

    blue: {
        banner: "from-slate-900 via-slate-800 to-blue-800",
        avatar: "from-slate-600 to-blue-600",
        color: "bg-blue-600",
        label: "Blue",
    },

    purple: {
        banner: "from-slate-900 via-slate-800 to-purple-800",
        avatar: "from-slate-600 to-purple-600",
        color: "bg-purple-600",
        label: "Purple",
    },
};
