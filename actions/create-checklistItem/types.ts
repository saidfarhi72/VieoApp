import { z } from "zod";
import { Card, Checklist, ChecklistItem, Label } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateCheckListItem } from "./schema";

export type InputType = z.infer<typeof CreateCheckListItem>;
export type ReturnType = ActionState<InputType, ChecklistItem>;
