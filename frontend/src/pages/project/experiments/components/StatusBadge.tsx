import { Badge } from "@/components/ui/badge";

import type { ExperimentStatus } from "@/types/experiment";

type StatusBadgeProps = {
  status: ExperimentStatus;
};

const statusStyles: Record<ExperimentStatus, string> = {
  Draft: "border-[#dcd7ff] bg-[#f1efff] text-[#4f35f2]",

  Running: "border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb]",

  Completed: "border-[#bbf7d0] bg-[#e9fbf3] text-[#059669]",

  Archived: "border-[#fed7aa] bg-[#fff7e8] text-[#d97706]",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`h-6 rounded-full px-2.5 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </Badge>
  );
}
