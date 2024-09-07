import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Pricing() {
  return (
    <div
      id="pricing"
      className="min-h-[80vh] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center"
    >
      {/* Radial gradient for the container to give a faded look */}

      <div className="flex flex-wrap justify-center items-center space-y-3 space-x-3">
        <div></div>
        <BackgroundGradient
          animate={true}
          containerClassName={"h-full max-w-md"}
          className="rounded-[22px] max-w-lg  h-full p-4 sm:p-10 bg-white dark:bg-zinc-900"
        >
          <h1>Free</h1>

          <div className="divider"></div>
          <p className="text-base sm:text-4xl mb-10 text-black mt-4  dark:text-neutral-200">
            Free{" "}
          </p>
          <Link href="/sign-up">
            <button className=" pl-4 pr-1 py-3 w-full   text-white flex items-center justify-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
              <span>Get Started</span>
            </button>
          </Link>

          <div className="divider"></div>

          <p className=" flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span>Whiteboards : Up to 3 whiteboards</span>
          </p>
          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span>Boards: Up to 5 boards</span>
          </p>
          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span>Video Conferencing: Basic features</span>
          </p>
          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span>Calendar: Basic integration</span>
          </p>
          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span>
              AI-Prompted Board Creation: Limited to predefined templates
            </span>
          </p>
          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span> Advanced Features in Whiteboard: Not included</span>
          </p>
        </BackgroundGradient>
        <BackgroundGradient
          containerClassName={"h-full  max-w-md"}
          className="rounded-[22px]   h-full max-w-lg p-4 sm:p-10 bg-white dark:bg-zinc-900"
        >
          <h1>Go pro</h1>

          <div className="divider"></div>
          <p className="text-base sm:text-4xl mb-10 text-black mt-4  dark:text-neutral-200">
            $19/mo
          </p>
          <Link href="/sign-up">
            <button className=" pl-4 pr-1 py-3 w-full   text-white flex items-center justify-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
              <span>Get Started</span>
            </button>
          </Link>

          <div className="divider"></div>

          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span>Whiteboards: Unlimited whiteboards</span>
          </p>
          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span>Boards: Unlimited boards</span>
          </p>
          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span>Video Conferencing: Advanced features</span>
          </p>
          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span>Calendar: Advanced integration</span>
          </p>
          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            <span>
              AI-Prompted Board Creation: Full access including custom templates
            </span>
          </p>
          <p className="text-sm flex justify-start items-center   space-x-2 text-neutral-600 dark:text-neutral-400">
            <Check className="flex-shrink-0" size={20} />
            Advanced Features in Whiteboard: Included
          </p>
        </BackgroundGradient>
      </div>
    </div>
  );
}

export default Pricing;
