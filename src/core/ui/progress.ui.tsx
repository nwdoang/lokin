import { cn } from "cn";
import { Progress as ProgressPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root>;

export function Progress({ className, value = 0, ...props }: ProgressProps) {
  const normalizedValue = Math.min(100, Math.max(0, value ?? 0));

  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/12",
        className,
      )}
      value={normalizedValue}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full rounded-full bg-primary transition-transform duration-300 motion-reduce:transition-none"
        style={{ transform: `translateX(-${100 - normalizedValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
