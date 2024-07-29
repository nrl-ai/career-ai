"use client";
import { t } from "@lingui/macro";
import { motion } from "framer-motion";
import { useChat, type Message } from "ai/react";
import cn from "classnames";
import { SetupScreen } from "./setup-screen";
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
import { Button, ScrollArea } from "@career-ai/ui";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsPersonVideo, BsRecord2 } from "react-icons/bs";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  lng: string;
  state: any;
}

export function InterviewUI({ initialMessages, className, lng, state }: ChatProps) {
  const [firstTime, setFirstTime] = useState(true);
  const headRef = useRef<TalkingHead | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState<
    HTMLAudioElement | SpeechSynthesisUtterance | null
  >(null);
  const [waitingForAudio, setWaitingForAudio] = useState(false);
  const [mode, setMode] = useState<"chat" | "whiteboard">("chat");
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const interviewer = state?.interviewer || "andrew";

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

  useEffect(() => {
    if (state?.cv?.id) {
      setSelectedCV(state?.cv?.id);
    }
    append({
      role: "user",
      content: "I am applying for position: " + state.position,
    })
  }, [state]);

  const { messages, append, reload, stop, isLoading, input, setInput } = useChat({
    api: `/api/interview/create-interview-answer`,
    initialMessages,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getLocalToken()}`,
    },
    body: {
      cvId: selectedCV,
      interviewer: interviewer,
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

  const toggleWhiteboard = () => {
    if (mode === "chat") {
      setMode("whiteboard");
    } else {
      setMode("chat");
    }
  };

  return (
    <div className="w-full max-w-[1600px] pt-4">
      {!messages.length ? (
        <SetupScreen append={append} lng={lng} selectedCV={selectedCV} setSelectedCV={setSelectedCV} />
      ) : (
        <>
          <div className="flex items-center justify-between mt-4 mb-4">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold tracking-tight text-gray-800"
            >
              Interview with {interviewer == "andrew" ? "Andrew - CEO" : "Lily - HR Manager"}
            </motion.h1>
          </div>
          <div className="flex flex-col xl:flex-row flex-grow overflow-hidden w-full justify-start rounded-2xl bg-gradient-to-t from-gray-100 to-gray-200">
            {messages.length ? (
              <div className="flex flex-grow flex-col">
                <div className="flex flex-col flex-grow relative w-[600px] lg:w-[800px]">
                  <div
                    className="flex flex-row items-center justify-center rounded-2xl relative"
                    style={{
                      background: "url(/office-background.jpg)",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="absolute top-4 right-6 z-50">
                      <BsRecord2 className="text-4xl text-red-600 text-opacity-90" />
                    </div>
                    <Button
                      variant={"secondary"}
                      onClick={toggleWhiteboard}
                      className="absolute right-4 bottom-4 z-50"
                    >
                      {mode == "chat" ? (
                        <FaChalkboardTeacher className="mr-2" />
                      ) : (
                        <BsPersonVideo className="mr-2" />
                      )}
                      {mode == "chat" ? "Whiteboard" : "Video"}
                    </Button>
                    <div className="absolute bottom-0 left-0 right-0 top-0 rounded-2xl z-40">
{/* To prevent interaction with avatar */}
                    </div>
                    <div
                      className={cn(
                        "rounded-3xl mx-auto h-[300px] w-[300px] md:w-[400px] max-w-full lg:h-[500px] lg:w-[900px]",
                        mode == "whiteboard" ? "hidden" : "",
                      )}
                    >
                      <TalkingHeadComponent actor={interviewer} headRef={headRef as any} />
                    </div>
                    {mode == "whiteboard" && (
                      <div
                        style={{ height: "500px", width: "100%", background: "white" }}
                        className="rounded-xl bg-white overflow-hidden p-4"
                      >
                        <Excalidraw />
                      </div>
                    )}
                  </div>
                  {!isFinished && (
                    <div className="lg:mx-auto sz-10 w-[400px] rounded-xl flex-grow-0 flex mt-2">
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
            ) : (
              <></>
            )}
            <div className="flex flex-col mt-4 xl:mt-0 min-w-[300px] xl:w-[600px] mx-auto">
              <div
                className={cn(
                  "flex flex-col flex-grow overflow-auto rounded-xl mx-4 mb-2 mt-2 px-4 max-h-[600px] bg-white/50 w-full",
                  className,
                )}
              >
                <>
                  <div className="text-xl mb-2 mt-6 font-bold text-gray-600 text-center">
                    Transcription
                  </div>
                  <ScrollArea className="flex-grow">
                    <ChatList
                      lng={lng}
                      messages={messages}
                      isLoading={isLoading}
                      waitingForAudio={waitingForAudio}
                      assistantAvatar={interviewerAvatar}
                    />
                    <ChatScrollAnchor trackVisibility={isLoading || waitingForAudio} />
                  </ScrollArea>
                </>
                {isFinished && <FinishedMessage />}
              </div>
            </div>
            <div className="flex flex-grow"></div>
          </div>
        </>
      )}
    </div>
  );
}
