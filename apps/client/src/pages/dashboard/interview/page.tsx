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

      <main className="grid gap-y12" style={{ maxWidth: "1200px" }}>
        <div className="flex items-center justify-between pt-4">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tight"
          >
            {t`Interview`}
          </motion.h1>
        </div>

        <div className="max-w-[600px] pt-4 mb-8 text-md text-gray-500">
          {t`The Mock Interview tool helps you practice interviews effectively and authentically, and is currently under development. Please wait for the experience in the near future.`}
        </div>

        <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
          <iframe
            src="https://prompt3d.netlify.app/"
            className="w-full h-full min-h-[600px] rounded-md"
            allow="camera https://prompt3d.netlify.app; microphone https://prompt3d.netlify.app"
          />
        </ScrollArea>
      </main>
    </>
  );
};
