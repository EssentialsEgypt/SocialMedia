import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-105 hover:from-pink-400 hover:to-purple-500 focus-visible:ring-pink-500/50",
        destructive:
          "bg-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 hover:bg-red-500 focus-visible:ring-red-500/50",
        outline:
          "border border-gray-300 bg-white/10 backdrop-blur-sm text-gray-700 hover:bg-white/20 hover:border-gray-400 hover:text-gray-900 focus-visible:ring-gray-500/50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800/50 dark:hover:border-gray-500 dark:hover:text-white",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-lg shadow-gray-500/25 hover:shadow-xl hover:shadow-gray-500/40 hover:scale-105 hover:from-gray-200 hover:to-gray-300 focus-visible:ring-gray-500/50 dark:from-gray-800 dark:to-gray-700 dark:text-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600",
        ghost:
          "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500/50 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white",
        link: "text-pink-500 underline-offset-4 hover:text-pink-400 hover:underline focus-visible:ring-pink-500/50",
        premium:
          "bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105 hover:from-pink-400 hover:via-purple-400 hover:to-pink-500 focus-visible:ring-pink-500/50 animate-pulse",
        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg shadow-black/10 hover:bg-white/20 hover:shadow-xl hover:shadow-black/20 hover:scale-105 focus-visible:ring-white/50",
      },
      size: {
        default: "h-10 px-6 py-2.5 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-3 py-1.5 has-[>svg]:px-2.5",
        lg: "h-12 rounded-lg px-8 py-3 has-[>svg]:px-6 text-base",
        xl: "h-14 rounded-xl px-10 py-4 has-[>svg]:px-8 text-lg font-semibold",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
