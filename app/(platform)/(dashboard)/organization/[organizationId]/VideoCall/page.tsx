"use client";

import React, { useEffect, useState } from "react";
import "@livekit/components-styles";
import {
  LiveKitRoom,
  VideoConference,
} from "@livekit/components-react";
import { useParams } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";

const VideoCall = () => {
  const [token, setToken] = useState("");
  const params = useParams();
  const { organization } = useOrganization();
  const { isLoaded, isSignedIn, user } = useUser();

  // Log user object to verify its structure
  console.log("User object:", user);

  const userFirstName = user?.fullName;
  const room = params.organizationId as string;

  useEffect(() => {
    const fetchToken = async () => {
      if (isLoaded && isSignedIn && userFirstName) {
        try {
          console.log(`/api/livekit?room=${room}&username=${userFirstName?userFirstName:"invited"}`);
          const resp = await fetch(`/api/livekit?room=${room}&username=${userFirstName?userFirstName:"invited"}`);
          const data = await resp.json();
          setToken(data.token);
        } catch (e) {
          console.error(e);
        }
      }
    };

    fetchToken();
  }, [isLoaded, isSignedIn, userFirstName, room]);

  if (!isLoaded || !isSignedIn || token === "") {
    return <div>Loading...</div>;
  }

  return (
    <LiveKitRoom
      video={false}
      audio={false}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      
      data-lk-theme="default"
      style={{ height: "90dvh", }}
    >
      <VideoConference  />
    </LiveKitRoom>
  );
};

export default VideoCall;
