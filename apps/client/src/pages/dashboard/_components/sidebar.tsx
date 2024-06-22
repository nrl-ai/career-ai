import { FaHouse, FaRegNewspaper, FaGraduationCap, FaArrowUpRightDots, FaCalculator, FaGear } from "react-icons/fa6";
import { MdFitScreen } from "react-icons/md";
import { Button, KeyboardShortcut, Separator } from "@career-ai/ui";
import { cn } from "@career-ai/utils";
import { motion } from "framer-motion";
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
        "h-auto justify-start px-4 py-3",
        isActive && "pointer-events-none bg-secondary/50 text-secondary-foreground",
      )}
      onClick={onClick}
    >
      <Link to={path}>
        <div className="mr-3 text-xl">{icon}</div>
        <span>{name}</span>
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
      name: `Trang chủ`,
      shortcut: "⇧H",
      icon: <FaHouse />
    }
  ];

  const serviceItems: SidebarItem[] = [
    {
      path: "/dashboard/resumes",
      name: `Xây dựng CV`,
      shortcut: "⇧C",
      icon: <FaRegNewspaper />,
    },
    {
      path: "/",
      name: `Phỏng vấn với AI `,
      shortcut: "⇧I",
      icon: <MdFitScreen />,
    },
  ];

  const libraryItems: SidebarItem[] = [
    {
      path: "/",
      name: `Kinh nghiệm xin việc`,
      shortcut: "⇧E",
      icon: <FaArrowUpRightDots />,
    },
    {
      path: "/",
      name: `Khóa học kĩ năng`,
      shortcut: "⇧K",
      icon: <FaGraduationCap />,
    },
  ];

  const toolItems: SidebarItem[] = [
    // {
    //   path: "/",
    //   name: `Tính lương GROSS-NET`,
    //   icon: <FaCalculator />,
    // },
    {
      path: "/dashboard/settings",
      name: `Thiết lập`,
      shortcut: "⇧S",
      icon: <FaGear />,
    },
  ];

  return (
    <div className="flex h-full flex-col gap-y-4">
      <div className="ml-12 flex lg:ml-0">
        <Button asChild size="icon" variant="ghost" className="w-full text-left justify-start">
          <Link to="/">
            <Icon open={true} size={48} className="hidden lg:block" />
          </Link>
        </Button>
      </div>

      <Separator className="opacity-50" />
      <div className="grid gap-y-2">
        {topItems.map((item) => (
          <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
        ))}
        <h2 className="text-md font-normal ml-4 mt-2">Dịch vụ</h2>
        {serviceItems.map((item) => (
          <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
        ))}
        {/* <h2 className="text-md font-normal ml-4 mt-6">Thư viện</h2>
        {libraryItems.map((item) => (
          <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
        ))} */}
        <h2 className="text-md font-normal ml-4 mt-6">Công cụ</h2>
        {toolItems.map((item) => (
          <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
        ))}

      </div>

      <div className="flex-1" />

      <Separator className="opacity-50" />

      <UserOptions>
        <Button size="lg" variant="ghost" className="w-full justify-start px-3">
          <UserAvatar size={34} className="mr-3" />
          <span>{user?.name}</span>
        </Button>
      </UserOptions>

      <Copyright className="ml-2" />
    </div>
  );
};
