import { Card } from "@career-ai/ui";
import { cn } from "@career-ai/utils";
import Tilt from "react-parallax-tilt";

import { defaultTiltProps } from "@/client/constants/parallax-tilt";

type Props = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  template?: string;
};

export const BaseCard = ({ children, className, onClick, template }: Props) => (
  <Tilt {...defaultTiltProps}>
    <Card
      className={cn(
        "relative flex aspect-[1/1.4142] scale-100 cursor-pointer items-center justify-center p-0 transition-transform active:scale-95",
        className,
      )}
      onClick={onClick}
      style={{
        backgroundImage: template ? `url(/templates/jpg/${template}.jpg)` : undefined,
        backgroundSize: "cover",
        backdropFilter: "blur(8px)",
      }}
    >
      {children}
    </Card>
  </Tilt>
);
