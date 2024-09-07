"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { FormTextarea } from "./form-textarea";
import { unsplash } from "@/lib/unsplash";
import { defaultImages } from "@/constants/images";
import { createBoardWithAi } from "@/actions/board-withAi";
import { useLoadingModal } from "@/hooks/use-loading-modal";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [checked, setChecked] = useState(true);
  const loadingModal = useLoadingModal();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
      loadingModal.onClose();

      proModal.onOpen();
    },
  });
  const { execute: executeAI, fieldErrors: fieldErrorsAI } = useAction(
    createBoardWithAi,
    {
      onSuccess: (data) => {
        loadingModal.onClose();

        toast.success("Board created!");
        closeRef.current?.click();
        router.push(`/board/${data.id}`);
      },
      onError: (error) => {
        loadingModal.onClose();

        toast.error(error);
      },
    }
  );
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  function getRandomIntInclusive(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 20,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          console.log(newImages);
          setImages(newImages);
        } else {
          console.error("Failed to get images from Unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const onSubmit = (formData: FormData) => {
    if (checked) {
      const title = formData.get("title") as string;
      const image = formData.get("image") as string;
      execute({ title, image });
      return;
    }

    loadingModal.onOpen();

    const prompt = formData.get("prompte") as string;
    const i = getRandomIntInclusive(0, 8);

    const image = `${images[i].id}|${images[i].urls.thumb}|${images[i].urls.full}|${images[i].links.html}|${images[i].user.name}`;

    executeAI({ prompt, image });
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
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Simple"
            checked={checked}
            onChange={() => setChecked(true)}
            onClick={() => setChecked(true)}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <form action={onSubmit} className="space-y-4">
              <div className="space-y-4">
                <FormPicker id="image" errors={fieldErrors} />
                <FormInput
                  id="title"
                  label="Board title"
                  type="text"
                  errors={fieldErrors}
                />
              </div>
              <FormSubmit className="w-full">Create</FormSubmit>
            </form>{" "}
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="AI ✨ "
            checked={!checked}
            onClick={() => setChecked(false)}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <form action={onSubmit} className="space-y-4">
              <div className="space-y-4">
                <FormTextarea
                  id="prompte"
                  label="prompt 🪄 "
                  errors={fieldErrorsAI}
                  className="w-52 h-52"
                />
              </div>
              <FormSubmit className="w-full">Create</FormSubmit>
            </form>{" "}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
