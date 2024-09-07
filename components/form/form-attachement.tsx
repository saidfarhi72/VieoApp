"use client";

import React, { ElementRef, useRef } from "react";
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
import { createAttachement } from "@/actions/create-attachement";
import { ListAttachment } from "@/types";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  cardId: string;
  attachment: ListAttachment[];
  setAttachment: (attachment: ListAttachment[]) => void;
}

export const FormAttachement = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
  cardId,
  attachment,
  setAttachment,
}: FormPopoverProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const params = useParams();

  const boardId = params.boardId as string;

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
  };
  const [file, setFile] = React.useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const currentFile = event.target.files[0];
      setFile(currentFile);
    }
  };

  const { execute, fieldErrors } = useAction(createAttachement, {
    onSuccess: (data) => {
      toast.success("label added!");
      setAttachment([...attachment, { ...data, list: [] }]); // Add an empty 'list' property to the data object

      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: file.name }), // Send the filename
    });

    const { url } = await response.json();
    await fetch(url, {
      method: "PUT",
      body: file, // Upload the file directly
    });

    console.log({ url, name: file.name, cardId, boardId });

    execute({ url, name: file.name, cardId, boardId });
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
          attache file
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={handleUpload} className="space-y-4">
          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
             
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 ">
                <div className="text-center">
                  <div className="mt-4 text-sm leading-6 text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                    >
                      <span className="p-3">Upload a file</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        id="file-upload"
                        name="file-upload"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5  text-gray-400">
                    {file?.name ? file.name : "file up to 100MB"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <FormSubmit className="w-full">add</FormSubmit>

        </form>
      </PopoverContent>
    </Popover>
  );
};
