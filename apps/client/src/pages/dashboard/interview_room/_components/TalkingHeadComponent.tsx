import React, { useEffect, useRef, useState } from "react";
import { TalkingHead } from "./talking_head/talkinghead.mjs";

interface TalkingHeadOptions {
  ttsEndpoint: string;
  jwtGet: () => Promise<string>;
  lipsyncModules: string[];
  cameraView: "upper" | "lower" | "mid" | "head";
  cameraRotateEnabled: boolean;
  cameraPanEnable: boolean;
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

const TalkingHeadComponent: React.FC = ({ headRef }: any) => {
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
      };

      headRef.current = new TalkingHead(avatarRef.current, options);

      // Load and show the avatar
      const avatarOptions: AvatarOptions = {
        url: "/avatars/brunette.glb",
        body: "M",
        avatarMood: "happy",
        ttsLang: "en-US",
        ttsVoice: "en-US-Standard-A",
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

      // // Method 2: resetPose (if available)
      // if (typeof headRef.current.resetPose === "function") {
      //   headRef.current.resetPose();
      //   console.log("resetPose method called");
      // }

      // // Method 3: Set a neutral pose (if available)
      // if (typeof headRef.current.setPose === "function") {
      //   headRef.current.setPose("neutral");
      //   console.log("setPose method called with 'neutral'");
      // }

      // // Method 4: Stop any ongoing animations (if available)
      // if (typeof headRef.current.stopAnimation === "function") {
      //   headRef.current.stopAnimation();
      //   console.log("stopAnimation method called");
      // }
    }
  }, [avatarLoaded]);

  console.log("Avatar loaded:", avatarLoaded);

  return (
    <div>
      <div
        ref={avatarRef}
        style={{
          width: "100%",
          height: "600px",
          background: "url(/office-background.jpg)",
          backgroundSize: "cover",
        }}
        className="rounded-3xl mb-2"
      ></div>
    </div>
  );
};

export default TalkingHeadComponent;

// Implement this function to get JWT
async function jwtGet(): Promise<string> {
  return "your_jwt_token";
}
