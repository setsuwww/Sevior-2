import { PageToolbar } from "@/_components/ui/common/PageToolbar";
import { SectionHeader } from "@/_components/ui/common/SectionHeader";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";

import { Search, SlidersHorizontal } from "lucide-react";

export function AgenciesFilterSearch() {
    return (
        <PageToolbar
            left={
                <SectionHeader
                    icon={Search}
                    title="Browse & Search Agency"
                    description="Search and browse agencies relevant to your project requirements."
                />
            }
            right={
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button variant="outline" className="h-9 px-3">
                        <SlidersHorizontal className="mr-2 size-5" />
                        Filters
                    </Button>

                    <Input
                        type="search"
                        placeholder="Search by agency-name ..."
                        className="h-9 w-full bg-gray-50 sm:w-[360px]"
                    />
                </div>
            }
        />
    );
}
