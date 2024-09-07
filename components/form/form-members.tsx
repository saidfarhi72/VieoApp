"use client";

import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { createBoard } from "@/actions/create-board";
import { useProModal } from "@/hooks/use-pro-modal";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { FormPicker } from "./form-picker";
import { createLabel } from "@/actions/create-label";
import { useQueryClient } from "@tanstack/react-query";
import { useCardModal } from "@/hooks/use-card-modal";
import { ListLabel } from "@/types";
import { FormColorPicker } from "./form-color-picker";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { updateCard } from "@/actions/update-card";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  cardId: string;
  setLabels: (labels: ListLabel[] | undefined) => void;
  labels?: ListLabel[];
}

export const FormMembers = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
  cardId,
  setLabels,
  labels,
}: FormPopoverProps) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const proModal = useProModal();
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const cardModel = useCardModal();

  const closeRef = useRef<ElementRef<"button">>(null);
  const boardId = params.boardId as string;

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id]
      });
      toast.success(`Card "${data.title}" updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({
        id: cardId,
        userId: selectedMemberId || '', // Ensure selectedMemberId is of type string or undefined
        boardId,
    })
}

  const { memberships } = useOrganization({
    memberships: {
      infinite: true, // Append new data to the existing list
      keepPreviousData: true, // Persist the cached data until the new data has been fetched
    },
  });
  console.log(memberships);
  if (!memberships) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Label
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form
          action={onSubmit}
          className="space-y-4 flex justify-between flex-col"
        >
          <div className=" space-y-4 z-50 max-h-44  overflow-scroll overflow-x-hidden">
            <ul className="flex justify-center w-full items-start flex-col space-y-4">
              {memberships.data?.slice(0, 5).map((membership, index) => {
                const isSelected = selectedMemberId === membership.id;
                return (
                  <li
                    key={index}
                    className={`flex justify-start items-start space-x-3 w-full flex-row cursor-pointer ${
                      isSelected ? "bg-gray-200" : "hover:bg-base-200"
                    }`}
                    onClick={() => setSelectedMemberId(membership.id)}
                  >
                    <div className="avatar flex space-x-6 justify-start items-center">
                      <div className="w-8 rounded-full">
                        <Image
                          alt="Member Image"
                          width={50}
                          height={50}
                          src={membership.publicUserData.imageUrl}
                        />
                      </div>
                    </div>
                    <p>
                      {membership.publicUserData.firstName}{" "}
                      {membership.publicUserData.lastName}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          {selectedMemberId && (
            <div className="text-center text-sm text-neutral-600">
              Selected Member:{" "}
              {
                memberships.data?.find((member) => member.id === selectedMemberId)
                  ?.publicUserData.firstName
              }{" "}
              {
                memberships.data?.find((member) => member.id === selectedMemberId)
                  ?.publicUserData.lastName
              }
            </div>
          )}
          <FormSubmit className="w-full">add</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
