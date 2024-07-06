import { ScrollArea } from "@career-ai/ui";
import { Outlet } from "react-router-dom";

import { Footer } from "./components/footer";
import { Header } from "./components/header";

export const HomeLayout = () => (
  <ScrollArea orientation="vertical" className="h-screen">
    <Outlet />
    <Footer />
  </ScrollArea>
);
