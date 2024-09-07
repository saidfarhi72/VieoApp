"use client";

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { fetcher } from "@/lib/fetcher";
import { checkSubscription } from "@/lib/subscription";
import { MAX_FREE_WHITE_BOARDS } from "@/constants/boards";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProModal } from "@/hooks/use-pro-modal";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
};

interface Count {
  count?: number;

}


interface validation {
  valid?: boolean;

}

export const NewBoardButton = ({
  orgId,
  disabled,
}: NewBoardButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const proModal = useProModal();

  const queryClient = useQueryClient();
  const { data: count } = useQuery<Count>({
    queryKey: ["count", orgId],
    queryFn: () => fetcher(`/api/count`),
  });
  const { data: validation } = useQuery<validation>({
    queryKey: ["validation", orgId],
    queryFn: () => fetcher(`/api/subscription`),
  });

  console.log("validation",validation)

console.log(count)

  const isPro = false

  const onClick = () => {
    const availableCount =  MAX_FREE_WHITE_BOARDS - (count?.count ?? 0)

    if(!validation?.valid &&  availableCount<= 0) {
      proModal.onOpen()
      return
    }
    mutate({
      orgId,
      title: "Untitled"
    })
      .then(async (id) => {
        toast.success("Board created");
        await fetcher(`/api/count/incr`);
        queryClient.invalidateQueries({
          queryKey: ["count", orgId],
        })
        router.push(`/whiteboard/${id}`);
      })
      .catch(() => toast.error("Failed to create board"));
  }

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[90/127] w-[200px] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">
        <span className="text-xs">
          {validation?.valid ? "Unlimited" : `${MAX_FREE_WHITE_BOARDS - (count?.count ?? 0)} remaining`}
        </span>
      </p>
    </button>
  );
};
