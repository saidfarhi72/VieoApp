import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateBoardWithAi } from "./schema";

export type InputType = z.infer<typeof CreateBoardWithAi>;
export type ReturnType = ActionState<InputType, Board>;
