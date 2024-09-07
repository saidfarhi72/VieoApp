"use client";

import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Calendar from "react-calendar";

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
import { updateCard } from "@/actions/update-card";
import { useQueryClient } from "@tanstack/react-query";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  cardId: string;
  data: CardWithList;
}

export const FormDate = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
  cardId,
  data,
}: FormPopoverProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [value, onChange] = useState<Value>(
    data.endDate ? new Date(data.endDate) : null
  );
  console.log(data.endDate, "data.endDate")

  const queryClient = useQueryClient();
  const params = useParams();
  const cardModel = useCardModal();

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`date is added to card "${data.title}" `);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const translateDate = (inputDate: any) => {
    const dateObj = new Date(inputDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = (formData: FormData) => {
    const boardId = params.boardId as string;
    const dateTimeString = new Date(
      `${translateDate(value)}T${time}`
    ).toISOString();

    execute({
      id: cardId,
      endDate: dateTimeString,
      boardId,
    });
  };

  const [houre, setHoure] = useState(0);
  const [minute, setMinute] = useState(0);
  const parsedDate = data.endDate ? new Date(data.endDate) : null;

  const [time, setTime] = useState(parsedDate ? parsedDate.toISOString().split('T')[1].substring(0, 5) : '');

  const handlechangeDate = (e: any) => {
    console.log(e.target.value);
  };

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
          Create end Date
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
          <Calendar onChange={onChange} value={value} />
          <p>Due date : </p>
          <div className="flex justify-center items-center space-x-2">
            <input
              type="time"
              placeholder="m"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="input input-bordered w-40"
            />
          </div>
          <FormSubmit className="w-full">add</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
