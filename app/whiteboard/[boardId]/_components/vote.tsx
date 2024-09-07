"use client";

import { Poppins } from "next/font/google";

import React, { useState, useEffect } from "react";
import { getTrackReferenceId, isLocal } from "@livekit/components-core";

import "@livekit/components-styles";
import {
  useTracks,
  AudioTrack,
  ControlBar,
  useStartAudio,
  useRoomContext,
  useStartVideo,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import {
  useBroadcastEvent,
  useEventListener,
  useSelf,
} from "@/liveblocks.config";
import { set } from "lodash";
import Countdown from "react-countdown";

interface VoteProps {
  question: string;
  choices: string[];
  rest: () => void;
  setTime: React.Dispatch<React.SetStateAction<number>>;

  time: number;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
/** @public */
export interface AllowMediaPlaybackProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

interface PickedChoice {
  [key: string]: string;
}

export const Vote = ({ question, choices, rest, time, setTime }: VoteProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const [pickedChoises, setPickedChoises] = useState<PickedChoice>({});
  const currentUser = useSelf();

  const broadcast = useBroadcastEvent();

  const handleVote = (choice: string) => {
    setSelectedChoice(choice);
    if (currentUser) {
      broadcast({
        type: "choseChoice",
        data: { userId: currentUser.id, choice },
      });
      setPickedChoises({ ...pickedChoises, [String(currentUser.id)]: choice });
    }
    // You can implement the logic to submit the vote here
  };

  useEventListener(({ event, user, connectionId }) => {
    //                       ^^^^ Will be Client A
    if (event.type === "choseChoice") {
      console.log("Received emoji", event.data, user, connectionId);
      if (event.data) {
        setPickedChoises({
          ...pickedChoises,
          [String(event.data.userId)]: event.data.choice,
        });
      } else {
      }
    }
  });

  const countPickedChoices = (choice: string) => {
    return Object.values(pickedChoises).filter(
      (pickedChoice) => pickedChoice === choice
    ).length;
  };

  const calculatePercentage = (count: number, total: number) => {
    return total > 0 ? ((count / total) * 100).toFixed(2) : 0;
  };
  const [count, setCount] = useState<number>(time * 60); // Countdown in seconds (hidden)

  useEffect(() => {
    console.log("pickedChoisess", pickedChoises);
  }, [pickedChoises]);

  const handleCompletion = () => {
    rest;
  };

  console.log(time);

  return (
    <div className="absolute top-24 mb-10 right-2 w-[25rem] min-h-[40vh]  bg-white p-6 flex flex-col  shadow-lg rounded-md px-1.5  ">
      <div className="w-full flex justify-center items-center">
        <Countdown
          date={Date.now() + time * 1000} // Calculate end time based on count in seconds
          onComplete={handleCompletion} // Change prop name from onCompletion to onComplete
          renderer={(props) => (
            <span>
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content ">
                  <span className="countdown font-mono text-5xl">
                    {
                      <span
                        style={
                          { "--value": props.hours } as React.CSSProperties
                        }
                      ></span>
                    }
                  </span>
                  hours
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-5xl">
                    <span
                      style={
                        { "--value": props.minutes } as React.CSSProperties
                      }
                    ></span>
                  </span>
                  min
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-mono text-5xl">
                    <span
                      style={
                        { "--value": props.seconds } as React.CSSProperties
                      }
                    ></span>
                  </span>
                  sec
                </div>
              </div>
            </span>
          )}
        />
      </div>
      <div className="p-4  rounded-md w-full flex-grow flex-col flex h-full ">
        <h3 className="text-lg font-bold mb-4">{question}</h3>
        <div className="w-full h-full flex flex-grow justify-between  flex-col">
          <div className="flex-grow h-full">
            {choices.map((choice, index) => {
              const count = countPickedChoices(choice);
              const percentage = calculatePercentage(
                count,
                Object.keys(pickedChoises).length
              );

              return (
                <button
                  key={index}
                  className={`w-full py-2 mb-2 rounded-md ${
                    selectedChoice === choice
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handleVote(choice)}
                >
                  {choice} ({percentage}%)
                </button>
              );
            })}
          </div>
          <button
            onClick={rest}
            className=" px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
