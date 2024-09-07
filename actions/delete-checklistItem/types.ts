import { z } from "zod";
import {  Checklist, ChecklistItem, Label } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteChecklistItem } from "./schema";

export type InputType = z.infer<typeof DeleteChecklistItem>;
export type ReturnType = ActionState<InputType, ChecklistItem>;
