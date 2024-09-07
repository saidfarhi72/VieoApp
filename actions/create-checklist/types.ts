import { z } from "zod";
import { Card, Checklist, Label } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateCheckList } from "./schema";

export type InputType = z.infer<typeof CreateCheckList>;
export type ReturnType = ActionState<InputType, Checklist>;
