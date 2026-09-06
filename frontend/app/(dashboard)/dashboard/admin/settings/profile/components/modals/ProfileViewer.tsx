"use client";

import { Dialog, DialogContent, DialogTitle } from "@/_components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ProfileViewerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    fullName: string;
    image: string | null;
    avatarClassName: string;
}

export function ProfileViewer({ open, onOpenChange, fullName, image, avatarClassName }: ProfileViewerProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <VisuallyHidden>
                <DialogTitle>{fullName}</DialogTitle>
            </VisuallyHidden>
            <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
                <div className="flex max-h-[80vh] w-full items-center justify-center rounded-sm bg-black/60 p-1">
                    {image ? (
                        <img
                            src={image}
                            alt={fullName}
                            className="max-h-[75vh] max-w-full rounded-sm object-contain"
                        />
                    ) : (
                        <div
                            className={`flex h-80 w-80 items-center justify-center rounded-full bg-gradient-to-br ${avatarClassName}`}
                        >
                            <span className="text-8xl font-bold text-white">
                                {fullName?.charAt(0) || "A"}
                            </span>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
