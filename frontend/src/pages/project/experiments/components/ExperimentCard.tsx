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
      className="cursor-pointer rounded-[14px] border-[#e1dcff] bg-white py-0 shadow-[0_12px_30px_rgba(72,56,178,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#c7bcff] hover:shadow-[0_18px_42px_rgba(72,56,178,0.12)]"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-3 px-5 pt-5 pb-0">
        <div className="min-w-0 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#e9fbf3] text-[#10b981]">
              <FlaskConical className="h-5 w-5" />
            </span>

            <CardTitle className="truncate text-base font-bold text-[#111832]">
              {experiment.title}
            </CardTitle>
          </div>

          <StatusBadge status={experiment.status} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-[10px] text-[#65708c] hover:bg-[#f1efff] hover:text-[#4f35f2]"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            onClick={(e) => e.stopPropagation()}
            className="rounded-[18px] border border-[#ffd7d7] bg-white shadow-[0_24px_80px_rgba(72,56,178,0.16)]"
          >
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(experiment)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-5 px-5 pt-4 pb-5">
        <p className="line-clamp-3 min-h-18 text-sm leading-6 text-[#65708c]">
          {experiment.objective || "No objective yet."}
        </p>

        <div className="flex items-center justify-between gap-3 border-t border-[#eeeaff] pt-4 text-xs text-[#65708c]">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-[#10b981]" />
            Experiment
          </div>

          <span>Updated {formatDateTime(experiment.updated_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
