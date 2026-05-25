"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body text-label uppercase transition-all duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white select-none",
  {
    variants: {
      variant: {
        // Primary — black button, white text
        solid: "bg-[#0A0A0A] text-white hover:bg-[#2A2A2A] active:translate-y-px",
        // Secondary — black outline, fills on hover
        outline:
          "border border-[#0A0A0A] text-[#0A0A0A] bg-transparent hover:bg-[#0A0A0A] hover:text-white",
        // Primary on imagery (hero) — white fill
        light: "bg-white text-[#0A0A0A] hover:bg-[#F2EFE9] active:translate-y-px",
        // Secondary on imagery — white hairline outline
        ivory:
          "border border-white/70 text-white hover:bg-white hover:text-[#0A0A0A]",
        // Muted gold accent — use sparingly
        gold: "bg-gold text-white hover:bg-gold-dim active:translate-y-px",
        ghost: "text-[#0A0A0A] hover:text-gold",
        link: "text-gold underline-offset-4 hover:underline p-0 h-auto tracking-normal normal-case",
        // Subtle neutral surface
        dark: "bg-[#F8F7F5] text-[#0A0A0A] border border-ash hover:border-[#0A0A0A]",
      },
      size: {
        sm: "h-9 px-4 text-[10px]",
        md: "h-11 px-7",
        lg: "h-14 px-10",
        icon: "h-10 w-10 p-0",
        full: "h-14 w-full px-8",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), "tracking-label", className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Processing</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
