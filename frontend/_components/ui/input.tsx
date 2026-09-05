import * as React from "react";

import { cn } from "@/_lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  typeSearch?: boolean;
}

function Input({
  className,
  type,
  typeSearch = false,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input h-9 w-full min-w-0 rounded-sm border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        "focus-visible:border-ring/60 focus-visible:ring-ring/20 focus-visible:ring-[3px]",

        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",

        typeSearch && "bg-olive-200/60 border-olive-200/60 shadow-none",

        className
      )}
      {...props}
    />
  );
}

export { Input };
