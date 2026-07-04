export const AIStatus = {
  Pending: "Pending",
  Processing: "Processing",
  Completed: "Completed",
  Failed: "Failed",
} as const;

export type AIStatus = (typeof AIStatus)[keyof typeof AIStatus];
