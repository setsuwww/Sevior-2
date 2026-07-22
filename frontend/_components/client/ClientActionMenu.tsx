import { MoreVertical, Eye, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/_components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { Client } from "../../types/client";
import { useRouter } from "next/navigation";

interface ActionMenuProps {
    client: Client;
    onEdit: (client: Client) => void;
    onDelete: (client: Client) => void;
}

export function ClientActionMenu({ client, onEdit, onDelete }: ActionMenuProps) {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push(`/dashboard/admin/clients/${client.id}`)} className="cursor-pointer">
                    <Eye className="w-4 h-4 mr-2 text-gray-500" />
                    View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(client)} className="cursor-pointer">
                    <Edit2 className="w-4 h-4 mr-2 text-gray-500" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete(client)} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
