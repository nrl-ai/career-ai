import { t } from "@lingui/macro";
import { Button, Separator } from "@career-ai/ui";
import { cn } from "@career-ai/utils";
import {
  IoCalculatorOutline,
  IoCheckmarkDoneCircleOutline,
  IoAppsSharp,
  IoAppsOutline,
  IoHomeOutline,
  IoLibraryOutline,
  IoNewspaperOutline,
  IoServerOutline,
  IoSettingsOutline,
  IoTodayOutline,
  IoCameraOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { GoSidebarExpand } from "react-icons/go";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";

import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { useUpdateUser, useUser } from "@/client/services/user";
import { useToast } from "@/client/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";

type SidebarItem = {
  path: string;
  name: string;
  icon: React.ReactNode;
  isCollapsed?: boolean;
};

type SidebarItemProps = SidebarItem & {
  onClick?: () => void;
};

const SidebarItem = ({ path, name, icon, onClick, isCollapsed }: SidebarItemProps) => {
  const isActive = useLocation().pathname === path;

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        "flex h-auto items-start justify-start rounded-lg py-2.5",
        isActive && "pointer-events-none bg-blue-100 text-secondary-foreground",
        !isCollapsed && "px-3",
        isCollapsed && "px-1",
      )}
      onClick={onClick}
    >
      <Link to={path} className="flex size-full my-[2px]">
        <div
          className={cn(
            "text-xl",
            isActive && "text-blue-500",
            isCollapsed ? "block mx-auto" : "mr-3",
          )}
        >
          {icon}
        </div>
        {!isCollapsed && (
          <span className={cn("font-normal", isActive && "font-bold text-blue-500")}>{name}</span>
        )}
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

const iconStyle = { color: "#6B94F9" };

export const Sidebar = ({ isOpen, setOpen, isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [ requests, setRequests ] = useState(0);
  const { updateUser, loading } = useUpdateUser();
  
  // refresh requests for the next day
  const today = new Date()
  const lastActiveDay = new Date(user?.lastActiveDay as string)

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    if (formatDate(today) != formatDate(lastActiveDay)) {
      updateUser({
        numRequestsToday: 200, 
        lastActiveDay: today,
      })
    }
  }, [])
  // end here

  if (user != null) {
    useEffect(() => {
      setRequests(user.numRequestsToday)
    }, [user])
  }

  const topItems: SidebarItem[] = [
    {
      path: "/dashboard",
      name: t`Dashboard`,
      icon: <IoAppsOutline style={iconStyle} />,
    },
  ];

  const serviceItems: SidebarItem[] = [
    {
      path: "/dashboard/resumes",
      name: t`Build Your Resume`,
      icon: <IoNewspaperOutline style={iconStyle} />,
    },
    {
      path: "/dashboard/cv-optimization",
      name: t`Check & Optimize Resume`,
      icon: <IoCheckmarkDoneCircleOutline style={iconStyle} />,
    },
    // {
    //   path: "/dashboard/interview-room",
    //   name: t`Mock Interview - Simple`,
    //   icon: <IoPersonOutline style={iconStyle} />,
    // },
    {
      path: "/dashboard/interview",
      name: t`Mock Interview`,
      icon: <IoTodayOutline style={iconStyle} />,
    },
  ];

  const libraryItems: SidebarItem[] = [
    {
      path: "/dashboard/courses",
      name: t`Skill Courses`,
      icon: <PiGraduationCap style={iconStyle} />,
    },
    // {
    //   path: "https://blog.career-ai.vn/",
    //   name: t`Knowledge Library`,
    //   icon: <IoLibraryOutline style={iconStyle} />,
    // },
  ];

  const toolItems: SidebarItem[] = [
    {
      path: "#",
      name: t`Gross-Net Salary Calculator`,
      icon: <IoCalculatorOutline style={iconStyle} />,
    },
    {
      path: "#",
      name: t`Personal Income Tax Calculator`,
      icon: <IoServerOutline style={iconStyle} />,
    },
  ];

  return (
    <div className={cn("flex h-full flex-col gap-y-2", isCollapsed ? "md:p-2" : "md:p-4")}>
      <div className="ml-12 flex justify-between lg:mb-4 pb-4 lg:ml-0">
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
            className="text-gray-500"
            onClick={() => {
              setIsCollapsed?.(!isCollapsed);
            }}
          >
            {isCollapsed ? (
              <MdKeyboardDoubleArrowRight className="text-2xl font-normal" />
            ) : (
              <GoSidebarExpand className="text-2xl font-normal" />
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
            <BsLayoutSidebarInset className="text-2xl font-normal" />
          )}
        </Button>
      )}

      <UserOptions>
        <Button
          size="lg"
          variant="ghost"
          className={cn(
            "justify-star w-full py-7",
            isCollapsed
              ? "px-0"
              : "px-3 bg-gray-100/90 hover:bg-gray-200/90 shadow-gray-200 mb-2 rounded-2xl",
          )}
        >
          <UserAvatar size={38} className={cn(isCollapsed ? "mr-0" : "mr-3")} />
          {!isCollapsed && (
            <div className="flex flex-col text-left flex-grow">
              <span className="text-sm text-gray-500">{t`Pro User`}</span>{" "}
              <span className="max-w-[120px] truncate font-medium">{user?.name}</span>
            </div>
          )}
          {!isCollapsed && <IoIosArrowDown className="ml-auto text-xl text-gray-500" />}
        </Button>
      </UserOptions>

      <div className={cn("grid mt-2", !isCollapsed && "gap-y-1")}>
        {topItems.map((item) => (
          <SidebarItem
            isCollapsed={isCollapsed}
            {...item}
            key={item.path}
            onClick={() => setOpen?.(false)}
          />
        ))}

        {/* <Separator className="opacity-100" /> */}

        <h2
          className={cn(
            "mb-2 mt-4 text-xs font-normal uppercase text-gray-400",
            isCollapsed && "text-center",
          )}
        >
          {t`Services`}
        </h2>
        {serviceItems.map((item) => (
          <SidebarItem
            isCollapsed={isCollapsed}
            {...item}
            key={item.path}
            onClick={() => setOpen?.(false)}
          />
        ))}

        {/* <Separator className="opacity-100" /> */}

        {/* <h2
          className={cn(
            "mb-2 mt-4 text-xs font-normal uppercase text-gray-400",
            isCollapsed && "text-center",
          )}
        >
          {isCollapsed ? "Library" : "News & Community"}
        </h2>
        {libraryItems.map((item) => (
          <SidebarItem
            isCollapsed={isCollapsed}
            {...item}
            key={item.path}
            onClick={() => setOpen?.(false)}
          />
        ))} */}

        {/* <Separator className="opacity-100" /> */}

        {/* <h2
          className={cn(
            "mb-2 mt-4 text-xs font-normal uppercase text-gray-400",
            isCollapsed && "text-center",
          )}
        >
          {isCollapsed ? "Tools" : "Calculators"}
        </h2>
        {toolItems.map((item) => (
          <SidebarItem
            isCollapsed={isCollapsed}
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
        ))} */}

      </div>

      {/** Count LLM api requests remaining */}
      {
      !isCollapsed ?
        (<div id="count-llm-requests">
          <Card>
            <p className="">LLM requests remaining: <span>{requests}</span></p>
          </Card>
        </div>) :
        (<div></div>)
      }

      
      {/** End here */}

      <div className="flex flex-col mt-auto">
        <div className="flex flex-col justify-start mt-16">
          <div className="space-x-2 text-left text-blue-500">
            {isCollapsed ? "With" : "Powered By"}
          </div>
          <img src="/gemini.svg" alt="Gemini" className="text-left w-28" />
        </div>
      </div>
    </div>
  );
};
