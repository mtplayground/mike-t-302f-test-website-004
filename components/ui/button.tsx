import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variantClasses = {
  primary:
    "border-accent bg-accent text-white hover:bg-[#0b5f59] focus-visible:ring-accent",
  secondary:
    "border-[#cfd8d2] bg-surface text-foreground hover:border-accent hover:text-accent focus-visible:ring-accent",
  ghost:
    "border-transparent bg-transparent text-foreground hover:bg-[#e9eee9] focus-visible:ring-accent"
} as const;

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
} as const;

type ButtonVisualProps = {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
};

function buttonClassName({
  className,
  size = "md",
  variant = "primary"
}: ButtonVisualProps & { className?: string }) {
  return cn(
    "inline-flex items-center justify-center rounded-md border font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-55",
    sizeClasses[size],
    variantClasses[variant],
    className
  );
}

export type ButtonProps = ComponentPropsWithoutRef<"button"> &
  ButtonVisualProps;

export function Button({
  className,
  size,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClassName({ className, size, variant })}
      type={type}
      {...props}
    />
  );
}

export type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & ButtonVisualProps;

export function ButtonLink({
  className,
  size,
  variant,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClassName({ className, size, variant })} {...props} />
  );
}
