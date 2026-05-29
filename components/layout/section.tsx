import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const spacingClasses = {
  none: "",
  sm: "py-10 sm:py-12",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28"
} as const;

const toneClasses = {
  default: "bg-background",
  surface: "bg-surface",
  muted: "bg-[#eef2ee]",
  foreground: "bg-foreground"
} as const;

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: keyof typeof spacingClasses;
  tone?: keyof typeof toneClasses;
};

export function Section({
  children,
  className,
  spacing = "md",
  tone = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(toneClasses[tone], spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
