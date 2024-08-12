import { t } from "@lingui/macro";
import { cn } from "@career-ai/utils";
import { useMemo } from "react";
import { Link, matchRoutes, Outlet, useLocation } from "react-router-dom";

import { LocaleSwitch } from "@/client/components/locale-switch";
import { Icon } from "@/client/components/icon";
import { useAuthProviders } from "@/client/services/auth/providers";

import { SocialAuth } from "./_components/social-auth";

const authRoutes = [{ path: "/auth/login" }, { path: "/auth/register" }];

export const AuthLayout = () => {
  const location = useLocation();
  const { providers } = useAuthProviders();
  const isAuthRoute = useMemo(() => matchRoutes(authRoutes, location) !== null, [location]);

  if (!providers) return null;

  // Condition (providers.length === 1) hides the divider if providers[] includes only "email"
  const hideDivider = !providers.includes("email") || providers.length === 1;

  return (
    // eslint-disable-next-line tailwindcss/enforces-shorthand -- size-screen not implemented yet
    <div className="flex h-screen w-screen">
      <div className="relative flex w-full flex-col justify-center gap-y-8 px-12 sm:mx-auto sm:basis-[420px] sm:px-0 lg:basis-[480px] lg:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="size-24 mt-3">
            <Icon className="mt-2" size={48} textClassName="text-3xl mt-3" />
          </Link>

          <div className="right-0 space-x-2 text-right lg:absolute lg:p-12 lg:text-center">
            <LocaleSwitch />
          </div>
        </div>

        <Outlet />

        {isAuthRoute && (
          <>
            <div className={cn("flex items-center gap-x-4", hideDivider && "hidden")}>
              <hr className="flex-1" />
              <span className="text-xs font-medium">
                {t({
                  message: "Continue with",
                  context:
                    "The user can either login with email/password, or continue with GitHub or Google.",
                })}
              </span>
              <hr className="flex-1" />
            </div>

            <SocialAuth />
          </>
        )}
      </div>

      <div className="relative hidden lg:block lg:flex-1">
        <img
          width={1920}
          height={1080}
          alt="Open books on a table"
          className="h-screen w-full object-cover object-center"
          src="/backgrounds/charlesdeluvio-rRWiVQzLm7k-unsplash.jpg"
        />
      </div>
    </div>
  );
};
