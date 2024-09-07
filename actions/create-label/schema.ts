import { z } from "zod";

export const CreateLabel = z.object({
  name: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }).min(3, {
    message: "Title is too short",
  }),
  cardId: z.string(),
  color: z.string(),
  boardId: z.string(),
});
