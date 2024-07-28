import { type Message } from "ai";
import { Separator } from "./separator";
import { ChatMessage } from "./chat-message";
import { LoadingSpinner } from "./spinner";

export interface ChatList {
  lng: string;
  messages: Message[];
  isLoading?: boolean;
  waitingForAudio?: boolean;
  assistantAvatar: string;
}

export default function ChatList({
  lng,
  messages,
  isLoading,
  waitingForAudio,
  assistantAvatar,
}: ChatList) {
  const user = {
    name: "John Doe",
    email: "test@lilyspeak.app",
    image: "",
  };
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl w-full pb-4">
      {messages.map((message, index) => {
        if (!message.content) {
          return null;
        }
        return (
          <div key={index}>
            <ChatMessage
              lng={lng}
              messages={messages}
              messageIndex={index}
              assistantAvatar={assistantAvatar}
              userAvatar={user?.image}
            />
            <Separator className="my-1 lg:my-2 bg-transparent" />
          </div>
        );
      })}
      {(waitingForAudio || isLoading) && (
        <div className="flex h-8 ml-6 text-white">
          <LoadingSpinner className="w-6 h-6" />
          &nbsp;&nbsp;.&nbsp;.&nbsp;.
        </div>
      )}
    </div>
  );
}
