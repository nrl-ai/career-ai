"use client";
import { useChat, type Message } from "ai/react";
import cn from "classnames";
import { EmptyScreen } from "./empty-screen";
import { ChatScrollAnchor } from "./chat-scroll-anchor";
import { useState, useEffect } from "react";
import { FinishedMessage } from "./finished-message";
import interviewerAvatar from "./interviewer.png";
import EasySpeech from "easy-speech";
import ChatPanel from "./chat-panel";
import ChatList from "./chat-list";
import TalkingHeadComponent from "./TalkingHeadComponent";
import { useRef } from "react";
import { TalkingHead } from "./talking_head/talkinghead.mjs";
import { Excalidraw } from "@excalidraw/excalidraw";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  lng: string;
}

export function InterviewUI({ initialMessages, className, lng }: ChatProps) {
  const [firstTime, setFirstTime] = useState(true);
  const headRef = useRef<TalkingHead | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState<
    HTMLAudioElement | SpeechSynthesisUtterance | null
  >(null);
  const [waitingForAudio, setWaitingForAudio] = useState(false);

  const handleSpeak = (text: string) => {
    if (firstTime) {
      setFirstTime(false);
      setTimeout(() => {
        headRef.current?.speakText(text);
        headRef.current?.startSpeaking();
      }, 2000);
    } else {
      headRef.current?.speakText(text);
      headRef.current?.startSpeaking();
    }
  };

  const { messages, append, reload, stop, isLoading, input, setInput } = useChat({
    api: `/api/interview/create-interview-answer`,
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
        // await EasySpeech.speak({
        //   text: content,
        //   pitch: 1,
        //   rate: 1,
        //   volume: 1,
        // });
        // return;

        // Talk with avatar
        handleSpeak(content);
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
    if (window.playingAudio) {
      window.playingAudio.pause();
      window.playingAudio = null;
    }
  };

  // Stop the TTS when the component is unmounted
  useEffect(() => {
    return () => {
      stopTTS();
    };
  }, []);

  return (
    <div className="pt-8 w-full">
      {!messages.length ? <EmptyScreen append={append} lng={lng} /> :
        <div className="flex flex-row flex-grow overflow-hidden w-full">
          {messages.length ? <div>
            <TalkingHeadComponent headRef={headRef as any} />
            <div style={{ height: "500px", background: "white" }} className="rounded-xl bg-white overflow-hidden p-4">
              <Excalidraw />
            </div>
          </div>
            : <></>}
          <div className="flex flex-col w-[400px]">
            <div className={cn("pt-16 lg:pt-8 flex flex-col flex-grow overflow-auto rounded-xl mx-4 mb-2 w-full", className)}>
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
              {isFinished && <FinishedMessage />}
            </div>
            {!isFinished && (
              <div className="lg:mx-auto sz-10 lg:w-[300px] xl:w-[400px] w-full rounded-xl flex-grow-0 flex">
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
        </div>
      }
    </div>
  );

}
