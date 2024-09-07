import { z } from "zod";

export const CreateAttachement = z.object({
  name: z.string(),
  cardId: z.string(),
  url: z.string(),

  boardId: z.string(),
});
