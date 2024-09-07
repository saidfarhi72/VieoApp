"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { unsplash } from "@/lib/unsplash";
import { defaultImages } from "@/constants/images";

import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormColorPicker = ({ id, errors }: FormPickerProps) => {
  const colors = [
    { id: "blue", color: "bg-blue-800" },
    { id: "red", color: "bg-red-800" },
    { id: "green", color: "bg-green-800" },
    { id: "indigo", color: "bg-indigo-800" },
    { id: "purple", color: "bg-purple-800" },
    { id: "yellow", color: "bg-yellow-800" },
    { id: "orange", color: "bg-orange-800" },
    { id: "teal", color: "bg-teal-800" },
    { id: "pink", color: "bg-pink-800" },
  ];

  const { pending } = useFormStatus();

  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
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

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {colors.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              onChange={() => {}}

              disabled={pending}
              value={`${image.color}`}
            />
            <div className={`h-full w-full ${image.color} rounded-sm`} />{" "}
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};

/*
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormColorPicker = ({ id, errors }: FormPickerProps) => {
  const colors = [
    "bg-blue-800",
    "bg-red-800",
    "bg-green-800",
    "bg-indigo-800",
    "bg-purple-800",
    "bg-yellow-800",
    "bg-orange-800",
    "bg-teal-800",
    "bg-pink-800",
  ];

  const [selectedColorId, setSelectedColorId] = useState<any>(null);

  useEffect(() => {
    console.log(selectedColorId);
  }, [selectedColorId]);

 

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {colors.map((colorClass, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer w-10 h-10 relative aspect-square group hover:opacity-75 transition",
              selectedColorId === index && "ring-2 ring-offset-2 ring-white" // Highlight selected color
            )}
            onClick={() => {
              setSelectedColorId(colorClass);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedColorId === index}
              value={colorClass} // Store the color class name as the value
            />
            <div className={`h-full w-full ${colorClass} rounded-sm`} />{" "}
            {selectedColorId === colorClass && (
              <div className="absolute inset-y-0 h-full w-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
*/
