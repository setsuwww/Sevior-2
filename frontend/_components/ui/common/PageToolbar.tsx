import { ReactNode } from "react";

interface PageToolbarProps {
    left: ReactNode;
    right?: ReactNode;
}

export function PageToolbar({
    left,
    right,
}: PageToolbarProps) {
    return (
        <div className="rounded-sm border-b border-gray-200 bg-white shadow-xs">
            <div className="mx-auto max-w-[1600px] p-6 lg:px-8 lg:py-10">
                <div className="flex items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        {left}
                    </div>

                    {right && (
                        <div>
                            {right}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
