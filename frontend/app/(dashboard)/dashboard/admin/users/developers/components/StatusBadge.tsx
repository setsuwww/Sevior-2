export function StatusBadge({ isActive }: { isActive: boolean }) {
    return (
        <span
            className={`inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-medium ${isActive
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-100 text-red-500 border border-red-200"
                }`}
        >
            <span
                className={`mr-1.5 h-1.5 w-1.5 rounded-[1px] ${isActive
                    ? "bg-green-500"
                    : "bg-red-400"
                    }`}
            />

            {isActive ? "Active" : "Inactive"}
        </span>
    );
}
