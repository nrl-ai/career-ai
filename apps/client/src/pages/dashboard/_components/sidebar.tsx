import { t } from "@lingui/macro";
import { Button, Separator } from "@career-ai/ui";
import { cn } from "@career-ai/utils";
import {
  IoCalculatorOutline,
  IoCheckmarkDoneCircleOutline,
  IoAppsOutline ,
  IoHomeOutline,
  IoLibraryOutline,
  IoNewspaperOutline,
  IoServerOutline,
  IoSettingsOutline,
  IoTodayOutline,
} from "react-icons/io5";

// import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";

import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { useUser } from "@/client/services/user";
import { useToast } from "@/client/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";

type SidebarItem = {
  path: string;
  name: string;
  icon: React.ReactNode;
  isCollapsed?: boolean;
};

type SidebarItemProps = SidebarItem & {
  onClick?: () => void;
};

const SidebarItem = ({ path, name, icon, onClick }: SidebarItemProps) => {
  const isActive = useLocation().pathname === path;

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        "flex h-auto items-start justify-start rounded-lg py-2.5 px-3",
        isActive && "pointer-events-none bg-blue-100 text-secondary-foreground",
      )}
      onClick={onClick}
    >
      <Link to={path} className="flex size-full my-[2px]">
        <div
          className={cn(
            "text-xl mr-3",
            isActive && "text-blue-500",
          )}
        >
          {icon}
        </div>
        <span className={cn("font-normal", isActive && "font-bold text-blue-500")}>{name}</span>
      </Link>
    </Button>
  );
};

// type SidebarProps = {
//   isOpen?: boolean;
//   setOpen?: (open: boolean) => void;
//   isCollapsed?: boolean;
//   setIsCollapsed?: (collapsed: boolean) => void;
// };

const iconStyle = { color: "#6B94F9" };

// export const Sidebar = ({ isOpen, setOpen, isCollapsed, setIsCollapsed }: SidebarProps) => {
export const Sidebar = () => {
  const { toast } = useToast();
  const { user } = useUser();

  const topItems: SidebarItem[] = [
    {
      path: "/dashboard",
      name: t`Dashboard`,
      icon: <IoAppsOutline style={iconStyle}/>,
    },
  ];

  const serviceItems: SidebarItem[] = [
    {
      path: "/dashboard/resumes",
      name: t`Build Your Resume`,
      icon: <IoNewspaperOutline style={iconStyle}/>,
    },
    {
      path: "/dashboard/cv-optimization",
      name: t`Check & Optimize Resume`,
      icon: <IoCheckmarkDoneCircleOutline style={iconStyle}/>,
    },
    {
      path: "/dashboard/interview",
      name: t`AI Mock Interview`,
      icon: <IoTodayOutline style={iconStyle}/>,
    },
  ];

  const libraryItems: SidebarItem[] = [
    {
      path: "/dashboard/courses",
      name: t`Skill Courses`,
      icon: <PiGraduationCap style={iconStyle}/>,
    },
    {
      path: "https://blog.career-ai.vn/",
      name: t`Knowledge Library`,
      icon: <IoLibraryOutline style={iconStyle}/>,
    },
  ];

  const toolItems: SidebarItem[] = [
    {
      path: "#",
      name: t`Gross-Net Salary`,
      icon: <IoCalculatorOutline style={iconStyle}/>,
    },
    {
      path: "#",
      name: t`Personal Income Tax`,
      icon: <IoServerOutline style={iconStyle}/>,
    },
  ];

  return (
    <div className={cn("flex h-full flex-col gap-y-3 md:p-2")}>
      <div className="lg:mb-4 lg:ml-0">
        <Link to="/" className="w-full">
          <Icon
            // open={!isCollapsed}
            size={32}
            className={cn("lg:block")}
          />
        </Link>
      </div>
      <h2
        className={cn(
          "mb-2 mt-4 text-xs font-normal uppercase text-gray-400",
        )}
      >
        {t`Account`}
      </h2>
        
      <UserOptions>
        <Button
          size="lg"
          variant="ghost"
          className={cn("w-full py-6 px-3 justify-start")}
        >
          <UserAvatar size={38} className={cn("mr-3")} />

            <div className="flex flex-col text-left">
              <span className="text-sm text-gray-500">{t`User Profile`}</span>{" "}
              <span className="max-w-[120px] truncate font-medium">{user?.name}</span>
            </div>

        </Button>
        
      </UserOptions>

        <div className={cn("grid mt-2 gap-y-1")}>
          {topItems.map((item) => ( 
            <SidebarItem
              {...item}
              key={item.path}
            />
          ))}

          <h2
            className={cn(
              "mb-2 mt-4 text-xs font-normal uppercase text-gray-400",
            )}
          >
            {t`Services`}
          </h2>

          {serviceItems.map((item) => (
            <SidebarItem
              {...item}
              key={item.path}
            />
          ))}

          <h2
            className={cn(
              "mb-2 mt-4 text-xs font-normal uppercase text-gray-400",
            )}
          >
            {t`News & Community`}
          </h2>

          {libraryItems.map((item) => (
            <SidebarItem
              {...item}
              key={item.path}
            />
          ))}

          <h2
            className={cn(
              "mb-2 mt-4 text-xs font-normal uppercase text-gray-400",
            )}
          >
            {t`Tools`}
          </h2>

          {toolItems.map((item) => (
            <SidebarItem
              {...item}
              key={item.path}
              onClick={() => {
                toast({
                  variant: "warning",
                  title: t`This feature is under development.`,
                  description: t`We are developing this feature. Please come back soon!`,
                });
              }}
            />
          ))}
        </div>
    </div>
  );
};
