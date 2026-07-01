import { Badge } from "@/components/ui/badge";
import type { ExperimentStatus } from "@/types/experiment";

type Props = {
  status: ExperimentStatus;
};

const variants: Record<ExperimentStatus, string> = {
  Draft: "bg-muted text-muted-foreground",
  Running: "bg-blue-500/10 text-blue-600",
  Completed: "bg-green-500/10 text-green-600",
  Archived: "bg-amber-500/10 text-amber-600",
};

export default function StatusBadge({ status }: Props) {
  return (
    <Badge className={variants[status]} variant="outline">
      {status}
    </Badge>
  );
}
