"use client";

import { Room } from "@/components/room";

import { Canvas } from "./_components/canvas";
import { Loading } from "./_components/loading";
import "@livekit/components-styles";
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  ControlBar,
  RoomAudioRenderer,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  const name = "quickstart-user";
  const [token, setToken] = useState("");
  const [timing, setTiming] = useState<number>(0); // Entered time in minutes
  const [count, setCount] = useState<number>(0); // Countdown in seconds (hidden)

  console.log("hihihihihihih");

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${params.boardId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas
        boardId={params.boardId}
        timing={timing}
        count={count}
        setCount={setCount}
        setTiming={setTiming}
      />
    </Room>
  );
};

export default BoardIdPage;
