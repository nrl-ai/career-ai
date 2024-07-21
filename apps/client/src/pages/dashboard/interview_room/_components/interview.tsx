"use client";
import { useChat, type Message } from "ai/react";
import cn from "classnames";
import { EmptyScreen } from "./empty-screen";
import { ChatScrollAnchor } from "./chat-scroll-anchor";
import { useState, useEffect } from "react";
import { FinishedMessage } from "./finished-message";
import interviewerAvatar from "./interviewer.png";
import EasySpeech from "easy-speech";
import { textToAudio } from "./tts";
import ChatPanel from "./chat-panel";
import ChatList from "./chat-list";

const BASE_URL = "";
export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  lng: string;
}

export function InterviewUI({ initialMessages, className, lng }: ChatProps) {
  const [isFinished, setIsFinished] = useState(false);
  const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState<
    HTMLAudioElement | SpeechSynthesisUtterance | null
  >(null);
  const [waitingForAudio, setWaitingForAudio] = useState(false);

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      api: `${BASE_URL}/api/role_playing/interview/generate`,
      initialMessages,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${getLocalToken()}`,
      },
      onResponse(response) {
        if (response.status === 401) {
          alert(response.statusText);
        }
      },
      async onFinish(message) {
        const content = message?.content || "";
        // Check if the interview is finished
        if (content.includes("MOCK INTERVIEW ENDED")) {
          setIsFinished(true);
        } else {
          try {
            setWaitingForAudio(true);
            const audio = await textToAudio(content, "onyx");
            setWaitingForAudio(false);
            // window.playingAudio = audio;
            setSpeechSynthesisInstance(audio); // Read out the message using the SpeechSynthesis API
            audio.play();
          } catch (error) {
            setWaitingForAudio(false);
            await EasySpeech.speak({
              text: content,
              pitch: 1,
              rate: 1,
              volume: 1,
            });
          }
        }
      },
    });

  useEffect(() => {
    EasySpeech.init({ maxTimeout: 5000, interval: 250 });
  }, []);

  const stopTTS = () => {
    if (speechSynthesisInstance) {
      if (speechSynthesisInstance instanceof HTMLAudioElement) {
        speechSynthesisInstance.pause();
        setSpeechSynthesisInstance(null);
      } else {
        window.speechSynthesis.cancel();
      }
    }
    // if (window.playingAudio) {
    //   window.playingAudio.pause();
    //   window.playingAudio = null;
    // }
  };

  // Stop the TTS when the component is unmounted
  useEffect(() => {
    return () => {
      stopTTS();
    };
  }, []);

  return (
    <div className="flex flex-col flex-grow w-full overflow-auto">
      <div
        className={cn(
          "pt-16 lg:pt-8 flex flex-col flex-grow overflow-auto",
          className,
        )}
      >
        {messages.length ? (
          <>
            <ChatList
              lng={lng}
              messages={messages}
              isLoading={isLoading}
              waitingForAudio={waitingForAudio}
              assistantAvatar={interviewerAvatar}
            />
            <ChatScrollAnchor trackVisibility={isLoading || waitingForAudio} />
          </>
        ) : (
          <EmptyScreen append={append} lng={lng} />
        )}
        {isFinished && <FinishedMessage />}
      </div>
      {!isFinished && (
        <div className="lg:mx-auto sz-10 lg:w-[400px] xl:w-[600px] w-full rounded-xl flex-grow-0 flex">
          <ChatPanel
            lng={lng}
            isLoading={isLoading}
            stop={stop}
            append={append}
            reload={reload}
            messages={messages}
            input={input}
            setInput={setInput}
            onStartRecording={stopTTS}
          />
        </div>
      )}
    </div>
  );
}
