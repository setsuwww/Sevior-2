export function DetailItem({ label, value }: { label: string; value: string; }) {
    return (
        <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="whitespace-pre-wrap break-words text-sm text-gray-700">
                {value}
            </p>
        </div>
    );
}
