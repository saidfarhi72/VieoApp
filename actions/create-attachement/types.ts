import { z } from "zod";
import { Attachment, Card,  } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateAttachement } from "./schema";

export type InputType = z.infer<typeof CreateAttachement>;
export type ReturnType = ActionState<InputType, Attachment>;
