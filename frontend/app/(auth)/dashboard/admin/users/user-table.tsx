"use client";

import React from "react";
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
import { UserRound, Mail } from "lucide-react";
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
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <UserRound className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No users found</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Get started by creating a new user.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedIds.length === users.length && users.length > 0}
                onCheckedChange={onToggleSelectAll}
                className="border-gray-300 dark:border-gray-600"
              />
            </TableHead>
            <TableHead className="font-semibold">User</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.ID} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(user.ID)}
                  onCheckedChange={() => onToggleSelect(user.ID)}
                  className="border-gray-300 dark:border-gray-600"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3 py-1">
                  <Avatar className="h-9 w-9 border-2 border-teal-700">
                    <AvatarFallback className="bg-teal-700 text-teal-50 text-sm font-medium">
                      {getInitials(user.FullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{user.FullName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: {user.ID}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{user.Email}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`${ORG_ROLE_COLORS[user.Role as keyof typeof ORG_ROLE_COLORS]} font-medium px-3 py-1`}>
                  {user.Role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${user.IsActive
                    ? 'text-teal-600'
                    : 'text-red-600'}
                    font-medium px-3 py-1 cursor-pointer transition-colors`}
                  onClick={() => onStatusChange && onStatusChange(user.ID, !user.IsActive)}
                >
                  {user.IsActive ? "Active" : "Inactive"}
                </Badge>
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
