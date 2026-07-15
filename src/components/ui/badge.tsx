import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-red-800/50 bg-red-950/60 text-red-200 [a&]:hover:bg-red-900/60 [a&]:hover:border-red-700/60",
        secondary:
          "border-red-900/40 bg-red-950/40 text-red-300 [a&]:hover:bg-red-900/50 [a&]:hover:text-red-200",
        destructive:
          "border-transparent bg-red-700 text-white [a&]:hover:bg-red-600 focus-visible:ring-red-500/20",
        outline:
          "border-red-800/40 text-red-300 [a&]:hover:bg-red-950/50 [a&]:hover:text-red-200 [a&]:hover:border-red-700/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
