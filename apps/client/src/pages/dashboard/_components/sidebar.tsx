import { Button, KeyboardShortcut, Separator } from "@career-ai/ui";
import { cn } from "@career-ai/utils";
import { motion } from "framer-motion";
import {
  IoCalculatorOutline,
  IoChatbubbleEllipsesOutline,
  IoCheckmarkDoneCircleOutline,
  IoHomeOutline,
  IoNewspaperOutline,
  IoSettingsOutline,
  IoTodayOutline,
  IoLibraryOutline,
  IoServerOutline,
} from "react-icons/io5";
import { PiGraduationCap } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useKeyboardShortcut from "use-keyboard-shortcut";

import { Copyright } from "@/client/components/copyright";
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
};

type SidebarItemProps = SidebarItem & {
  onClick?: () => void;
};

const SidebarItem = ({ path, name, shortcut, icon, onClick }: SidebarItemProps) => {
  const isActive = useLocation().pathname === path;

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        "h-auto justify-start rounded-lg px-3 py-2.5",
        isActive && "pointer-events-none bg-secondary/50 text-secondary-foreground",
      )}
      onClick={onClick}
    >
      <Link to={path}>
        <div className={cn("mr-3 text-xl", isActive && "text-blue-500")}>{icon}</div>
        <span className={cn("font-normal", isActive && "text-blue-500 font-bold")}>{name}</span>
        {!isActive && <KeyboardShortcut className="ml-auto">{shortcut}</KeyboardShortcut>}
        {isActive && <ActiveIndicator className="ml-auto" />}
      </Link>
    </Button>
  );
};

type SidebarProps = {
  isOpen?: boolean;
  setOpen?: (open: boolean) => void;
};

export const Sidebar = ({ isOpen, setOpen }: SidebarProps) => {
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
    <div className="flex h-full flex-col gap-y-4 md:p-4">
      <div className="ml-12 flex lg:mb-4 lg:ml-0">
        <Link to="/">
          <Icon open={true} size={32} className="hidden lg:block" />
        </Link>
      </div>

      <div className="grid gap-y-2">
        {topItems.map((item) => (
          <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
        ))}

        <Separator className="opacity-100" />

        <h2 className="text-xs mt-4 mb-2 font-normal uppercase text-gray-400">Dịch vụ</h2>
        {serviceItems.map((item) => (
          <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
        ))}

        <Separator className="opacity-100" />

        <h2 className="text-xs mt-4 mb-2 font-normal uppercase text-gray-400">Công cụ tính toán</h2>
        {toolItems.map((item) => (
          <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
        ))}

        <Separator className="opacity-100" />

        <h2 className="text-xs mt-4 mb-2 font-normal uppercase text-gray-400">
          Tin tức và cộng đồng
        </h2>
        {libraryItems.map((item) => (
          <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
        ))}
      </div>

      <div className="flex-1" />

      <Separator className="opacity-50" />

      <UserOptions>
        <Button size="lg" variant="ghost" className="w-full justify-start px-3 py-6">
          <UserAvatar size={38} className="mr-3" />
          <div className="flex flex-col text-left">
            <span className="text-sm text-gray-500">Hồ sơ tài khoản</span>
            <span className="font-medium">{user?.name}</span>
          </div>
          {/* Arrow */}
          <IoSettingsOutline className="ml-auto text-xl" />
        </Button>
      </UserOptions>

      <Copyright className="ml-2" />
    </div>
  );
};
