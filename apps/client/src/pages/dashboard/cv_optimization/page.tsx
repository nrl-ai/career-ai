import { t } from "@lingui/macro";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { CVSelector } from "../../../components/cv_selector";

import JobDescriptionForm from "./jd_form";

export const CVOptimizationPage = () => {
  const [selectedCV, setSelectedCV] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>Kiểm tra và Tối ưu CV - {t`CareerAI`}</title>
      </Helmet>

      <div className="flex items-center justify-between pt-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tight"
        >
          Kiểm tra và Tối ưu CV
        </motion.h1>
      </div>

      <div className="max-w-[500px] pt-4 mb-8 text-md text-gray-500">
        Công cụ Kiểm Tra CV Toàn Diện giúp bạn tăng cơ hội được mời phỏng vấn bằng cách đánh giá từ
        khóa và định dạng CV của bạn.
      </div>

      <div className="flex items-center space-x-4">
        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
          <span className="font-bold">1</span>
        </div>
        <h1 className="font-bold text-xl">Chọn CV</h1>
      </div>

      <CVSelector selectedCV={selectedCV} setSelectedCV={setSelectedCV} />

      <div className="flex items-center space-x-4 mb-4 mt-8">
        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
          <span className="font-bold">2</span>
        </div>
        <h1 className="font-bold text-xl">Mô tả công việc (nên có)</h1>
      </div>

      <JobDescriptionForm />

    </>
  );
};
