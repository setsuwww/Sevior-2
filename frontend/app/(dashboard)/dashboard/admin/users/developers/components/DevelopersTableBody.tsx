import {
    Calendar,
    Check,
    Clock,
    Copy,
    MailIcon,
    Phone,
} from "lucide-react";

import { Button } from "@/_components/ui/button";

import {
    TableBody,
    TableCell,
    TableRow,
} from "@/_components/ui/table";

import {
    getInitials,
    getPhoneFormat,
} from "../logic/adminDeveloperHelpers";

import type { Developer } from "@/_lib/services/admin/users/developer.service";
import { StatusBadge } from "./StatusBadge";
import { formatDateShortTime } from "@/_lib/helpers/date-formatter";

interface DevelopersTableBodyProps {
    developers: Developer[];
    copiedField: string | null;

    handleCopy: (value: string, field: string) => void;

    handleOpenDetail: (developer: Developer) => void;
    handleOpenEdit: (developer: Developer) => void;
    handleOpenDelete: (developer: Developer) => void;
}

export function DevelopersTableBody({
    developers,
    copiedField,
    handleCopy,
    handleOpenDetail,
    handleOpenEdit,
    handleOpenDelete,
}: DevelopersTableBodyProps) {
    if (developers.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell
                        colSpan={4}
                        className="px-4 py-12 text-center"
                    >
                        <p className="text-sm text-gray-500">
                            No developers found.
                        </p>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    return (
        <TableBody>
            {developers.map((developer) => (
                <TableRow key={developer.ID}>

                    {/* NAME */}
                    <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                {getInitials(developer.FullName)}
                            </div>

                            <div>
                                <p className="font-medium text-gray-900">
                                    {developer.FullName}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {developer.Role}
                                </p>
                            </div>
                        </div>
                    </TableCell>

                    {/* EMAIL & PHONE */}
                    <TableCell className="px-4 py-3">
                        <div className="space-y-0.5">

                            {/* EMAIL */}
                            <div className="group flex items-center gap-2 leading-none">
                                <MailIcon className="h-3.5 w-3.5 shrink-0 text-olive-600" />

                                <span className="min-w-0 truncate text-sm text-olive-700">
                                    {developer.Email}
                                </span>

                                <Button type="button" size="icon" variant="ghost"
                                    onClick={() => handleCopy(developer.Email, `email-${developer.ID}`)}
                                    className="h-5 w-5 shrink-0 opacity-0 transition group-hover:opacity-100 hover:bg-olive-100 hover:text-olive-700"
                                >
                                    {copiedField === `email-${developer.ID}`
                                        ? (<Check className="h-3 w-3" />)
                                        : (<Copy className="h-3 w-3" />)
                                    }
                                </Button>
                            </div>

                            {/* PHONE */}
                            <div className="group flex items-center gap-2 leading-none">
                                <Phone className="h-3 w-3 shrink-0 text-olive-400" />

                                <span className="min-w-0 truncate text-xs text-olive-500">
                                    {getPhoneFormat(developer.Phone)}
                                </span>

                                {developer.Phone && (
                                    <Button type="button" size="icon" variant="ghost"
                                        onClick={() => handleCopy(developer.Phone, `phone-${developer.ID}`)}
                                        className="h-5 w-5 shrink-0 opacity-0 transition group-hover:opacity-100 hover:bg-olive-100 hover:text-olive-700"
                                    >
                                        {copiedField === `phone-${developer.ID}`
                                            ? (<Check className="h-3 w-3" />)
                                            : (<Copy className="h-3 w-3" />)
                                        }
                                    </Button>
                                )}
                            </div>

                        </div>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="px-4 py-3">
                        <StatusBadge
                            isActive={developer.IsActive}
                        />
                    </TableCell>

                    {/* CREATED & UPDATED */}
                    <TableCell className="px-4 py-3">
                        <div className="space-y-0.5">

                            {/* CREATED */}
                            <div className="flex items-center gap-2 leading-none text-gray-700">
                                <Calendar className="h-3.5 w-3.5 shrink-0 text-gray-600" />

                                <span className="min-w-0 truncate text-sm">
                                    {formatDateShortTime(developer.CreatedAt)}
                                </span>
                            </div>

                            {/* UPDATED */}
                            <div className="flex items-center gap-2 leading-none text-gray-500">
                                <Calendar className="h-3 w-3 shrink-0 text-gray-400" />

                                <span className="min-w-0 truncate text-xs">
                                    {formatDateShortTime(developer.UpdatedAt)}
                                </span>
                            </div>

                        </div>
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="px-4 py-3">
                        <div className="flex justify-end gap-2">

                            <Button type="button" size="sm" variant="outline"
                                onClick={() => handleOpenDetail(developer)}
                                className="text-xs font-semibold"
                            >
                                Detail
                            </Button>

                            <Button type="button" size="sm" variant="outline"
                                onClick={() => handleOpenEdit(developer)}
                                className="text-xs font-semibold">
                                Edit
                            </Button>

                            <Button type="button" size="sm" variant="destructive"
                                onClick={() => handleOpenDelete(developer)}
                                className="text-xs font-semibold">
                                Delete
                            </Button>

                        </div>
                    </TableCell>

                </TableRow>
            ))}
        </TableBody>
    );
}
