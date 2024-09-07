"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, PhoneCall, PhoneOff, Timer, Vote } from "lucide-react";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { Counter } from "@/components/ui/Timer";
import React, { useState, useEffect } from "react";

import { api } from "@/convex/_generated/api";
import { Actions } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";
import { useBroadcastEvent, useEventListener } from "@/liveblocks.config";

interface InfoProps {
  boardId: string;
  startVote: boolean;
  setStartCall: (value: boolean) => void;
  startCall: boolean;
  
  setStartVote: (value: boolean) => void;
  setIstart: (value: boolean) => void;
  isStart: boolean;
  isInputVisible: boolean;
  timing: number;
  setTiming: (value: number) => void;
  setCount: React.Dispatch<React.SetStateAction<number>>
  count: number;

  setIsInputVisible: (value: boolean) => void;

}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

export const Info = ({ boardId, setStartVote,setIstart,isStart,isInputVisible,setIsInputVisible,count,setCount,timing,setTiming,startCall,setStartCall,startVote }: InfoProps) => {
  const { onOpen } = useRenameModal();

  // On client A
  const broadcast = useBroadcastEvent();
  const onStart = () => {
  
  };
  const handleExpire = () => {
    console.log("Timer expired!");
  };
  const handleStart = () => {
    console.log("staratataa")
    setCount(timing * 60); // Convert minutes to seconds before setting count
    setIsInputVisible(false); // Hide input
    broadcast({ type: "clock", data: timing * 60 });
  };

  const handleReset = () => {
    console.log("reseeeeeeeet");

    setIsInputVisible(true);
    setCount(0);
    setTiming(0);
    broadcast({ type: "clock", data: 0 });
  };

  const handleDelete = () => {
    // Implement logic to remove timer from parent component
  };

  useEventListener(({ event, user, connectionId }) => {
    //                       ^^^^ Will be Client A
    if (event.type ===  "clock") {
      console.log("Received emoji", event.data, user, connectionId);
      if (event.data) {
        setIstart(true);
        setCount(event.data);
        setIsInputVisible(false); // Hide input

      } else {
      }
    }
  });

  // On client B
  

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });
console.log('click')
  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image
              src="/logoWithText.png"
              alt="WhiteBoard logo"
              height={80}
              width={80}
            />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant="outline"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} orgId={data.orgId} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
      <TabSeparator />

      <Hint label="start vote" side="bottom" sideOffset={10}>
      <Button
          variant="outline"
          className="text-base font-normal mx-2 px-2"
          onClick={() => setStartVote(!startVote)}
        >
        <Vote  />
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label={`${startCall ? "join the call": "start the call"}`} side="bottom" sideOffset={10}>
      <Button
          variant="outline"
          className="text-base font-normal mx-2 px-2"
          onClick={() => setStartCall(!startCall)}
        >
          {startCall ? <PhoneOff color="#a20616" />: <PhoneCall color="#06a210" />}
        </Button>
      </Hint>
      <TabSeparator />

      <Hint label="start Timer" side="bottom" sideOffset={10}>
        <Button
          variant="outline"
          className="text-base font-normal px-2"
          onClick={() => setIstart(!isStart)}
        >
          <Timer />
        </Button>
      </Hint>
      <TabSeparator />


      {isStart || count ? (
        <Hint label="timer ... " side="bottom" sideOffset={10}>
          <Counter
            timing={timing}
            setTiming={setTiming}
            handleDelete={handleDelete}
            handleReset={handleReset}
            count={count}
            setCount={setCount}
            handleStart={handleStart}
            setIsInputVisible={setIsInputVisible}
            isInputVisible={isInputVisible}
          />
        </Hint>
      ) : (
        ""
      )}
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
