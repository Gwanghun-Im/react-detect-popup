import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cn } from "../../../lib/utils"

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
    variant?: "default" | "destructive"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantStyles =
    variant === "destructive"
      ? "border-destructive bg-destructive text-destructive-foreground"
      : "border bg-background text-foreground"

  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        "data-[swipe=cancel]:translate-x-0",
        "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
        "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
        "data-[swipe=move]:transition-none",
        "data-[state=open]:animate-in",
        "data-[state=closed]:animate-out",
        "data-[swipe=end]:animate-out",
        "data-[state=closed]:fade-out-80",
        "data-[state=closed]:slide-out-to-right-full",
        "data-[state=open]:slide-in-from-top-full",
        "data-[state=open]:sm:slide-in-from-bottom-full",
        variantStyles,
        className
      )}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName
