import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-lg shadow-pink-500/25 [a&]:hover:shadow-xl [a&]:hover:shadow-pink-500/40 [a&]:hover:scale-105",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300 shadow-lg shadow-gray-500/25 [a&]:hover:shadow-xl [a&]:hover:shadow-gray-500/40 [a&]:hover:scale-105 dark:from-gray-800 dark:to-gray-700 dark:text-gray-200 dark:border-gray-600",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white border-transparent shadow-lg shadow-red-500/25 [a&]:hover:shadow-xl [a&]:hover:shadow-red-500/40 [a&]:hover:scale-105",
        outline:
          "bg-white/10 backdrop-blur-sm border-white/20 text-white [a&]:hover:bg-white/20 [a&]:hover:border-white/30 [a&]:hover:scale-105",
        premium:
          "bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white border-transparent shadow-xl shadow-pink-500/30 [a&]:hover:shadow-2xl [a&]:hover:shadow-pink-500/50 [a&]:hover:scale-110 animate-pulse",
        success:
          "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-transparent shadow-lg shadow-green-500/25 [a&]:hover:shadow-xl [a&]:hover:shadow-green-500/40 [a&]:hover:scale-105",
        warning:
          "bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-transparent shadow-lg shadow-yellow-500/25 [a&]:hover:shadow-xl [a&]:hover:shadow-yellow-500/40 [a&]:hover:scale-105",
        info:
          "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-transparent shadow-lg shadow-blue-500/25 [a&]:hover:shadow-xl [a&]:hover:shadow-blue-500/40 [a&]:hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
