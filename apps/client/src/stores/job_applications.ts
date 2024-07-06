import { create } from "zustand";
import { persist } from "zustand/middleware";

type JobApplicationsState = {
  jobApplications: any | null;
};

type JobApplicationsActions = {
  setJobApplications: (jobApplications: any | null) => void;
};

export const useJobApplicationsStore = create<JobApplicationsState & JobApplicationsActions>()(
  persist(
    (set) => ({
      jobApplications: null,
      setJobApplications: (jobApplications) => {
        set({ jobApplications });
      },
    }),
    { name: "JobApplications" },
  ),
);
