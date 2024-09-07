"use client";

import { ElementRef, useRef } from "react";
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


interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  cardId: string;
  setLabels : (labels: ListLabel[] | undefined) => void;
  labels?: ListLabel[];


};

export const FormLabel = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
  cardId,
  setLabels,
  labels
}: FormPopoverProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const cardModel=useCardModal();


  const closeRef = useRef<ElementRef<"button">>(null);
  const boardId = params.boardId as string;

  const { execute, fieldErrors } = useAction(createLabel, {
    onSuccess: (data) => {
      toast.success("label added!");

      closeRef.current?.click();
      queryClient.invalidateQueries({
        queryKey: ["label", cardId],
      });

      setLabels([...(labels ?? []), { ...data, list: [] }]);

    },
    onError: (error) => {
      toast.error(error);
      proModal.onOpen();
    }
  });

  const onSubmit =  async (formData: FormData) => {
    const name = formData.get("title") as string;
    const color = formData.get("image") as string;
    console.log(color)

    await execute({ name, color , cardId,boardId });

  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
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
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormColorPicker
              id="image"
              errors={fieldErrors}
            />
            <FormInput
              id="title"
              label="label title"
              type="text"
              errors={fieldErrors}
            />
          </div>
        <FormSubmit className="w-full">
            add
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
