"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import {
  Toaster as Sonner,
  toast,
  type ToasterProps,
} from "sonner"

import { useTheme } from "next-themes"

type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"

const toastConfig = {
  success: {
    icon: CircleCheckIcon,
    iconClass: "text-emerald-500",
    iconBg:
      "border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 to-emerald-500/5",
    accent: "border-l-emerald-500",
  },

  error: {
    icon: OctagonXIcon,
    iconClass: "text-red-500",
    iconBg:
      "border-red-500/20 bg-gradient-to-br from-red-500/15 to-red-500/5",
    accent: "border-l-red-500",
  },

  warning: {
    icon: TriangleAlertIcon,
    iconClass: "text-amber-500",
    iconBg:
      "border-amber-500/20 bg-gradient-to-br from-amber-500/15 to-amber-500/5",
    accent: "border-l-amber-500",
  },

  info: {
    icon: InfoIcon,
    iconClass: "text-blue-500",
    iconBg:
      "border-blue-500/20 bg-gradient-to-br from-blue-500/15 to-blue-500/5",
    accent: "border-l-blue-500",
  },

  loading: {
    icon: Loader2Icon,
    iconClass: "text-neutral-500",
    iconBg:
      "border-neutral-500/20 bg-gradient-to-br from-neutral-500/15 to-neutral-500/5",
    accent: "border-l-neutral-500",
  },
} satisfies Record<
  ToastType,
  {
    icon: typeof CircleCheckIcon
    iconClass: string
    iconBg: string
    accent: string
  }
>

interface CustomToastProps {
  toastId?: string | number
  type: ToastType
  title: string
  description?: string
}

function CustomToast({
  toastId,
  type,
  title,
  description,
}: CustomToastProps) {
  const config = toastConfig[type]
  const Icon = config.icon

  return (
    <div
      className={[
        "relative",
        "flex",
        "w-[380px]",
        "items-start",
        "gap-3",
        "overflow-hidden",
        "rounded-l-sm",
        "rounded-r-xl",
        "border",
        "border-border/60",
        "border-l-2",
        config.accent,
        "bg-background",
        "p-4",
        "pr-10",
        "shadow-xl",
      ].join(" ")}
    >
      {/* ICON */}
      <div
        className={[
          "flex",
          "size-10",
          "shrink-0",
          "items-center",
          "justify-center",
          "rounded-sm",
          "border",
          config.iconBg,
        ].join(" ")}
      >
        <Icon
          className={[
            "size-6",
            config.iconClass,
            type === "loading"
              ? "animate-spin"
              : "",
          ].join(" ")}
        />
      </div>

      {/* CONTENT */}
      <div className="min-w-0">
        {/* TITLE */}
        <div className="text-sm font-semibold leading-5 text-foreground">
          {title}
        </div>

        {/* DESCRIPTION */}
        {description && (
          <div className="text-xs leading-5 text-muted-foreground">
            {description}
          </div>
        )}
      </div>

      {/* CLOSE */}
      <button
        type="button"
        onClick={() => {
          if (toastId) {
            toast.dismiss(toastId)
          }
        }}
        className="
                    absolute
                    right-3
                    top-3
                    flex
                    size-6
                    items-center
                    justify-center
                    rounded-md
                    text-muted-foreground
                    transition-colors
                    hover:bg-muted
                    hover:text-foreground
                "
      >
        <XIcon className="size-3.5" />
      </button>
    </div>
  )
}

const Toaster = ({
  ...props
}: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      toastOptions={{
        unstyled: true,
      }}
      {...props}
    />
  )
}

export { Toaster, CustomToast }

export const customToast = {
  success(
    title: string,
    description?: string
  ) {
    return toast.custom(
      (id) => (
        <CustomToast
          toastId={id}
          type="success"
          title={title}
          description={description}
        />
      ),
      {
        duration: 4000,
      }
    )
  },

  error(
    title: string,
    description?: string
  ) {
    return toast.custom(
      (id) => (
        <CustomToast
          toastId={id}
          type="error"
          title={title}
          description={description}
        />
      ),
      {
        duration: 5000,
      }
    )
  },

  warning(
    title: string,
    description?: string
  ) {
    return toast.custom(
      (id) => (
        <CustomToast
          toastId={id}
          type="warning"
          title={title}
          description={description}
        />
      ),
      {
        duration: 4000,
      }
    )
  },

  info(
    title: string,
    description?: string
  ) {
    return toast.custom(
      (id) => (
        <CustomToast
          toastId={id}
          type="info"
          title={title}
          description={description}
        />
      ),
      {
        duration: 4000,
      }
    )
  },

  loading(
    title: string,
    description?: string
  ) {
    return toast.custom(
      (id) => (
        <CustomToast
          toastId={id}
          type="loading"
          title={title}
          description={description}
        />
      ),
      {
        duration: Infinity,
      }
    )
  },
}
