import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-body text-[10px] font-medium uppercase tracking-label leading-none px-2.5 py-1.5",
  {
    variants: {
      variant: {
        sale: "bg-[#0A0A0A] text-white",
        new: "bg-[#0A0A0A] text-white",
        soldOut: "bg-sold-out text-white",
        outline: "border border-ash text-smoke",
        gold: "bg-gold text-white",
      },
    },
    defaultVariants: { variant: "outline" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
