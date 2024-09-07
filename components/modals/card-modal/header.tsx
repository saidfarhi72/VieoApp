"use client";

import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";
import { Layout, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { Skeleton } from "@/components/ui/skeleton";
import { FormInput } from "@/components/form/form-input";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

interface HeaderProps {
  data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: excuteDelete, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Card "${data.title}" updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDeletet = () => {
    const boardId = params.boardId as string;

    excuteDelete({
      id: data.id,
      userId: "", // Ensure selectedMemberId is of type string or undefined
      boardId,
    });
  };

  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === data.title) {
      return;
    }

    execute({
      title,
      boardId,
      id: data.id,
    });
  };
  const { memberships } = useOrganization({
    memberships: {
      infinite: true, // Append new data to the existing list
      keepPreviousData: true, // Persist the cached data until the new data has been fetched
    },
  });

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm flex justify-between items-center text-muted-foreground">
          <p>
            in list <span className="underline">{data.list.title}</span>
          </p>
          {data.userId && (
            <div className="flex indicator  justify-center items-center ">
              <span
                className="indicator-item text-red-700  hover:cursor-pointer badge"
                onClick={onDeletet}
              >
                {" "}
                <X className="w-4" />{" "}
              </span>
              <div className="avatar flex space-x-3 justify-start items-center">
                <div className="w-8 rounded-full">
                  <Image
                    alt="Member Image"
                    width={50}
                    height={50}
                    src={
                      memberships?.data?.find(
                        (member) => member.id === data.userId
                      )?.publicUserData.imageUrl || ""
                    }
                  />
                </div>
                <div className="text-center text-sm text-neutral-600"></div>
                {
                  memberships?.data?.find((member) => member.id === data.userId)
                    ?.publicUserData.firstName
                }{" "}
                {
                  memberships?.data?.find((member) => member.id === data.userId)
                    ?.publicUserData.lastName
                }
              </div>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  );
};
