import * as React from "react";
import { type UseChatHelpers } from "ai/react";

import { PromptForm } from "./prompt-form";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    "append" | "isLoading" | "reload" | "messages" | "stop" | "input" | "setInput"
  > {
  lng: string;
  id?: string;
  title?: string;
  isFinished?: boolean;
  onStartRecording?: () => void;
}

export default function ChatPanel({
  lng,
  isLoading,
  append,
  input,
  setInput,
  messages,
  onStartRecording,
}: ChatPanelProps) {
  return (
    <div className="w-full dark:from-background/10 dark:from-10% dark:to-background/80">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className={"mb-2 " + (messages.length > 0 ? "" : " hidden")}>
          <PromptForm
            lng={lng}
            onSubmit={async (value) => {
              await append({
                content: value,
                role: "user",
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            onStartRecording={onStartRecording}
          />
        </div>
      </div>
    </div>
  );
}
