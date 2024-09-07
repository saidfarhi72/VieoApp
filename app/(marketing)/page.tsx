"use client";

import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/modals/card-modal/aurora-background";
import { Navbar } from "./_components/navbar";
import Home from "./_components/Home";
import Feature from "./_components/Feature";
import SecondeFeature from "./_components/SecondeFeature";
import Benefits from "./_components/Benefits";
import { Power } from "./_components/power";
import Pricing from "./_components/pricing";

const MarketingPage = () => {
  return (
    <div className="w-full dark:bg-black bg-white flex-col space-y-10  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <Home />
      <Power />
      <Feature />
      <Benefits />
      <SecondeFeature />
      <Pricing />
    </div>
  );
};

export default MarketingPage;
