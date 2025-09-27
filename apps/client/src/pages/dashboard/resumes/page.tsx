import { t } from "@lingui/macro";
import { ScrollArea, Tabs } from "@career-ai/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { GridView } from "./_layouts/grid";

type Layout = "grid" | "list";

export const ResumesPage = () => {
  const [layout, setLayout] = useState<Layout>("grid");

  return (
    <>
      <Helmet>
        <title>
          {t`Resumes`} - {t`CareerAI`}
        </title>
      </Helmet>

      <Tabs
        value={layout}
        className="space-y-4"
        onValueChange={(value) => {
          setLayout(value as Layout);
        }}
      >
        <div className="flex items-center justify-between pt-4">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tight"
          >
            {t`Resumes`}
          </motion.h1>
        </div>

        <main className="grid gap-y12" style={{ maxWidth: "1200px" }}>
          <div className="max-w-[500px] pb-4 text-md text-gray-500">
            {t`Create CVs quickly and easily using our templates. Manage CVs for different jobs and positions here.`}
          </div>

          <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)] mt-4 overflow-visible">
            <GridView />
          </ScrollArea>
        </main>
      </Tabs>
    </>
  );
};
