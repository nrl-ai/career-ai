import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex scale-100 items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-500",
        secondary: "bg-gray-200 text-gray-700 hover:bg-white/80",
        error: "bg-error text-error-foreground hover:bg-error/80",
        warning: "bg-warning text-warning-foreground hover:bg-warning/80",
        info: "bg-info text-info-foreground hover:bg-info/80",
        success: "bg-success text-success-foreground hover:bg-success/80",
        outline: "border border-secondary bg-white hover:bg-white hover:text-secondary-foreground",
        ghost: "hover:bg-white hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-9 px-5",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", className: "h-auto px-0" },
      { variant: "link", size: "md", className: "h-auto px-0" },
      { variant: "link", size: "lg", className: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
