import { Button, KeyboardShortcut, Separator } from "@career-ai/ui";
import { cn } from "@career-ai/utils";
import { motion } from "framer-motion";
import {
  IoCalculatorOutline,
  IoChatbubbleEllipsesOutline,
  IoCheckmarkDoneCircleOutline,
  IoHomeOutline,
  IoLibraryOutline,
  IoNewspaperOutline,
  IoServerOutline,
  IoSettingsOutline,
  IoTodayOutline,
} from "react-icons/io5";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useKeyboardShortcut from "use-keyboard-shortcut";

import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { useUser } from "@/client/services/user";

type Props = {
  className?: string;
};

const ActiveIndicator = ({ className }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={cn(
      "size-1.5 animate-pulse rounded-full bg-info shadow-[0_0_12px] shadow-info",
      className,
    )}
  />
);

type SidebarItem = {
  path: string;
  name: string;
  shortcut?: string;
  icon: React.ReactNode;
  isCollapsed?: boolean;
};

type SidebarItemProps = SidebarItem & {
  onClick?: () => void;
};

const SidebarItem = ({ path, name, shortcut, icon, onClick, isCollapsed }: SidebarItemProps) => {
  const isActive = useLocation().pathname === path;

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        "flex h-auto items-center justify-center rounded-lg py-2.5",
        isActive && "pointer-events-none bg-secondary/50 text-secondary-foreground",
        !isCollapsed && "px-3",
        isCollapsed && "px-1",
      )}
      onClick={onClick}
    >
      <Link to={path} className="flex size-full items-center">
        <div className={cn("text-xl", isActive && "text-blue-500", !isCollapsed && "mr-3")}>
          {icon}
        </div>
        {!isCollapsed && (
          <span className={cn("font-normal", isActive && "font-bold text-blue-500")}>{name}</span>
        )}
        {!isActive && !isCollapsed && (
          <KeyboardShortcut className="ml-auto">{shortcut}</KeyboardShortcut>
        )}
        {isActive && !isCollapsed && <ActiveIndicator className="ml-auto" />}
      </Link>
    </Button>
  );
};

type SidebarProps = {
  isOpen?: boolean;
  setOpen?: (open: boolean) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
};

export const Sidebar = ({ isOpen, setOpen, isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { user } = useUser();
  const navigate = useNavigate();

  useKeyboardShortcut(["shift", "r"], () => {
    navigate("/dashboard/resumes");
    setOpen?.(false);
  });

  useKeyboardShortcut(["shift", "s"], () => {
    navigate("/dashboard/settings");
    setOpen?.(false);
  });

  const topItems: SidebarItem[] = [
    {
      path: "/",
      name: "Trang chủ",
      shortcut: "⇧H",
      icon: <IoHomeOutline />,
    },
  ];

  const serviceItems: SidebarItem[] = [
    {
      path: "/dashboard/resumes",
      name: "Tạo CV theo mẫu",
      shortcut: "⇧C",
      icon: <IoNewspaperOutline />,
    },
    {
      path: "/dashboard/cv-improvement",
      name: "Kiểm tra và Tối ưu CV",
      icon: <IoCheckmarkDoneCircleOutline />,
    },
    {
      path: "/dashboard/interview",
      name: "Phòng phỏng vấn ảo",
      shortcut: "⇧I",
      icon: <IoTodayOutline />,
    },
    {
      path: "/dashboard/work-behavior-practice",
      name: "Tình huống công sở",
      shortcut: "⇧I",
      icon: <IoChatbubbleEllipsesOutline />,
    },
  ];

  const libraryItems: SidebarItem[] = [
    {
      path: "/dashboard/blog",
      name: "Thư viện kiến thức",
      shortcut: "⇧E",
      icon: <IoLibraryOutline />,
    },
    {
      path: "/dashboard/courses",
      name: "Khóa học kĩ năng",
      shortcut: "⇧K",
      icon: <PiGraduationCap />,
    },
  ];

  const toolItems: SidebarItem[] = [
    {
      path: "/dashboard/coming-soon",
      name: "Tính lương GROSS-NET",
      icon: <IoCalculatorOutline />,
    },
    {
      path: "/dashboard/coming-soon",
      name: "Tính thuế TNCN",
      icon: <IoServerOutline />,
    },
  ];

  return (
    <div className={cn("flex h-full flex-col gap-y-2", isCollapsed ? "md:p-2" : "md:p-4")}>
      <div className="ml-12 flex justify-between lg:mb-4 lg:ml-0">
        <Link to="/" className="w-full">
          <Icon
            open={!isCollapsed}
            size={32}
            className={cn("hidden lg:block", isCollapsed && "mx-auto mt-4")}
          />
        </Link>
        {!isOpen && !isCollapsed && (
          <Button
            size="md"
            variant="ghost"
            className="text-gray-400"
            onClick={() => {
              setIsCollapsed?.(!isCollapsed);
            }}
          >
            {isCollapsed ? (
              <MdKeyboardDoubleArrowRight className="text-2xl font-normal" />
            ) : (
              <MdKeyboardDoubleArrowLeft className="text-2xl font-normal" />
            )}
          </Button>
        )}
      </div>

      {!isOpen && isCollapsed && (
        <Button
          size="md"
          variant="ghost"
          className="text-gray-400"
          onClick={() => {
            setIsCollapsed?.(!isCollapsed);
          }}
        >
          {isCollapsed ? (
            <MdKeyboardDoubleArrowRight className="text-2xl font-normal" />
          ) : (
            <MdKeyboardDoubleArrowLeft className="text-2xl font-normal" />
          )}
        </Button>
      )}

      <div className={cn("grid", !isCollapsed && "gap-y-1")}>
        {topItems.map((item) => (
          <SidebarItem
            isCollapsed={isCollapsed}
            {...item}
            key={item.path}
            onClick={() => setOpen?.(false)}
          />
        ))}

        <Separator className="opacity-100" />

        <h2
          className={cn(
            "mb-2 mt-4 text-xs font-normal uppercase text-gray-400",
            isCollapsed && "text-center",
          )}
        >
          Dịch vụ
        </h2>
        {serviceItems.map((item) => (
          <SidebarItem
            isCollapsed={isCollapsed}
            {...item}
            key={item.path}
            onClick={() => setOpen?.(false)}
          />
        ))}

        <Separator className="opacity-100" />

        <h2
          className={cn(
            "mb-2 mt-4 text-xs font-normal uppercase text-gray-400",
            isCollapsed && "text-center",
          )}
        >
          {isCollapsed ? "Công cụ" : "Công cụ tính toán"}
        </h2>
        {toolItems.map((item) => (
          <SidebarItem
            isCollapsed={isCollapsed}
            {...item}
            key={item.path}
            onClick={() => setOpen?.(false)}
          />
        ))}

        <Separator className="opacity-100" />

        <h2
          className={cn(
            "mb-2 mt-4 text-xs font-normal uppercase text-gray-400",
            isCollapsed && "text-center",
          )}
        >
          {isCollapsed ? "Thư viện" : "Tin tức và cộng đồng"}
        </h2>
        {libraryItems.map((item) => (
          <SidebarItem
            isCollapsed={isCollapsed}
            {...item}
            key={item.path}
            onClick={() => setOpen?.(false)}
          />
        ))}
      </div>

      <div className="flex-1" />

      <Separator className="opacity-50" />

      <UserOptions>
        <Button
          size="lg"
          variant="ghost"
          className={cn("justify-star w-full py-6", isCollapsed ? "px-0" : "px-3")}
        >
          <UserAvatar size={38} className={cn(isCollapsed ? "mr-0" : "mr-3")} />
          {!isCollapsed && (
            <div className="flex flex-col text-left">
              <span className="text-sm text-gray-500">Hồ sơ tài khoản</span>
              <span className="max-w-[120px] truncate font-medium">{user?.name}</span>
            </div>
          )}
          {!isCollapsed && <IoSettingsOutline className="ml-auto text-xl" />}
        </Button>
      </UserOptions>
    </div>
  );
};
