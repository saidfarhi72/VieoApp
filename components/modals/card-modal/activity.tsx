"use client";

import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { ActivityItem } from "@/components/activity-item";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ActivityProps {
  items: AuditLog[];
}

export const Activity = ({ items }: ActivityProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-neutral-700 mb-2">Activity</p>
          <button
            className="  relative"
            onClick={() => setShow(!show)}

          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 w-full to-purple-500 rounded-lg" />
            <div className=" px-2 py-2  bg-black rounded-[6px] w-full justify-start items-center text-center flex  relative group transition duration-200 text-white hover:bg-transparent">
            show
            </div>
          </button>
        
        </div>
        {show && (
          <ol className="mt-2 space-y-4">
            {items.map((item) => (
              <ActivityItem key={item.id} data={item} />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};
