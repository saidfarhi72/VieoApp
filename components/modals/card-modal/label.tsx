import { ActivityIcon, Tag, X } from "lucide-react";

import { CardWithList, ListLabel } from "@/types";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/form/form-Label";
import { deleteLabel } from "@/actions/delete-label";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCardModal } from "@/hooks/use-card-modal";

interface DescriptionProps {
  data: ListLabel[];
}

export const Label = ({ data }: DescriptionProps) => {
  const params = useParams();

  const cardModal = useCardModal();

  const [labels, setLabels] = useState<ListLabel[]>(data);
  const boardId = params.boardId as string;

  const { execute: executeDelete } = useAction(deleteLabel, {
    onSuccess: (data) => {
      toast.success(`lable "${data.name}" deleted`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleDelete = (id: string) => {
    executeDelete({ id, boardId });

    setLabels((prevLabels) => prevLabels.filter((label) => label.id !== id));
  };

  useEffect(() => {
    setLabels(data);
  }, [data]);

  return (
    <div className="flex items-start gap-x-3 w-full">
      <Tag className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Label</p>
        <ol className="mt-2 space-y-4">
          {labels.map((label) => (
            <li
              key={label.id}
              className={`text-sm card  flex justify-between items-center flex-row p-2 ${label.color} `}
            >
              <div className="flex justify-start items-center">
                <Tag className="h-4 w-4 mr-2" />
                {label.name}
              </div>
              <X
                onClick={() => {
                  handleDelete(label.id);
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

Label.Skeleton = function ActivitySkeleton() {
  return <div className="flex items-start gap-x-3 w-full"></div>;
};
