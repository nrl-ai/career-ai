"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

interface ChatScrollAnchorProps {
  trackVisibility?: boolean;
}

export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const [scrolling, setScrolling] = useState(true);
  const [lastTime, setLastTime] = useState(0);
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: "0px 0px 500px 0px",
  });

  if (trackVisibility && !scrolling) {
    setScrolling(true);
  }

  if (scrolling) {
    if (lastTime === 0) {
      setLastTime(Date.now());
    } else if (Date.now() - lastTime > 100) {
      entry?.target.scrollIntoView({
        block: "start",
      });
      if (inView) {
        setScrolling(false);
      }
      setLastTime(Date.now());
    }
  }

  return (
    <>
      <div ref={ref} className="h-px w-full" />
    </>
  );
}
