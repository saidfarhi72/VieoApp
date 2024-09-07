"use client";

import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/modals/card-modal/aurora-background";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import Image from "next/image";

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Home = () => {
  return (
    <div className="min-h-[80vh] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}

      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="flex items-center justify-center flex-col">
          <div
            className={cn(
              "flex items-center justify-center flex-col",
              headingFont.className
            )}
          >
            <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
              Streamline Your Tasks and Collaborate Effortlessly{" "}
            </h1>
          </div>
          <div
            className={cn(
              "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
              textFont.className
            )}
          >
            Vieo is the ultimate task management and whiteboard platform that
            allows you to easily collaborate and share ideas with your team.
            With our AI-powered project creation, you can automate the process
            and focus on what matters most - getting things done.
          </div>

          <button className=" mt-10 relative">
            <div className="absolute inset-0 bg-gradient-to-r rounded-full from-indigo-500 w-full to-purple-500 " />
            <div className=" px-2 py-2  bg-black rounded-full w-full justify-start items-center text-center flex  relative group transition duration-200 text-white hover:bg-transparent">
              <Link href="/sign-up">Get Started</Link>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
export const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);

export default Home;
