import { t } from "@lingui/macro";
import { ScrollArea, Tabs, TabsContent } from "@career-ai/ui";
import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { GridView } from "./_layouts/grid";
import { ListView } from "./_layouts/list";

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
            className="text-3xl font-bold tracking-tight"
          >
            {t`Resumes`}
          </motion.h1>
        </div>

        <div className="max-w-[500px] pb-4 text-md text-gray-500">
          Tạo CV theo các mẫu có sẵn dễ dàng và nhanh chóng. Bạn có thể quản lý CV cho các công việc và vị trí khác nhau ngay tại đây.
        </div>

        <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)] mt-4">
          <GridView />
        </ScrollArea>
      </Tabs>
    </>
  );
};
