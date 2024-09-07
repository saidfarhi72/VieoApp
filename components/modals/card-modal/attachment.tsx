import { ActivityIcon, Album, Paperclip, Tag, X } from "lucide-react";

import { CardWithList, ListAttachment, ListLabel } from "@/types";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/form/form-Label";
import { deleteLabel } from "@/actions/delete-label";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCardModal } from "@/hooks/use-card-modal";
import { deleteAttachment } from "@/actions/delete-attachment";
import { deleteObject } from "@/lib/r2";

interface DescriptionProps {
  data: ListAttachment[];
}

export const Attachement = ({ data }: DescriptionProps) => {
  const params = useParams();

  const cardModal = useCardModal();

  const [attachment, setAttachment] = useState<ListAttachment[]>([]);
  const boardId = params.boardId as string;

  const { execute: executeDelete } = useAction(deleteAttachment, {
    onSuccess: (data) => {
      toast.success(`lable "${data.name}" deleted`);
      setAttachment((attache) => attache.filter((attch) => attch.id !== data.id));

    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleDelete =   (id: string,name:string) => {
    executeDelete({ id, boardId });


  };

  useEffect(() => {
    setAttachment(data);
  }, [data]);

  
  const handleDownload = async (filename: string) => {
    const response = await fetch(`/api/download?filename=${filename}`);
    if (!response.ok) {
      console.error("Failed to download file");
      return;
    }
    const blob = await response.blob();
    const fileURL = window.URL.createObjectURL(blob);
    let anchor = document.createElement("a");
    anchor.href = fileURL;
    anchor.download = filename;
    anchor.click();
  };
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Album className="h-5 w-5 mt-0.5 text-neutral-700"  />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Attachment</p>
        <ol className="mt-2 space-y-4">
          {attachment.map((attach) => (
            <li
              key={attach.id}
              className={`text-sm card  flex justify-between items-center flex-row p-2 `}
            >
              <div onClick={()=>handleDownload(attach.name)} className="flex justify-start hover:cursor-pointer items-center">
              <Paperclip className="h-4 w-4 mr-2"  />
                {attach.name}
              </div>
              <X
                onClick={() => {
                  handleDelete(attach.id,attach.name);
                }}
                className="hover:cursor-pointer"
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Attachement.Skeleton = function ActivitySkeleton() {
  return <div className="flex items-start gap-x-3 w-full"></div>;
};
