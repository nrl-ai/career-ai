"use client";
import * as React from "react";
import { UseChatHelpers } from "ai/react";
import { useEnterSubmit } from "./use-enter-submit";
import Microphone from "./microphone";
export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  lng: string;
  onSubmit: (value: string) => void;
  isLoading: boolean;
  onStartRecording?: () => void;
}

export function PromptForm({
  lng,
  onSubmit,
  input,
  setInput,
  onStartRecording,
}: PromptProps) {
  const { formRef } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onNewText = async (text: string) => {
    setInput("");
    await onSubmit(text);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!input?.trim()) {
          return;
        }
        setInput("");
        await onSubmit(input);
      }}
      ref={formRef}
    >
      <div className="relative flex flex-col w-full overflow-hidden max-h-25 h-25 grow rounded-xl sm:border sm:px-2 py-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-300">
        <Microphone
          iconSize={26}
          onNewText={onNewText}
          onStartRecording={onStartRecording}
        />
        <p className="text-sm text-center text-gray-500 mb-2">
          {"Press to start/stop recording."}
        </p>
      </div>
    </form>
  );
}
