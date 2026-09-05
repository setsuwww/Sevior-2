import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/_components/ui/table";

export function DevelopersTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="px-4">
                    Name
                </TableHead>

                <TableHead className="px-4">
                    Email & Phone
                </TableHead>

                <TableHead className="px-4">
                    Status
                </TableHead>

                <TableHead className="px-4">
                    Created & Updated
                </TableHead>

                <TableHead className="px-4 text-right">
                    Actions
                </TableHead>
            </TableRow>
        </TableHeader>
    );
}
