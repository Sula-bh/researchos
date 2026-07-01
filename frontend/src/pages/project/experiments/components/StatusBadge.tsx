import { Badge } from "@/components/ui/badge";

import type { ExperimentStatus } from "@/types/experiment";

type StatusBadgeProps = {
  status: ExperimentStatus;
};

const statusStyles: Record<ExperimentStatus, string> = {
  Draft:
    "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",

  Running:
    "border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-300",

  Completed:
    "border-green-300 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900 dark:text-green-300",

  Archived:
    "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-700 dark:bg-amber-900 dark:text-amber-300",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={statusStyles[status]}>
      {status}
    </Badge>
  );
}
