"use client";

import { Poppins } from "next/font/google";

import React, { useState, useEffect } from 'react';
import { getTrackReferenceId, isLocal } from '@livekit/components-core';


import '@livekit/components-styles';
import {

  useTracks,
  AudioTrack,
  ControlBar,
  useStartAudio,
  useRoomContext,
  useStartVideo,
} from '@livekit/components-react';
import { Track } from 'livekit-client';



interface InfoProps {
  boardId: string;
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
/** @public */
export interface AllowMediaPlaybackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;

}

export const Audio = ({ label, ...props }: AllowMediaPlaybackProps) => {



  const room = useRoomContext();
  const { mergedProps: audioProps, canPlayAudio } = useStartAudio({ room, props: {} });
  const { mergedProps, canPlayVideo } = useStartVideo({ room, props: audioProps });
  const { style, ...restProps } = mergedProps;
  style.display = canPlayAudio && canPlayVideo ? 'none' : 'block';



  return (
      
      
      
      
     
  <button style={style} {...restProps}>
    {label ?? `Start ${!canPlayAudio ? 'Audio' : 'Video'}`}
  </button>

  );
};

export const InfoSkeleton = () => {
  return (
    <div 
      className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"
    />
  );
};
