import { Meteors } from "@/components/ui/meteors";
import { Box } from "lucide-react";
import Image from "next/image";
import React from "react";

function Benefits() {
  return (
    <div className=" min-h-[70vh] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src="/pngegg.png"
          alt="AI Image"
          width={384}
          height={284}
          className="max-w-sm rounded-lg  "
        />
        <div>
          <h1 className="text-5xl font-bold">
            Unlock your team &apos;s full potential with Vieo{" "}
          </h1>
          <p className="py-6">
            Vieo is a powerful task management and whiteboard platform that
            helps teams collaborate, brainstorm, and stay organized. With
            features like automated project creation and AI-powered task lists,
            Vieo streamlines project management and boosts productivity.
          </p>
          <div className="flex flex-col  w-full lg:flex-row">
            <div className="grid flex-grow  card  rounded-box place-items-center">
              <div className=" w-full relative max-w-xs">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r rounded-full blur-3xl" />
                <div className="relative shadow-xl border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                      />
                    </svg>
                  </div>

                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                    Increased Productivity
                  </h1>
                  <Box className="w-16 h-16 mb-2" />

                  <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                    Effortlessly manage tasks, deadlines, and projects to get
                    more done in less time.
                  </p>

                

                  {/* Meaty part - Meteor effect */}
                  <Meteors number={20} />
                </div>
              </div>
            </div>

            <div className="divider lg:divider-horizontal"></div>
            <div className="grid flex-grow  card  rounded-box place-items-center">
              <div className=" w-full relative max-w-xs">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r rounded-full blur-3xl" />
                <div className="relative shadow-xl border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                      />
                    </svg>
                  </div>

                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                    Improved Collaboration
                  </h1>
                  <Box className="w-16 h-16 mb-2" />

                  <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                    Collaborate in real-time, share ideas, and work together
                    seamlessly with your team.
                  </p>

                  

                  {/* Meaty part - Meteor effect */}
                  <Meteors number={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
