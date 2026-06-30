import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Project title is required.")
    .max(255, "Project title cannot exceed 255 characters."),

  description: z
    .string()
    .trim()
    .max(5000, "Description is too long.")
    .optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
