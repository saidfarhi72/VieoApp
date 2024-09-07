import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

function Feature() {
  return (
    <div className="min-h-[80vh] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 1,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            alt="AI Image"
            src="/video.png"
            width={384}
            height={284}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Collaborate and Brainstorm with Real-Time Updates
            </h1>
            <p className="py-6">
              With vieo &apos;s whiteboard collaboration feature, you can easily
              collaborate with your team in real-time. Share ideas, brainstorm,
              and update tasks all in one place.
            </p>
            <Link href="/sign-up">
              <button className=" pl-4 pr-4 py-3 rounded-full  text-white flex items-center justify-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                <span>Get Started</span>
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Feature;
