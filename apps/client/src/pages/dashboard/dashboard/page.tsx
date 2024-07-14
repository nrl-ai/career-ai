import { t } from "@lingui/macro";
import { ScrollArea, Tabs } from "@career-ai/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { GridView } from "../resumes/_layouts/grid";
import { BoardView } from "../dashboard/board";

type Layout = "grid";

export const DashboardPage = () => {
  const [layout, setLayout] = useState<Layout>("grid");

  return (
    <>
      <Helmet>
        <title>
          {t`Dashboard`} - {t`CareerAI`}
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
            {t`Dashboard`}
          </motion.h1>
        </div>

        <main className="grid gap-y12" style={{ maxWidth: "1200px" }}>
          <div className="max-w-[500px] pb-4 text-md text-gray-500">
            {t`Create CVs quickly and easily using our templates. Manage CVs for different jobs and positions here.`}
          </div>
          <GridView maxSize={2} />
        </main>

        <div className="flex items-center justify-between pt-4">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tight"
          >
            {t`Job Application Tracker`}
          </motion.h1>
        </div>

        <main className="grid gap-y12" style={{ maxWidth: "1200px" }}>
          <BoardView />
        </main>
      </Tabs>
    </>
  );
};
