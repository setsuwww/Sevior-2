import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/_components/ui/table";

export function ProjectRequestTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="px-4">
                    Client
                </TableHead>

                <TableHead className="px-4">
                    Project
                </TableHead>

                <TableHead className="px-4">
                    Budget
                </TableHead>

                <TableHead className="px-4">
                    Deadline
                </TableHead>

                <TableHead className="px-4">
                    Status
                </TableHead>

                <TableHead className="px-4 text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
    );
}
