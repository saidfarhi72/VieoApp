import { z } from "zod";

export const UpdatechecklistItem = z.object({
  completed: z.boolean(),
  boardId: z.string(),
  id: z.string(),
});
