import { AwardsDialog } from "../pages/builder/sidebars/left/dialogs/awards";
import { CertificationsDialog } from "../pages/builder/sidebars/left/dialogs/certifications";
import { CustomSectionDialog } from "../pages/builder/sidebars/left/dialogs/custom-section";
import { EducationDialog } from "../pages/builder/sidebars/left/dialogs/education";
import { ExperienceDialog } from "../pages/builder/sidebars/left/dialogs/experience";
import { InterestsDialog } from "../pages/builder/sidebars/left/dialogs/interests";
import { LanguagesDialog } from "../pages/builder/sidebars/left/dialogs/languages";
import { ProfilesDialog } from "../pages/builder/sidebars/left/dialogs/profiles";
import { ProjectsDialog } from "../pages/builder/sidebars/left/dialogs/projects";
import { PublicationsDialog } from "../pages/builder/sidebars/left/dialogs/publications";
import { ReferencesDialog } from "../pages/builder/sidebars/left/dialogs/references";
import { SkillsDialog } from "../pages/builder/sidebars/left/dialogs/skills";
import { VolunteerDialog } from "../pages/builder/sidebars/left/dialogs/volunteer";
import EditBoardModal from "../pages/dashboard/dashboard/components/EditBoardModal";
import EditTaskModal from "../pages/dashboard/dashboard/components/EditTaskModal";
import TaskModal from "../pages/dashboard/dashboard/components/TaskModal";
import WarnModal from "../pages/dashboard/dashboard/components/WarnModal";
import { ImportDialog } from "../pages/dashboard/resumes/_dialogs/import";
import { LockDialog } from "../pages/dashboard/resumes/_dialogs/lock";
import { ResumeDialog } from "../pages/dashboard/resumes/_dialogs/resume";
import { TwoFactorDialog } from "../pages/dashboard/settings/_dialogs/two-factor";
import { useDialogStore } from "../stores/dialog";
import { useResumeStore } from "../stores/resume";

type Props = {
  children: React.ReactNode;
};

export const DialogProvider = ({ children }: Props) => {
  const isResumeLoaded = useResumeStore((state) => Object.keys(state.resume).length > 0);
  const isEditTaskOpen = useDialogStore((state) => state.dialog?.payload?.id === "edit-task");
  const isWarningOpen = useDialogStore((state) => state.dialog?.payload?.id === "warning");
  console.log("🚀 ~ DialogProvider ~ isDialogOpen:", isEditTaskOpen);

  return (
    <>
      {children}

      <div id="dialog-root">
        <ResumeDialog />
        <LockDialog />
        <ImportDialog />
        <TwoFactorDialog />
        <EditBoardModal />
        <TaskModal />
        {isWarningOpen && <WarnModal />}
        {isEditTaskOpen && <EditTaskModal />}

        {isResumeLoaded && (
          <>
            <ProfilesDialog />
            <ExperienceDialog />
            <EducationDialog />
            <AwardsDialog />
            <CertificationsDialog />
            <InterestsDialog />
            <LanguagesDialog />
            <ProjectsDialog />
            <PublicationsDialog />
            <VolunteerDialog />
            <SkillsDialog />
            <ReferencesDialog />
            <CustomSectionDialog />
          </>
        )}
      </div>
    </>
  );
};
