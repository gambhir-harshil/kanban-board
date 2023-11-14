import * as z from "zod";

const boardSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be atleast 2 characters.",
    })
    .max(12, {
      message: "Name can't be more than 12 characters.",
    }),
  description: z
    .string()
    .min(12, {
      message: "Description must be atleast 12 characters.",
    })
    .max(50, {
      message: "Description can't be more than 50 characters.",
    }),
});

export default boardSchema