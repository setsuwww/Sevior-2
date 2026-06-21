"use client";

import React from "react";
import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/_components/ui/alert-dialog";
import {
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
  UserCog,
  Lock,
  Unlock,
  Mail,
  Copy,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/_components/ui/badge";

interface UserActionsProps {
  user: User;
  onDelete: (id: number) => void;
  onStatusChange?: (id: number, isActive: boolean) => void;
  onResendInvitation?: (email: string) => void;
}

export default function UserActions({
  user, onDelete, onStatusChange, onResendInvitation
}: UserActionsProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showStatusDialog, setShowStatusDialog] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleViewDetails = () => {
    router.push(`/dashboard/admin/users/${user.ID}`);
  };

  const handleEdit = () => {
    router.push(`/dashboard/admin/users/${user.ID}/edit`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(user.ID);
      toast.success("User deleted successfully");
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async () => {
    setIsUpdating(true);
    try {
      if (onStatusChange) {
        await onStatusChange(user.ID, !user.IsActive);
        toast.success(`User ${user.IsActive ? 'deactivated' : 'activated'} successfully`);
      }
      setShowStatusDialog(false);
    } catch (error) {
      toast.error(`Failed to ${user.IsActive ? 'deactivate' : 'activate'} user`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.Email);
    toast.success("Email copied to clipboard");
  };

  const handleResendInvitation = () => {
    if (onResendInvitation) {
      onResendInvitation(user.Email);
      toast.success("Invitation resent successfully");
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <div className="hidden sm:flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950"
            onClick={handleViewDetails}
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
            onClick={handleEdit}
            title="Edit User"
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={() => setShowDeleteDialog(true)}
            title="Delete User"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Dropdown Menu - For more actions and mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>User Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleCopyEmail} className="cursor-pointer cursor-pointer text-gray-400">
              <Copy className="h-4 w-4 mr-2" />
              <span>Copy Email</span>
            </DropdownMenuItem>

            {!user.IsActive && onResendInvitation && (
              <DropdownMenuItem onClick={handleResendInvitation} className="cursor-pointer">
                <Mail className="h-4 w-4 mr-2 text-purple-600" />
                <span>Resend Invitation</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            {onStatusChange && (
              <DropdownMenuItem
                onClick={() => setShowStatusDialog(true)}
                className={`cursor-pointer ${user.IsActive ? 'text-amber-600' : 'text-green-600'}`}
              >
                {user.IsActive ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Deactivate User</span>
                  </>
                ) : (
                  <>
                    <Unlock className="h-4 w-4 mr-2" />
                    <span>Activate User</span>
                  </>
                )}
              </DropdownMenuItem>
            )}

            <DropdownMenuItem onClick={handleViewDetails} className="cursor-pointer text-gray-400 focus:text-blue-600 focus:bg-blue-50">
              <Eye className="h-4 w-4 mr-2 focus:text-blue-600" />
              <span>View Details</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleEdit} className="cursor-pointer text-gray-400 focus:text-blue-600 focus:bg-blue-50">
              <Pencil className="h-4 w-4 mr-2 focus:text-blue-600" />
              <span>Edit User</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setShowDeleteDialog(true)}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2 text-red-600 focus:text-red-600" />
              <span>Delete User</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete User
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Are you sure you want to delete this user?</p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <p className="font-medium text-gray-900 dark:text-gray-100">{user.Name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.Email}</p>
                <p className="text-xs text-gray-400 mt-1">Role: {user.Role}</p>
              </div>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                This action cannot be undone. This will permanently delete the user account and remove all associated data.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                'Delete User'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {user.IsActive ? (
                <>
                  <Lock className="h-5 w-5 text-amber-600" />
                  Deactivate User
                </>
              ) : (
                <>
                  <Unlock className="h-5 w-5 text-green-600" />
                  Activate User
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Are you sure you want to {user.IsActive ? 'deactivate' : 'activate'} this user?
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <p className="font-medium text-gray-900 dark:text-gray-100">{user.Name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.Email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">Current Status:</span>
                  {user.IsActive ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      <XCircle className="h-3 w-3 mr-1" />
                      Inactive
                    </Badge>
                  )}
                </div>
              </div>
              {user.IsActive ? (
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                  Deactivating will prevent the user from accessing the system.
                </p>
              ) : (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Activating will restore full access to the user.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStatusChange}
              disabled={isUpdating}
              className={user.IsActive
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
              }
            >
              {isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                user.IsActive ? 'Deactivate User' : 'Activate User'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
