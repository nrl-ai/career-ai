import { useResumes } from "@/client/services/resume";
import { useDialog, useDialogStore } from "@/client/stores/dialog";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@career-ai/ui";
import { useState } from "react";
import { BaseButton } from "../../interview_information/_components/base_button";
import { CVSelector } from "../../interview_information/_components/cv_selector";
import { useBoardStore } from "../store/BoardStore";

const AddCVModal = () => {
  const { isOpen, close } = useDialog("add-cv");
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const { resumes, loading } = useResumes();
  const { updateTask } = useBoardStore();

  const { task, column } = useDialogStore((state) => state.dialog?.payload?.item) as any;

  const handleSelectCV = (id: string) => {
    setSelectedCV(id);
  };

  const handleSave = () => {
    const selectedCVDetailed = selectedCV ? resumes?.find((cv) => cv.id === selectedCV) : null;
    if (task && column) {
      const updatedTask = {
        ...task,
        resume: selectedCVDetailed,
      };
      updateTask(column.id, updatedTask);
    }
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a resume</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col mt-[18px]">
          <div className="w-full flex mt-2 gap-2">
            <BaseButton
              title="Create new resume"
              content="Create new resume from templates"
              icon="pi pi-plus-circle"
              dialog="resume"
            />
            <BaseButton
              title="Import exisiting resume"
              content="LinkedIn, JSON Resume, etc."
              icon="pi pi-arrow-down"
              dialog="import"
            />
          </div>
          <div className="mt-4">
            <span className="text-base text-[#191919] font-medium">Recent Resume</span>
            <CVSelector selectedCV={selectedCV} setSelectedCV={handleSelectCV} />
          </div>
        </div>
        <div className="text-right">
          <Button onClick={handleSave} disabled={!selectedCV}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCVModal;
