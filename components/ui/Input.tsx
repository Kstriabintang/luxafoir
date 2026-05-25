"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * Minimal editorial input — transparent field with a single bottom rule
 * that lights gold on focus.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full bg-transparent px-0 py-3 font-body text-body text-ivory placeholder:text-smoke",
          "border-0 border-b transition-colors duration-300 ease-out-expo focus:outline-none",
          error ? "border-error focus:border-error" : "border-ash focus:border-gold",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
