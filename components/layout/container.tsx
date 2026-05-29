import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const sizeClasses = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl"
} as const;

export type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: keyof typeof sizeClasses;
};

export function Container({
  children,
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
