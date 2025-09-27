import { cn } from "@career-ai/utils";

export const Gauge = ({ value, label, className, valueClassName, labelClassName}) => {

  return (
    <div className={cn("relative size-70", className)}>
      <svg className="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#C5FBC2]" stroke-width="3" stroke-dasharray="50 100" stroke-linecap="round"></circle>

        <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#34C759]" stroke-width="3" stroke-dasharray={`${value * 1/10 * 1/2} 100`} stroke-linecap="round"></circle>
      </svg>

      <div className="absolute top-16 start-1/2 transform -translate-x-1/2 text-center">
        <span className={cn("text-[60px] text-[#34c759] font-semibold", valueClassName)}>{value}</span>
        <span className={cn("text-xl font-semibold text-[#191919] block mt-3", labelClassName)}>{label}</span>
      </div>
    </div>
  );
};  