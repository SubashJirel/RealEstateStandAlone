import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold leading-none",
  {
    variants: {
      variant: {
        default:
          "border-primary/15 bg-primary/10 text-primary",
        secondary:
          "border-secondary/15 bg-secondary/10 text-secondary",
        accent: "border-accent/20 bg-accent/15 text-accent-foreground",
        outline: "border-light-border bg-warm-white text-on-surface-variant",
        sold: "border-primary/15 bg-primary text-on-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { badgeVariants };
