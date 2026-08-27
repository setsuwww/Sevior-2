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
        banner: "from-olive-700 to-teal-600",
        avatar: "from-olive-600 to-teal-500",
        color: "teal",
        label: "Teal",
    },

    "slate-red": {
        banner: "from-olive-700 to-red-600",
        avatar: "from-olive-600 to-red-500",
        color: "red",
        label: "Red",
    },

    "slate-orange": {
        banner: "from-olive-700 to-orange-600",
        avatar: "from-olive-600 to-orange-500",
        color: "orange",
        label: "Orange",
    },

    "slate-yellow": {
        banner: "from-olive-700 to-yellow-500",
        avatar: "from-olive-600 to-yellow-400",
        color: "yellow",
        label: "Yellow",
    },

    "slate-green": {
        banner: "from-olive-700 to-green-500",
        avatar: "from-olive-600 to-green-400",
        color: "green",
        label: "Green",
    },

    "slate-blue": {
        banner: "from-olive-700 to-blue-600",
        avatar: "from-olive-600 to-blue-500",
        color: "blue",
        label: "Blue",
    },

    "slate-purple": {
        banner: "from-olive-700 to-purple-600",
        avatar: "from-olive-600 to-purple-500",
        color: "purple",
        label: "Purple",
    },
};

export function isProfileTheme(value: string): value is ProfileTheme {
    return value in PROFILE_THEMES;
}
