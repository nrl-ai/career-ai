import { cn } from "@career-ai/utils";
import { forwardRef } from "react";

export type InputProps = {
  hasError?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError = false, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      autoComplete="off"
      className={cn(
        "flex h-9 w-full rounded-lg border border-border bg-white px-3 py-0.5 !text-sm ring-0 ring-offset-transparent transition-colors [appearance:textfield] placeholder:opacity-80 hover:bg-white/80 focus:border-primary focus:bg-white/90 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        "file:border-0 file:bg-white file:pt-1 file:text-sm file:font-medium file:text-primary",
        hasError ? "border-error" : "border-border",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
