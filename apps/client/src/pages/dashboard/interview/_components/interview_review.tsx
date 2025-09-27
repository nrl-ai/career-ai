import { Dialog, DialogContent } from "@career-ai/ui";
import ChatList from "../../interview_room/_components/chat-list";
import { ScrollArea } from "@career-ai/ui";

const InterviewReview = ({
  data,
  isOpen,
  setIsOpen,
}: {
  data: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent>
        <h2 className="text-2xl font-bold">Interview Review</h2>
        {data && (
          <ScrollArea className="flex-grow max-h-[600px]">
            <ChatList
              lng={"en"}
              messages={data.content}
              isLoading={false}
              waitingForAudio={false}
            />
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InterviewReview;
