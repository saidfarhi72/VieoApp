import { z } from "zod";
import { Card, Label } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateLabel } from "./schema";

export type InputType = z.infer<typeof CreateLabel>;
export type ReturnType = ActionState<InputType, Label>;
