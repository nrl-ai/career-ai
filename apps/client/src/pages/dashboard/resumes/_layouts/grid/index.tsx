import { t } from "@lingui/macro";
import { sortByDate } from "@career-ai/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useResumes } from "@/client/services/resume";
import { BaseCard } from "./_components/base-card";
import { CreateResumeCard } from "./_components/create-card";
import { ImportResumeCard } from "./_components/import-card";
import { ResumeCard } from "./_components/resume-card";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export const GridView = ({ maxSize }: { maxSize: number | null }) => {
  const { resumes, loading } = useResumes();
  const filteredResumes = resumes && maxSize ? resumes.slice(0, maxSize) : resumes;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 p-3">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <CreateResumeCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
      >
        <ImportResumeCard />
      </motion.div>

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

      {filteredResumes && (
        <AnimatePresence>
          {filteredResumes
            .sort((a, b) => sortByDate(a, b, "updatedAt"))
            .map((resume, index) => (
              <motion.div
                key={resume.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <ResumeCard resume={resume} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}

      {/* View Show more on Resumes Page */}
      {maxSize && resumes && resumes.length > maxSize && (
        <Link to="/dashboard/resumes">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
          >
            <BaseCard
              onClick={() => {}}
              className="bg-gray-100 text-gray-500 border-2 border-dashed border-gray-500 flex items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center text-center p-2">
                <MdKeyboardArrowRight className="w-12 h-12 mx-auto" />
                <h4 className="text-gray-500 font-bold mt-8">
                  {t`View ${resumes.length - maxSize} more`}
                </h4>
              </div>
            </BaseCard>
          </motion.div>
        </Link>
      )}
    </div>
  );
};
