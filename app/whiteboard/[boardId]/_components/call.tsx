"use client";

import { Poppins } from "next/font/google";

import React, { useState, useEffect } from "react";

import "@livekit/components-styles";
import {
  LiveKitRoom,
  ControlBar,
  RoomAudioRenderer,
} from "@livekit/components-react";

import { useSelf } from "@/liveblocks.config";
import { Audio } from "./audio";
import { Vote } from "lucide-react";

interface InfoProps {
  boardId: string;
  setStartCall: (value: boolean) => void;
  startCall: boolean;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

export const Call = ({ boardId ,setStartCall,startCall}: InfoProps) => {
  const currentUser = useSelf();
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${boardId}&username=${currentUser.info?.name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="absolute bottom-16 mb-4 right-2 bg-white h-0    rounded-md px-1.5  flex justify-center items-center shadow-md">
    

      {startCall && (
        <LiveKitRoom
          video={false}
          audio={true}
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          // Use the default LiveKit theme for nice styles.
          data-lk-theme="default"
        >
          <RoomAudioRenderer />
          <ControlBar
            variation={"verbose"}
            controls={{
              camera: false,
              screenShare: false,
              settings: false,
              chat: false,
              leave: false,
            }}
          />
          <TabSeparator />
          <Audio label="start" className="bg-slate-50" />
          <Vote className="h-6 w-6 text-slate-500" />
        </LiveKitRoom>
      )}
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
