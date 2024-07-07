import Board from "./components/Board/Board";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { useBoardStore } from "./store/BoardStore";
import { useJobApplications } from "@/client/services/job-applications";
import { updateJobApplications } from "@/client/services/job-applications";
import { sampleData } from "./store/boards";

export function BoardView() {
  const [displayedSideMenu] = useState(false);
  const { jobApplications, loading } = useJobApplications();
  const { setActiveBoard, setBoardData } = useBoardStore();

  useEffect(() => {
    // Set sample data if no job applications
    if (
      !loading &&
      ((typeof jobApplications === "object" &&
        !Array.isArray(jobApplications) &&
        jobApplications !== null) ||
        (typeof jobApplications === "object" &&
          Array.isArray(jobApplications) &&
          jobApplications?.length === 0))
    ) {
      setBoardData(sampleData);
      setActiveBoard(sampleData[0]?.id);
    } else if (!loading && Array.isArray(jobApplications)) {
      setBoardData(jobApplications);
      setActiveBoard(jobApplications[0]?.id);
    }
  }, [jobApplications, setBoardData, setActiveBoard]);

  if (
    loading ||
    (typeof jobApplications === "object" &&
      !Array.isArray(jobApplications) &&
      jobApplications !== null)
  )
    return <div>Loading...</div>;
  return (
    <div className="Wrapper">
      <main className="AppContainer">
        <Header displayedSideMenu={displayedSideMenu} />
        <Board displayedSideMenu={displayedSideMenu} />
      </main>
    </div>
  );
}
