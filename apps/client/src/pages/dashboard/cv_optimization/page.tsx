import { t } from "@lingui/macro";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ScrollArea } from "@career-ai/ui";
import { GridView } from "./_layouts/grid";

export const CVOptimizationPage = () => {
  return (
    <>
      <Helmet>
        <title>Kiểm tra và Tối ưu CV - {t`CareerAI`}</title>
      </Helmet>

      <div className="flex items-center justify-between pt-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Kiểm tra và Tối ưu CV
        </motion.h1>
      </div>

      <div className="max-w-[500px] pt-4 pb-4 text-md text-gray-500">
        Công cụ Kiểm Tra CV Toàn Diện giúp bạn tăng cơ hội được mời phỏng vấn bằng cách đánh giá từ
        khóa và định dạng CV của bạn.
      </div>

      <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)] mt-4">
        <GridView />
      </ScrollArea>
    </>
  );
};
