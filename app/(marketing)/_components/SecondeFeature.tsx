import Image from "next/image";
import React from "react";

function SecondeFeature() {
  return (
    <div className="min-h-[70vh] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          alt="AI Image"
          src="/whiteboard.png"
          width={384}
          height={284}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div className="ml-9">
          <h1 className="text-5xl font-bold">
            Streamline Collaboration with Integrated Calling Feature
          </h1>
          <p className="py-6">
            With vieo &apos;s calling feature, you can seamlessly communicate and
            collaborate with your team, all in one platform. Say goodbye to
            switching between different tools and streamline your workflow.
          </p>
          <div className="flex flex-col  w-full lg:flex-row">
            <div className="grid flex-grow h-32 card  rounded-box place-items-center">
              <h1 className="text-xl font-bold  mb-7">
                Streamline Collaboration with Integrated Calling Feature
              </h1>
              Integrate vieo&apos;s calling feature with your favorite collaboration
              tools for enhanced productivity.
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="grid flex-grow h-32 card  rounded-box place-items-center">
              <h1 className="text-xl font-bold mb-7">
                Streamline Collaboration with Integrated Calling Feature
              </h1>
              Make calls, share ideas, and collaborate seamlessly with vieo&apos;s
              integrated calling feature.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondeFeature;
