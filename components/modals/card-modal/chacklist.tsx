import {
  ActivityIcon,
  Check,
  CheckCheck,
  ListTodo,
  Plus,
  Tag,
  X,
} from "lucide-react";

import { CardWithList, ChecklistsWithCheckListItems, ListLabel } from "@/types";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/form/form-Label";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { updateCard } from "@/actions/update-card";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { createCheckListItem } from "@/actions/create-checklistItem";
import { toast } from "sonner";
import { updatechecklistItem } from "@/actions/update-checklistItem";
import { deleteChecklist } from "@/actions/delete-checklist";
import { deleteChecklistItem } from "@/actions/delete-checklistItem";

interface DescriptionProps {
  data: ChecklistsWithCheckListItems[];
  id?: string;
}

export const Checklist = ({ data, id }: DescriptionProps) => {
  // Local state to manage checklist item completion
  const [checklistItemCompletions, setChecklistItemCompletions] = useState<any>(
    {}
  );
  const [checklist, setChecklist] = useState(data);

  useEffect(() => {
    setChecklist(data);
    console.log(
      "datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata",
      data
    );
  }, [data]);

  const queryClient = useQueryClient();
  const params = useParams();

  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute } = useAction(createCheckListItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["checklist", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", id],
      });

      console.log("daaaaaaaaata", data);
      console.log("checklist", checklist);

      setChecklist((prevChecklists) => {
        const updatedChecklists = prevChecklists.map((checklist) => {
          console.log(checklist.id, data.checklistId);
          if (checklist.id === data.checklistId) {
            return {
              ...checklist,
              items: [...checklist.items, data], // New item starts as unchecked
            };
          }
          return checklist; // Unmodified checklist
        });
        return updatedChecklists;
      });

      toast.success(`Renamed to "${data.title}"`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeItem } = useAction(updatechecklistItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["checklist", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      console.log("daaaaaaaaata", data);
      console.log("checklist", checklist);

      setChecklist((prevChecklists) => {
        const updatedChecklists = prevChecklists.map((checklist) => {
          if (checklist.id === data.checklistId) {
            return {
              ...checklist,
              items: checklist.items.map((item) =>
                item.id === data.id ? data : item
              ), // New item starts as unchecked
            };
          }
          return checklist; // Unmodified checklist
        });
        return updatedChecklists;
      });

      toast.success(`chicked to "${data.title}"`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const boardId = params.boardId as string;

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const checklistId = formData.get("checklistId") as string; // Retrieve checklist ID from form data
    console.log(title);

    execute({ title, checklistId, boardId });
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    console.log(checklistId);
  };

  const handleChecklistItemCompletion = (
    checklistItemId: string,
    checklistId: string,
    isChecked: boolean
  ) => {
    executeItem({
      id: checklistItemId,
      completed: isChecked,
      boardId: boardId,
    });
  };

  const { execute: executeDelete } = useAction(deleteChecklist, {
    onSuccess: (data) => {
      toast.success(`checklist "${data.title}" deleted`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeDeleteItem } = useAction(deleteChecklistItem, {
    onSuccess: (data) => {
      toast.success(`checklist item "${data.title}" deleted`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleDelete = (id: string) => {
    executeDelete({ id, boardId });

    setChecklist((prevchecklist) =>
      prevchecklist.filter((check) => check.id !== id)
    );
  };
  const handleDeleteItem = (checklistId: string, itemId: string) => {
    executeDeleteItem({ id: itemId, boardId });
  
    setChecklist((prevChecklists) => {
      return prevChecklists.map((checklist) => {
        if (checklist.id === checklistId) {
          return {
            ...checklist,
            items: checklist.items.filter((item) => item.id !== itemId),
          };
        }
        return checklist;
      });
    });
  };
  

  function calculateCompletionPercentage(tasks: any[]) {
    // Count the number of completed tasks
    const completedTasks = tasks.filter((task) => task.completed).length;

    // Calculate the percentage
    const percentage = (completedTasks / tasks.length) * 100;
    console.log("percentagepercentagepercentage", percentage);
    if (tasks.length === 0) {
      return 100;
    }

    return percentage;
  }

  return (
    <div className="flex items-start gap-x-3 w-full">
      <ListTodo className=" mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Checklist</p>

        {checklist?.map((checklist) => (
          <div key={checklist.id} className="w-full space-y-2   ">
            <div className="flex  gap-x-3 w-full justify-between   items-center">
              <CheckCheck className=" mb-1 text-neutral-700" />
              <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                  {checklist.title}
                </p>
              </div>
              <X
                onClick={() => {
                  handleDelete(checklist.id);
                }}
                className="hover:cursor-pointer"
              />
            </div>
            <progress
              className="progress progress-success w-full"
              value={calculateCompletionPercentage(checklist.items) || 0}
              max="100"
            ></progress>
            <ul className="list-none pl-6 space-y-2">
              {checklist?.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center space-x-2"
                >
                  <div className="flex justify-start items-center space-x-2">
                    <input
                      type="checkbox"
                      id={item.id}
                      className="checkbox checkbox-primary"
                      checked={item.completed} // Combine local state and default completion
                      onChange={() =>
                        handleChecklistItemCompletion(
                          item.id,
                          checklist.id,
                          !item.completed
                        )
                      }
                    />
                    <label
                      className={` label-text ${item.completed ? "line-through" : ""}`}
                      htmlFor={item.id}
                    >
                      {item.title}
                    </label>
                  </div>
                  <X
                onClick={() => {
                  handleDeleteItem(checklist.id,item.id);
                }}
                className="hover:cursor-pointer w-4"
              />

                </li>
              ))}
              <div className="w-full">
                <form
                  className="flex justify-start w-full space-x-1 items-center "
                  action={onSubmit}
                >
                  <input
                    type="hidden"
                    name="checklistId"
                    value={checklist.id}
                    className=""
                  />

                  <Plus />
                  <FormInput
                    ref={inputRef}
                    onBlur={onBlur}
                    id="title"
                    defaultValue=""
                    placeholder="Type here"
                    className="input w-full"
                  />
                </form>
              </div>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

Checklist.Skeleton = function ActivitySkeleton() {
  return <div className="flex items-start gap-x-3 w-full"></div>;
};
