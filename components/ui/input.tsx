import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "p-4 w-full rounded-lg border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md text-white placeholder:text-white-400/40 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:border-red-400/60 focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:border-white/20 disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Input }
