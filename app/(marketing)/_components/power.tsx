"use client";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image";
import React from "react";
import { TitleComponent } from "./Home";

export function Power() {
  return (
    <div className="min-h-[80vh] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
   
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Seamless Collaboration{" "}
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              Share ideas, brainstorm, and collaborate with your team in
              real-time. Enhance productivity and foster creativity.
            </p>
          </div>
          <Image
            src="/site1.png"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Streamline Your Project Management
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Automate project creation and easily manage tasks with all the
            necessary details. Collaborate and share ideas seamlessly.{" "}
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Efficient Task Management
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              Create, assign, and track tasks effortlessly. Keep everyone on the
              same page and ensure timely completion of projects.
            </p>
          </div>
          <Image
            src="/site2.png"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
    </div>
  );
}
