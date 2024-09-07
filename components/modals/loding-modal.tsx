"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
import { useLoadingModal } from "@/hooks/use-loading-modal";
import { MultiStepLoader } from "../ui/multi-step-loader";

export const LoadingModal = () => {
  const loadingModal = useLoadingModal();
  const loadingStates = [
    {
      text: "analyzing the prompt",
    },
    {
      text: "Creating a plan",
    },
    {
      text: "creating a board",
    },
    {
      text: "adding Lists",
    },
    {
      text: "addind cards",
    },
    {
      text: "finshing up",
    },
  ];
  return (
    <div className="absolute  w-screen h-[100rem]">
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loadingModal.isOpen}
        duration={2000}
      />
    </div>
  );
};
