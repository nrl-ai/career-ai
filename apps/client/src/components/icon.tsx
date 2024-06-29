import { useTheme } from "@career-ai/hooks";
import { cn } from "@career-ai/utils";

type Props = {
  open?: boolean;
  size?: number;
  className?: string;
};

export const Icon = ({ open = false, size = 64, className }: Props) => {
  const { isDarkMode } = useTheme();

  let src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  switch (isDarkMode) {
    case false: {
      src = "/logo/light.svg";
      break;
    }
    case true: {
      src = "/logo/dark.svg";
      break;
    }
  }

  return (
    <div className="flex items-center">
      <img
        src={src}
        width={size}
        height={size}
        alt="CareerAI"
        className={cn("rounded-sm mr-2", className)}
      />
      {open ? <span className="text-2xl font-bold ml-1">CareerAI</span> : null}
    </div>
  );
};
