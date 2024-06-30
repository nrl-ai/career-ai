import { sortByDate } from "@career-ai/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useResumes } from "@/client/services/resume";

import { BaseCard } from "./_components/base-card";
import { CreateResumeCard } from "./_components/create-card";
import { ImportResumeCard } from "./_components/import-card";
import { ResumeCard } from "./_components/resume-card";

export const CVSelector = ({
  selectedCV,
  setSelectedCV,
}: {
  selectedCV: string | null;
  setSelectedCV: (cv: string) => void;
}) => {
  const { resumes, loading } = useResumes();

  const handleSelect = (id: string) => {
    setSelectedCV(id);
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7 4xl:grid-cols-8 6xl:grid-cols-9 mt-6">
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
