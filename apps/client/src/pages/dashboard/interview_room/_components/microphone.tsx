"use client";
import { IconMicrophone } from "@tabler/icons-react";
import { useState } from "react";
import WaveIcon from "./wave-icon";
import { blobToBase64 } from "./blob-to-base64";
import { startRecording, stopRecording, convertToWav } from "./libs-microphone";

const BASE_URL = "";
const Microphone = ({
  onNewText,
  iconSize,
  onStartRecording,
}: {
  onNewText: any;
  iconSize?: number;
  onStartRecording?: () => void;
}) => {
  const onNewRecordedBase64 = async (base64data: string | null) => {
    try {
      const response = await fetch(`${BASE_URL}/api/stt-az`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalToken()}`,
        },
        body: JSON.stringify({
          audio: base64data,
        }),
      }).then((res) => res.json());
      const { text } = response;
      if (!text) {
        onNewText("...");
        return;
      }
      onNewText(text);
    } catch (error) {
      // console.log(error);
    }
  };

  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording(async (blob: Blob) => {
        const wavBlob = await convertToWav(blob, 16000);
        const base64data = (await blobToBase64(wavBlob)) as string;
        onNewRecordedBase64(base64data);
      });
    } else {
      if (onStartRecording) {
        onStartRecording();
      }
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col justify-center items-center p-2 rounded-2xl">
      <button
        onClick={toggleRecording}
        className={
          "text-white bg-gradient-to-br hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-4 py-2.5 text-center me-2 mb-0 min-w-[80px] flex items-center justify-center shadow-md" +
          (!isRecording
            ? " from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800"
            : " from-pink-500 to-orange-400 focus:ring-orange-200 dark:focus:ring-orange-800")
        }
      >
        {isRecording ? (
          <WaveIcon size={iconSize || 20} className="fill-[#fff]" />
        ) : (
          <IconMicrophone size={iconSize || 20} className="text-white" />
        )}
      </button>
    </div>
  );
};

export default Microphone;
