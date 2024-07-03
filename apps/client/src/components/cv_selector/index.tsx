import { sortByDate } from "@career-ai/utils";
import { AnimatePresence, motion } from "framer-motion";
import { t } from "@lingui/macro";

import { useResumes } from "@/client/services/resume";

import { Card, CardContent, Button } from "@career-ai/ui";
import { BaseCard } from "./_components/base-card";
import { CreateResumeCard } from "./_components/create-card";
import { ImportResumeCard } from "./_components/import-card";
import { ResumeCard } from "./_components/resume-card";
import dayjs from "dayjs";

export const CVSelector = ({
  selectedCV,
  setSelectedCV,
}: {
  selectedCV: string | null;
  setSelectedCV: (cv: string) => void;
}) => {
  const { resumes, loading } = useResumes();
  const selectedCVDetailed = selectedCV ? resumes?.find((cv) => cv.id === selectedCV) : null;

  const handleSelect = (id: string) => {
    setSelectedCV(id);
  };

  // Collapse when CV is selected
  if (selectedCV && selectedCVDetailed) {
    const lastUpdated = dayjs().to(selectedCVDetailed.updatedAt);
    return (
      <div className="w-full pt-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex flex-row items-start w-full gap-2"
        >
          <Card className="w-full flex flex-row max-w-[400px] border-2 border-blue-500  p-2 bg-whit rounded-2xl bg-blue-500">
            <img className="h-24 m-2 rounded-lg shadow-md border-2 border-blue-200" src={`/templates/jpg/${selectedCVDetailed.data.metadata.template}.jpg`} />
            <CardContent>
              <div className="text-lg font-semibold text-white">{selectedCVDetailed.title}</div>
              <div className="line-clamp-1 text-xs text-gray-100 opacity-75">{t`Last updated ${lastUpdated}`}</div>
            </CardContent>
          </Card>
          <Button className="mt-0" variant={"secondary"} onClick={() => setSelectedCV("")}>
            {t`Change`}
          </Button>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7 4xl:grid-cols-8 6xl:grid-cols-9 mt-6">
      {loading &&
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="duration-300 animate-in fade-in"
            style={{ animationFillMode: "backwards", animationDelay: `${i * 300}ms` }}
          >
            <BaseCard />
          </div>
        ))}

      {resumes && (
        <AnimatePresence>
          {resumes
            .sort((a, b) => sortByDate(a, b, "updatedAt"))
            .map((resume, index) => (
              <motion.div
                key={resume.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <ResumeCard
                  onClick={() => {
                    handleSelect(resume.id);
                  }}
                  selected={resume.id == selectedCV}
                  resume={resume}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      )}

      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <CreateResumeCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
      >
        <ImportResumeCard />
      </motion.div>
    </div>
  );
};
