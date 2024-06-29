import { t } from "@lingui/macro";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export const ComingSoonPage = () => {
  return (
    <>
      <Helmet>
        <title>
          {t`Coming Soon`} - {t`CareerAI`}
        </title>
      </Helmet>

      <div className="flex items-center justify-between pt-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          {t`Coming Soon`}
        </motion.h1>
      </div>

      <div className="pt-4">
        <p className="text-lg text-gray-500">
          {t`This page is under construction. Please check back later.`}
        </p>
      </div>

      <div className="pt-4">
        <img
          src="/assets/coming-soon.webp"
          alt="Coming Soon"
          className="max-w-[400px] rounded-xl"
        />
      </div>
    </>
  );
};
