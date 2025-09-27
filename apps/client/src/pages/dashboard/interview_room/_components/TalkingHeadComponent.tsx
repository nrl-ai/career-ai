import React, { useEffect, useRef, useState } from "react";
import { TalkingHead } from "./talking_head/talkinghead.mjs";

interface TalkingHeadOptions {
  ttsEndpoint: string;
  jwtGet: () => Promise<string>;
  lipsyncModules: string[];
  cameraView: "upper" | "lower" | "mid" | "head";
  cameraRotateEnabled: boolean;
  cameraPanEnable: boolean;
  cameraZoomEnable?: boolean;
}

interface AvatarOptions {
  url: string;
  body: "F" | "M";
  avatarMood: string;
  ttsLang: string;
  ttsVoice: string;
  lipsyncLang: string;
  cameraX: number;
  cameraY: number;
}

const TalkingHeadComponent = ({ actor = "andrew", headRef = useRef<TalkingHead | null>(null) }) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  useEffect(() => {
    if (avatarRef.current && !headRef.current) {
      const options: TalkingHeadOptions = {
        ttsEndpoint: "/api/voice/text-to-speech/",
        jwtGet: jwtGet, // Implement this function to get JWT
        lipsyncModules: ["en"],
        cameraView: "upper",
        cameraRotateEnabled: false,
        cameraPanEnable: false,
        cameraZoomEnable: false,
      };

      headRef.current = new TalkingHead(avatarRef.current, options);

      // Load and show the avatar
      const avatarOptions: AvatarOptions = {
        url: `/avatars/${actor}.glb`,
        body: "M",
        avatarMood: "happy",
        ttsLang: "en-US",
        ttsVoice: actor == "andrew" ? "en-US-Standard-A" : "en-US-Standard-C",
        lipsyncLang: "en",
        cameraX: 1,
        cameraY: 1,
      };

      // headRef.current.stopPose();
      headRef.current
        .showAvatar(avatarOptions)
        .then(() => {
          setAvatarLoaded(true);
        })
        .catch(console.error);
    }

    // Cleanup function
    return () => {
      if (headRef.current) {
        headRef.current.stop();
        headRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (avatarLoaded && headRef.current) {
      // Try different methods to stop posing
      console.log("Attempting to stop posing");

      // Method 1: stopPose
      if (typeof headRef.current.stopPose === "function") {
        headRef.current.stopPose();
        console.log("stopPose method called");
      }
    }
  }, [avatarLoaded]);

  return (
    <div>
      <div
        ref={avatarRef}
        className="rounded-3xl mx-auto h-[400px] w-[500px] lg:h-[500px] lg:w-[800px]"
      ></div>
    </div>
  );
};

export default TalkingHeadComponent;

// Implement this function to get JWT
async function jwtGet(): Promise<string> {
  return "your_jwt_token";
}
