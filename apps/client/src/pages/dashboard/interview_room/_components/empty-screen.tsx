import { IconArrowRight } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { CVSelector } from "@/client/components/cv_selector";

export function EmptyScreen({ append, lng }: any) {
  const [position, setPosition] = useState("");
  const [selectedCV, setSelectedCV] = useState<string | null>(null);

  const positionsOptions =
    "Software Engineer;Marketing Associate;Data Scientist;Sales Representative;Financial Analyst;Accountant;HR Manager;Product Manager".split(
      ";",
    );
  useEffect(() => {
    setPosition(positionsOptions[0]);
  }, []);

  const handleSelectCV = (id: string) => {
    setSelectedCV(id);
  };

  return (
    <div className="max-w-[1200px] w-full overflow-auto pt-6">
      <div className="rounded-2xl p-8 lg:p-8 overflow-auto pt-10 relative bg-gradient-to-t from-gray-100 to-gray-200">
        {/* <div className="hidden lg:block absolute top-4 right-4 z-50">
          <a href={`/${lng}/apps/speaking/lessons`}>
            <IconX className="bg-black bg-opacity-5 text-gray-700 rounded-full p-2 z-50 w-8 h-8" />
          </a>
        </div> */}
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold tracking-tight mb-4 border-blue-500 border-b-4">
            {"Welcome to Interview Room! ⭐⭐⭐"}
          </h1>
        </div>
        <div className="flex items-center justify-center mt-6 mb-2">
          <h2 className="text-lg font-semibold mb-8">{"Which position are you applying for?"}</h2>
        </div>
        <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-1">
          {positionsOptions.map((option: string) => (
            <motion.nav
              key={option}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white bg-gradient-to-br from-blue-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold0 px-3 py-3 mt-1 mr-1 cursor-default"
              onClick={() => setPosition(option)}
            >
              {option}
            </motion.nav>
          ))}
        </div>
        <div className="flex items-center justify-center mt-2">
          <input
            type="text"
            className="rounded-lg shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50 focus:ring-offset-background w-[300px] h-8 px-4 py-4 text-sm text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 border-2 border-blue-500"
            placeholder={"Type in position to apply"}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="flex items-center justify-center mt-8">
          <h2 className="text-lg font-semibold mb-2">
            Select a resume to start interview (optional)
          </h2>
        </div>
        <CVSelector selectedCV={selectedCV} setSelectedCV={handleSelectCV} />

        <div className="flex items-center justify-center mt-4">
          <button
            className="text-white shadow-md bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-xl flex flex-row px-4 py-3 mt-2"
            onClick={() =>
              append({
                role: "user",
                content: "I am applying for position: " + position,
              })
            }
          >
            <IconArrowRight className="mr-2" />
            <span className="font-semibold leading-6">Start Interview</span>
          </button>
        </div>
      </div>
    </div>
  );
}
