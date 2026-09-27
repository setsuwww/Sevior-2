import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/_components/ui/table";

export function ProjectsTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="px-4">
                    Project
                </TableHead>

                <TableHead className="px-4">
                    Phase
                </TableHead>

                <TableHead className="px-4">
                    Progress
                </TableHead>

                <TableHead className="px-4">
                    Status
                </TableHead>

                <TableHead className="px-4">
                    Start Date
                </TableHead>

                <TableHead className="px-4 text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
    );
}
