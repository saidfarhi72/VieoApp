"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithALL } from "@/types";
import { Check, ListChecks } from "lucide-react";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

// Utility function to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

interface CardItemProps {
  data: CardWithALL;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();
  console.log("data", data);
  const { memberships } = useOrganization({
    memberships: {
      infinite: true, // Append new data to the existing list
      keepPreviousData: true, // Persist the cached data until the new data has been fetched
    },
  });

  function calculateCompletion(tasks: any[]) {
    // Count the number of completed tasks
    const completedTasks = tasks.filter((task) => task.completed).length;

    // Calculate the percentage

    return [tasks.length, completedTasks];
  }

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="truncate border-2 border-transparent space-y-3 hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="badge badge-sm italic  badge-outline">
              {data.createdAt && formatDate(data.createdAt.toString())}
            </span>
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
                    memberships?.data?.find(
                      (member) => member.id === data.userId
                    )?.publicUserData.firstName
                  }{" "}
                  {
                    memberships?.data?.find(
                      (member) => member.id === data.userId
                    )?.publicUserData.lastName
                  }
                </div>
              </div>
            )}
          </div>
          <div className=" flex justify-start items-center flex-wrap">
            {data.labels &&
              data.labels.map((label, index) => (
                <span
                  key={index}
                  className={`badge mx-1 my-1 text-xs ${label.color} py-3 badge-accent badge-md`}
                >
                  {label.name}
                </span>
              ))}
          </div>

          <div className=" break-normal whitespace-normal">
            <p className=" break-normal whitespace-normal">{data.title}</p>
          </div>
          {data.checklists && (
            <div className=" overflow-scroll scrollbar-hide pt-2">
              {data.checklists.map((checklist, index) => (
                <span
                  key={index}
                  className="badge mx-1 space-x-1   items-center text-center badge-info badge-sm"
                >
                  <ListChecks size={16} strokeWidth={1.5} />
                  <span>{checklist.title.slice(0, 10)}</span>
                  {calculateCompletion(checklist.items)[0] > 0 &&
                    `(${calculateCompletion(checklist.items)[1]}/${calculateCompletion(checklist.items)[0]})`}
                </span>
              ))}
            </div>
          )}
          {data.endDate && (
            <div>
              <span className="badge badge-sm">
                {formatDate(data.endDate ?? "")}
              </span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};
