import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-button)] text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary shadow-low hover:bg-primary/90",
        secondary:
          "bg-secondary text-on-secondary shadow-low hover:bg-secondary/90",
        accent: "bg-accent text-accent-foreground shadow-low hover:bg-accent/90",
        outline:
          "border border-light-border bg-surface-container-lowest text-on-surface hover:border-primary/35 hover:bg-cream",
        ghost: "text-deep-sage hover:bg-surface-container-low",
        luxury:
          "bg-charcoal text-inverse-on-surface shadow-high hover:bg-charcoal/90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}

export { buttonVariants };
