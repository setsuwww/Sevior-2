"use client"

import { Button } from "@/_components/ui/button"
import { customToast } from "@/_components/ui/sonner"

export default function ToastTest() {
    return (
        <div className="flex flex-wrap gap-2">
            <Button
                onClick={() =>
                    customToast.success(
                        "Developer created",
                        "John Doe has been added to your developers."
                    )
                }
            >
                Success
            </Button>

            <Button
                variant="destructive"
                onClick={() =>
                    customToast.error(
                        "Failed to delete developer",
                        "The developer could not be removed."
                    )
                }
            >
                Error
            </Button>

            <Button
                variant="outline"
                onClick={() =>
                    customToast.warning(
                        "Incomplete form",
                        "Please enter the developer's email address."
                    )
                }
            >
                Warning
            </Button>

            <Button
                variant="outline"
                onClick={() =>
                    customToast.info(
                        "Developer selected",
                        "You can now view or edit this developer."
                    )
                }
            >
                Info
            </Button>

            <Button
                variant="secondary"
                onClick={() =>
                    customToast.loading(
                        "Processing...",
                        "Please wait while we process your request."
                    )
                }
            >
                Loading
            </Button>
        </div>
    )
}
