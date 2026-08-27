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
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    itemDetails?: {
        name: string;
        avatarUrl?: string;
        roleOrCompany?: string;
    };
    isDeleting?: boolean;
}

export function DeleteConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    itemDetails,
    isDeleting = false
}: DeleteConfirmDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
            <AlertDialogContent className="bg-white dark:bg-olive-900 border border-olive-200 dark:border-olive-800">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl text-olive-900 dark:text-olive-100">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-olive-500 dark:text-olive-400">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {itemDetails && (
                    <div className="flex items-center gap-3 p-4 bg-olive-50 dark:bg-olive-800/50 rounded-lg mt-2 mb-4 border border-olive-100 dark:border-olive-800">
                        <Avatar className="h-12 w-12 border border-olive-200 dark:border-olive-700">
                            <AvatarImage src={itemDetails.avatarUrl} />
                            <AvatarFallback>{itemDetails.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-olive-900 dark:text-olive-100">{itemDetails.name}</p>
                            {itemDetails.roleOrCompany && (
                                <p className="text-sm text-olive-500 dark:text-olive-400">{itemDetails.roleOrCompany}</p>
                            )}
                        </div>
                    </div>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting} className="border-olive-200 dark:border-olive-700">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
