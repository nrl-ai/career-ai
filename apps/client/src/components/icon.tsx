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
      src = "/icon/dark.svg";
      break;
    }
    case true: {
      src = "/icon/light.svg";
      break;
    }
  }

  return (
    <>
      <img
        src={src}
        width={size}
        height={size}
        alt="CareerAI"
        className={cn("rounded-sm", className)}
      />
      {open ? <span className="text-3xl font-bold">CareerAI</span> :  null}
    </>
  );
};
