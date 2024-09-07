"use client";

import { toast } from "sonner";
import {
  Check,
  Clock,
  Copy,
  Dessert,
  Paperclip,
  Tag,
  Trash,
  User,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";

import {
  CardWithList,
  ChecklistsWithCheckListItems,
  ListAttachment,
  ListLabel,
} from "@/types";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { Button } from "@/components/ui/button";
import { deleteCard } from "@/actions/delete-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { FormLabel } from "@/components/form/form-Label";
import { FormCheckList } from "@/components/form/form-checkList";
import { FormDate } from "@/components/form/form-date";
import { FormAttachement } from "@/components/form/form-attachement";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { Attachment } from "@prisma/client";
import { FormMembers } from "@/components/form/form-members";

interface ActionsProps {
  data: CardWithList;
  labels?: ListLabel[];
  setLabels: (labels: ListLabel[] | undefined) => void;
  setChecklist: (checklist: ChecklistsWithCheckListItems[] | undefined) => void;
  checklist?: ChecklistsWithCheckListItems[];
  setAttachment: (attachment: ListAttachment[]) => void;
  attachment?: ListAttachment[];
}

export const Actions = ({
  data,
  setLabels,
  setChecklist,
  checklist,
  labels,
  setAttachment,
  attachment,
}: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 w-fit mr-5 mt-2">
      <p className="text-xs font-semibold">Add to card</p>
      <FormMembers
        align="start"
        side="bottom"
        sideOffset={18}
        setLabels={setLabels}
        labels={labels}
        cardId={data.id}
      >
        <button className=" w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 w-full to-purple-500 rounded-lg" />
          <div className=" px-2 py-2  bg-black rounded-[6px] w-full justify-start items-center text-center flex  relative group transition duration-200 text-white hover:bg-transparent">
            <Users className="h-4 w-4 mr-2" />

            Members
          </div>
        </button>
      </FormMembers>

      <FormLabel
        align="start"
        side="bottom"
        sideOffset={18}
        setLabels={setLabels}
        labels={labels}
        cardId={data.id}
      >
        <button className=" w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 w-full to-purple-500 rounded-lg" />
          <div className=" px-2 py-2  bg-black rounded-[6px] w-full justify-start items-center text-center flex  relative group transition duration-200 text-white hover:bg-transparent">
            <Tag className="h-4 w-4 mr-2" />
            Labels
          </div>
        </button>
      </FormLabel>

      <FormCheckList
        cardId={data.id}
        checklist={checklist}
        setChecklist={setChecklist}
        align="start"
        side="bottom"
        sideOffset={18}
      >
        <button className=" w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 w-full to-purple-500 rounded-lg" />
          <div className=" px-2 py-2  bg-black rounded-[6px] w-full justify-start items-center text-center flex  relative group transition duration-200 text-white hover:bg-transparent">
            <Check className="h-4 w-4 mr-2" />
            Checklist
          </div>
        </button>
      </FormCheckList>

      <FormDate
        align="start"
        side="bottom"
        sideOffset={18}
        data={data}
        cardId={data.id}
      >
        <button className=" w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 w-full to-purple-500 rounded-lg" />
          <div className=" px-2 py-2  bg-black rounded-[6px] w-full justify-start items-center text-center flex  relative group transition duration-200 text-white hover:bg-transparent">
            <Clock className="h-4 w-4 mr-2" />
            Dates
          </div>
        </button>
      </FormDate>

      <FormAttachement
        setAttachment={setAttachment}
        attachment={attachment ?? []}
        align="start"
        side="bottom"
        sideOffset={18}
        cardId={data.id}
      >
        <button className=" w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 w-full to-purple-500 rounded-lg" />
          <div className=" px-2 py-2  bg-black rounded-[6px] w-full justify-start items-center text-center flex  relative group transition duration-200 text-white hover:bg-transparent">
            <Dessert className="h-4 w-5 mr-2" />
            Attachement
          </div>
        </button>
      </FormAttachement>

      <p className="text-xs font-semibold">Actions</p>

      <button
        className=" w-full relative"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 w-full to-purple-500 rounded-lg" />
        <div className=" px-2 py-2  bg-black rounded-[6px] w-full justify-start items-center text-center flex  relative group transition duration-200 text-white hover:bg-transparent">
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </div>
      </button>
      <button
        className=" w-full relative"
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 w-full to-purple-500 rounded-lg" />
        <div className=" px-2 py-2  bg-black rounded-[6px] w-full justify-start items-center text-center flex  relative group transition duration-200 text-white hover:bg-transparent">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </div>
      </button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
