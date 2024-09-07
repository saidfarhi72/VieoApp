import { ActivityIcon, Tag, User, X } from "lucide-react";

import { CardWithList, ListLabel } from "@/types";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/form/form-Label";
import { deleteLabel } from "@/actions/delete-label";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCardModal } from "@/hooks/use-card-modal";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

interface DescriptionProps {
  data: CardWithList;
}

export const Member = ({ data }: DescriptionProps) => {
  const { memberships } = useOrganization({
    memberships: {
      infinite: true, // Append new data to the existing list
      keepPreviousData: true, // Persist the cached data until the new data has been fetched
    },
  });
  return (
    <div className="flex items-start gap-x-3 pb-10 w-full">
      <User className="h-5 w-5 mt-0.5 text-neutral-700" />
      affected
      <div className="w-full">
        {data.userId && (
          <div className="flex justify-center items-center ">
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
      </div>
    </div>
  );
};

Member.Skeleton = function ActivitySkeleton() {
  return <div className="flex items-start gap-x-3 w-full"></div>;
};
