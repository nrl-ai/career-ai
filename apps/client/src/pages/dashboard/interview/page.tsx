import { t } from "@lingui/macro";
import { ScrollArea } from "@career-ai/ui";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export const InterviewPage = () => {
  return (
    <>
      <Helmet>
        <title>
          {t`Interview`} - {t`CareerAI`}
        </title>
      </Helmet>

      <div className="flex items-center justify-between pt-4">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tight"
        >
          {t`Interview`}
        </motion.h1>
      </div>

      <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)] pt-6">
        <iframe
          src="https://prompt3d.netlify.app/"
          className="w-full h-full min-h-[600px] rounded-md"
          allow="camera https://prompt3d.netlify.app; microphone https://prompt3d.netlify.app"
        />
      </ScrollArea>
    </>
  );
};
