"use client";
import { type Message } from "ai";
import { Button } from "./button";
import { IconCheck, IconCopy } from "./icons";
import { useCopyToClipboard } from "./use-copy-to-clipboard";
import cn from "classnames";
import { IconWand } from "@tabler/icons-react";
const BASE_URL = "";
interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  lng: string;
  messageIndex: number;
  messages: Message[];
  translation?: string | null;
  setTranslation?: (translation: string | null) => void;
  translating?: boolean;
  setTranslating?: (translating: boolean) => void;
  evaluation?: string | null;
  setEvaluation?: (evaluation: string | null) => void;
  evaluating?: boolean;
  setEvaluating?: (evaluating: boolean) => void;
}

export function ChatMessageActions({
  lng,
  messageIndex,
  messages,
  translation,
  setTranslation,
  translating,
  setTranslating,
  evaluation,
  setEvaluation,
  evaluating,
  setEvaluating,
  className,
  ...props
}: ChatMessageActionsProps) {
  // const { t } = useTranslation(lng, "speaking");
  const message = messages[messageIndex];
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  const handleTranslate = async (text: string, target: string) => {
    if (translating || translation !== null || !setTranslation || !setTranslating) {
      return;
    }
    setTranslating(true);
    try {
      const response = await fetch(`${BASE_URL}/api/translate`, {
        method: "POST",
        body: JSON.stringify({ text, target }),
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalToken()}`,
        },
      });
      setTranslation(await response.json());
    } catch (error) {
      // console.error(error);
    } finally {
      setTranslating(false);
    }
  };

  const handleEvaluate = async () => {
    if (evaluating || evaluation !== null || !setEvaluation || !setEvaluating) {
      return;
    }
    setEvaluating(true);
    let messagesToEvaluate = messages.slice(0, messageIndex + 1);
    // Remove id, createdAt from messages
    messagesToEvaluate = messagesToEvaluate.map((message: any) => {
      delete message.id;
      delete message.createdAt;
      return message;
    });
    try {
      const response = await fetch(`${BASE_URL}/api/role_playing/message-evaluation`, {
        method: "POST",
        body: JSON.stringify({ messages: messagesToEvaluate }),
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalToken()}`,
        },
      });
      setEvaluation(await response.text());
    } catch (error) {
      // console.error(error);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-end transition-opacity opacity-100 rounded-lg text-gray-800",
        className,
      )}
      {...props}
    >
      <Button
        variant="ghost"
        size="icon"
        className="bg-white rounred-lg shadow-sm border"
        onClick={onCopy}
      >
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
      {message.role != "user" && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "ml-2 rounded-xl",
              translating || translation !== null
                ? "text-gray-400 hover:text-gray-400 bg-gray-200 hover:bg-gray-200 cursor-not-allowed shadow-sm border"
                : "bg-white hover:bg-white shadow-md border",
            )}
            onClick={() => {
              if (translating || translation !== null) {
                return;
              }
              handleTranslate(message.content, "vi");
            }}
          >
            <span className="sr-only">Translate message</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                />
              </svg>
            </span>
          </Button>
        </>
      )}
      {message.role === "user" && (
        <Button
          variant="ghost"
          className={cn(
            "ml-2 rounded-xl text-gray-600 bg-white hover:bg-white shadow-md",
            evaluation !== null && "hidden",
          )}
          onClick={() => {
            if (evaluating || evaluation !== null) {
              return;
            }
            handleEvaluate();
          }}
        >
          <IconWand className="w-4 h-4 mr-1" />
          Improve
        </Button>
      )}
    </div>
  );
}
