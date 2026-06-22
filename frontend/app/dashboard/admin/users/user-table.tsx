"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";
import { Checkbox } from "@/_components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { UserRound, Mail, Phone, Copy } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/types/User";
import UserActions from "./user-action";
import { ORG_ROLE_COLORS } from "@/_constants/user";

interface UserTableProps {
  users: User[];
  selectedIds: number[];
  loading: boolean;
  onToggleSelect: (id: number) => void;
  onToggleSelectAll: () => void;
  onDelete: (id: number) => void;
  onStatusChange?: (id: number, isActive: boolean) => void;
}

export default function UserTable({ users, selectedIds, loading, onToggleSelect, onToggleSelectAll, onDelete, onStatusChange }: UserTableProps) {

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-olive-900 rounded-lg border border-olive-200 dark:border-olive-800">
        <UserRound className="mx-auto h-12 w-12 text-olive-400" />
        <h3 className="mt-4 text-lg font-medium text-olive-900 dark:text-olive-100">No users found</h3>
        <p className="mt-2 text-sm text-olive-500 dark:text-olive-400">
          Get started by creating a new user.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-olive-900 rounded-lg border border-olive-200 dark:border-olive-800 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedIds.length === users.length && users.length > 0}
                onCheckedChange={onToggleSelectAll}
                className="border-olive-300 dark:border-olive-600"
              />
            </TableHead>
            <TableHead className="font-semibold">User</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Joined</TableHead>
            <TableHead className="font-semibold text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.ID} className="hover:bg-olive-50 dark:hover:bg-olive-800/50 transition-colors group">
              <TableCell className="py-4">
                <Checkbox
                  checked={selectedIds.includes(user.ID)}
                  onCheckedChange={() => onToggleSelect(user.ID)}
                  className="border-olive-300 dark:border-olive-600"
                />
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-3 py-1">
                  <Avatar className="h-9 w-9 border-2 border-teal-700">
                    <AvatarFallback className="bg-teal-700 text-teal-50 text-sm font-medium">
                      {getInitials(user.FullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-olive-900 dark:text-olive-100">{user.FullName}</p>
                    <p className="text-xs text-olive-500 dark:text-olive-400">ID: {user.ID}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-olive-400" />
                    <span className="text-sm text-olive-600 dark:text-olive-300">{user.Email}</span>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors group/phone"
                    onClick={() => {
                      const phoneToCopy = user.Phone || "+62 000-000-000";
                      navigator.clipboard.writeText(phoneToCopy);
                      toast.success("Phone number copied to clipboard!");
                    }}
                  >
                    <Phone className="h-4 w-4 text-olive-400 group-hover/phone:text-teal-500" />
                    <span className="text-sm text-olive-600 dark:text-olive-300 group-hover/phone:text-teal-600">{user.Phone ? user.Phone : "+62 000-000-000"}</span>
                    <Copy className="h-3 w-3 opacity-0 group-hover/phone:opacity-100 text-teal-500 transition-opacity" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <Badge className={`${ORG_ROLE_COLORS[user.Role as keyof typeof ORG_ROLE_COLORS]} font-medium px-3 py-1`}>
                  {user.Role}
                </Badge>
              </TableCell>
              <TableCell className="py-4">
                <Badge
                  variant="outline"
                  className={`${user.IsActive
                    ? 'text-teal-700 bg-teal-50 border-teal-200'
                    : 'text-red-700 bg-red-50 border-red-200'}
                    font-medium px-3 py-1.5 cursor-pointer transition-colors flex items-center gap-2 w-max`}
                  onClick={() => onStatusChange && onStatusChange(user.ID, !user.IsActive)}
                >
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${user.IsActive ? 'bg-teal-400' : 'bg-red-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${user.IsActive ? 'bg-teal-500' : 'bg-red-500'}`}></span>
                  </span>
                  {user.IsActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-olive-900 dark:text-olive-100">
                    {new Date(user.CreatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="text-xs text-olive-500">
                    Upd: {user.UpdatedAt ? new Date(user.UpdatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <UserActions
                  user={user}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                  onResendInvitation={(email: any) => {
                    console.log("Resend invitation to:", email);
                    // Implement resend invitation logic
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
