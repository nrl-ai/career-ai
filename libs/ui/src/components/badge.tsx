import { cn } from "@career-ai/utils";
import { type VariantProps } from "class-variance-authority";

import { badgeVariants } from "../variants/badge";

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export const Badge = ({ className, variant, outline, ...props }: BadgeProps) => (
  <div className={cn(badgeVariants({ variant, outline }), className)} {...props} />
);
