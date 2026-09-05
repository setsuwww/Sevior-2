import { Table } from "@/_components/ui/table";

import { DevelopersTableHeader } from "./DevelopersTableHeader";
import { DevelopersTableBody } from "./DevelopersTableBody";

import type { Developer } from "@/_lib/services/admin/users/developer.service";

interface DevelopersTableProps {
    developers: Developer[];
    copiedField: string | null;

    handleCopy: (value: string, field: string) => void;

    handleOpenDetail: (developer: Developer) => void;
    handleOpenEdit: (developer: Developer) => void;
    handleOpenDelete: (developer: Developer) => void;
}

export function DevelopersTable({
    developers,
    copiedField,
    handleCopy,
    handleOpenDetail,
    handleOpenEdit,
    handleOpenDelete,
}: DevelopersTableProps) {
    return (
        <Table>
            <DevelopersTableHeader />

            <DevelopersTableBody
                developers={developers}
                copiedField={copiedField}
                handleCopy={handleCopy}
                handleOpenDetail={handleOpenDetail}
                handleOpenEdit={handleOpenEdit}
                handleOpenDelete={handleOpenDelete}
            />
        </Table>
    );
}
