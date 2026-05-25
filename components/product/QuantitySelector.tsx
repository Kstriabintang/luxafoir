"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        "inline-flex items-center border border-ash",
        className
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-11 w-11 items-center justify-center text-ivory transition-colors hover:text-gold disabled:opacity-30"
      >
        <Minus className="size-4" strokeWidth={1.5} />
      </button>
      <span className="flex h-11 w-10 items-center justify-center font-mono text-sm text-ivory">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-11 w-11 items-center justify-center text-ivory transition-colors hover:text-gold disabled:opacity-30"
      >
        <Plus className="size-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
