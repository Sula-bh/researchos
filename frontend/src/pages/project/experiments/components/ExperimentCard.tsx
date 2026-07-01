import { FlaskConical, MoreVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import type { Experiment } from "@/types/experiment";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import StatusBadge from "./StatusBadge";

import { formatDateTime } from "@/lib/date";

type ExperimentCardProps = {
  experiment: Experiment;

  onDelete: (experiment: Experiment) => void;
};

export default function ExperimentCard({
  experiment,
  onDelete,
}: ExperimentCardProps) {
  const navigate = useNavigate();

  const { projectId } = useParams();

  return (
    <Card
      onClick={() =>
        navigate(`/projects/${projectId}/experiments/${experiment.id}`)
      }
      className="cursor-pointer transition-all hover:border-primary/20 hover:shadow-md"
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-2">
          <CardTitle>{experiment.title}</CardTitle>

          <StatusBadge status={experiment.status} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(experiment)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {experiment.objective || "No objective yet."}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            Experiment
          </div>

          <span>Updated {formatDateTime(experiment.updated_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
