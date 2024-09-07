import { z } from "zod";
import { Board, ChecklistItem } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdatechecklistItem } from "./schema";

export type InputType = z.infer<typeof UpdatechecklistItem>;
export type ReturnType = ActionState<InputType, ChecklistItem>;
