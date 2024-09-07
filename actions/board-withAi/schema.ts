import { z } from "zod";

export const CreateBoardWithAi = z.object({
  prompt: z.string(),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
 
});
