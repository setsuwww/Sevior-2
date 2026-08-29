export type ProfileTheme =
    | "slate-teal"
    | "slate-red"
    | "slate-orange"
    | "slate-yellow"
    | "slate-green"
    | "slate-blue"
    | "slate-purple";

export const PROFILE_THEMES: Record<
    ProfileTheme,
    {
        banner: string;
        avatar: string;
        color: string;
        label: string;
    }
> = {
    "slate-teal": {
        banner: "from-slate-900 to-teal-800",
        avatar: "from-slate-600 to-teal-500",
        color: "teal",
        label: "Teal",
    },

    "slate-red": {
        banner: "from-slate-900 to-red-800",
        avatar: "from-slate-600 to-red-500",
        color: "red",
        label: "Red",
    },

    "slate-orange": {
        banner: "from-slate-900 to-orange-800",
        avatar: "from-slate-600 to-orange-500",
        color: "orange",
        label: "Orange",
    },

    "slate-yellow": {
        banner: "from-slate-900 to-yellow-800",
        avatar: "from-slate-600 to-yellow-400",
        color: "yellow",
        label: "Yellow",
    },

    "slate-green": {
        banner: "from-slate-900 to-green-800",
        avatar: "from-slate-600 to-green-400",
        color: "green",
        label: "Green",
    },

    "slate-blue": {
        banner: "from-slate-900 to-blue-800",
        avatar: "from-slate-600 to-blue-500",
        color: "blue",
        label: "Blue",
    },

    "slate-purple": {
        banner: "from-slate-900 to-purple-800",
        avatar: "from-slate-600 to-purple-500",
        color: "purple",
        label: "Purple",
    },
};

export function isProfileTheme(value: string): value is ProfileTheme {
    return value in PROFILE_THEMES;
}
