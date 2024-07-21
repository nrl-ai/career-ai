import { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import cn from "classnames";
import { CodeBlock } from "./codeblock";
import { MemoizedReactMarkdown } from "./markdown";
import { IconUser } from "./icons";
import { useState } from "react";
import { LoadingSpinner } from "./spinner";
import { ChatMessageActions } from "./chat-message-actions";

export interface ChatMessageProps {
  lng: string;
  messageIndex: number;
  messages: Message[];
  assistantAvatar: string;
  userAvatar?: string;
}

export function ChatMessage({
  lng,
  assistantAvatar,
  userAvatar,
  messageIndex,
  messages,
  ...props
}: ChatMessageProps) {
  const message = messages[messageIndex];
  const [translating, setTranslating] = useState<boolean>(false);
  const [translation, setTranslation] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [evaluating, setEvaluating] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "relative mb-4 flex",
        message.role === "user" ? "flex-row-reverse lg:!flex-row" : "flex-row",
      )}
      {...props}
    >
      <div className="flex h-12 w-12 lg:h-16 lg:w-16 shrink-0 select-none items-center justify-center rounded-full border overflow-hidden shadow-lg bg-white m-2 border-gray-500">
        {message.role === "user" ? (
          userAvatar ? (
            <img
              alt="User Avatar"
              src={userAvatar}
              width={128}
              height={128}
              className="w-full h-full"
            />
          ) : (
            <IconUser className="w-6 h-6 text-gray-500" />
          )
        ) : (
          <img
            alt="Friendly Friend"
            src={assistantAvatar}
            width={128}
            height={128}
            className="w-full h-full"
          />
        )}
      </div>
      <div
        className={cn(
          "flex-1 space-y-2 overflow-hidden bg-white bg-opacity-100 px-4 py-2 rounded-xl shadow-md border",
          message.role === "user"
            ? "border-blue-500 bg-gradient-to-br from-green-400 to-blue-400 text-gray-800"
            : "border-gray-200 bg-opacity-85 bg-gray-800 text-white",
        )}
      >
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == "▍") {
                  return <span className="mt-1 cursor-default animate-pulse">▍</span>;
                }

                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        {translation && <hr className="border-gray-500 dark:border-gray-500" />}
        {translating && <LoadingSpinner className="w-6 h-6 text-white" />}
        {translation && (
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 text-gray-200"
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>;
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length) {
                  if (children[0] == "▍") {
                    return <span className="mt-1 cursor-default animate-pulse">▍</span>;
                  }

                  children[0] = (children[0] as string).replace("`▍`", "▍");
                }

                const match = /language-(\w+)/.exec(className || "");

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ""}
                    value={String(children).replace(/\n$/, "")}
                    {...props}
                  />
                );
              },
            }}
          >
            {translation[0]}
          </MemoizedReactMarkdown>
        )}
        {evaluation && <hr className="border-gray-600 dark:border-gray-500" />}
        {evaluating && <LoadingSpinner className="w-6 h-6 text-white" />}
        {evaluation && (
          <MemoizedReactMarkdown
            className={
              "prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 " +
              (message.role === "user" ? "text-gray-700" : "text-white")
            }
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>;
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length) {
                  if (children[0] == "▍") {
                    return <span className="mt-1 cursor-default animate-pulse">▍</span>;
                  }

                  children[0] = (children[0] as string).replace("`▍`", "▍");
                }

                const match = /language-(\w+)/.exec(className || "");

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ""}
                    value={String(children).replace(/\n$/, "")}
                    {...props}
                  />
                );
              },
            }}
          >
            {evaluation}
          </MemoizedReactMarkdown>
        )}
        <ChatMessageActions
          lng={lng}
          messageIndex={messageIndex}
          translation={translation}
          setTranslation={setTranslation}
          translating={translating}
          setTranslating={setTranslating}
          evaluation={evaluation}
          setEvaluation={setEvaluation}
          evaluating={evaluating}
          setEvaluating={setEvaluating}
          messages={messages}
        />
      </div>
    </div>
  );
}
