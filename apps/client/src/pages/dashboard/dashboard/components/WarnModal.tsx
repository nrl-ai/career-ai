import { useDialog, useDialogStore } from "@/client/stores/dialog";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@career-ai/ui";
import { useBoardStore } from "../store/BoardStore";
import { KanbanTypes } from "../types";

const WarnModal = () => {
  const { isOpen: isModalOpen, close } = useDialog("warning");
  const { removeBoard, removeTask } = useBoardStore();
  const { activeColumn, activeTask, activeBoard, type } = useDialogStore(
    (state) => state.dialog?.payload?.item,
  ) as any;
  const handleRemove = () => {
    if (type === KanbanTypes.Board && activeBoard) {
      removeBoard(activeBoard.id);
    }

    if (type === KanbanTypes.Task && activeColumn && activeTask) {
      removeTask(activeColumn.id, activeTask.id);
    }
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={close}>
        <DialogContent closeButtonClassName="hidden">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Delete this {type}?
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <p>
              {` Are you sure you want to delete the '${
                type == KanbanTypes.Board ? activeBoard?.title : activeTask?.title
              }' ${type}?
              This action will remove all columns and tasks and cannot be
              reversed.`}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant={"error"} onClick={handleRemove}>
              Delete
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => {
                close();
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WarnModal;
