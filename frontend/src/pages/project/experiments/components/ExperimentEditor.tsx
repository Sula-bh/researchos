import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Target, FlaskConical, BarChart3, CheckCircle2 } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EXPERIMENT_STATUSES, type ExperimentStatus } from "@/types/experiment";

import { formatDateTime } from "@/lib/date";

import ExperimentSection from "./ExperimentSection";

type ExperimentEditorProps = {
  title: string;

  status: ExperimentStatus;

  objective: string;

  methodology: string;

  results: string;

  conclusion: string;

  loading?: boolean;

  dirty?: boolean;

  updatedAt?: string;

  onTitleChange: (title: string) => void;

  onStatusChange: (status: ExperimentStatus) => void;

  onObjectiveChange: (value: string) => void;

  onMethodologyChange: (value: string) => void;

  onResultsChange: (value: string) => void;

  onConclusionChange: (value: string) => void;

  onSave: () => void;
};

export default function ExperimentEditor({
  title,
  status,
  objective,
  methodology,
  results,
  conclusion,
  loading = false,
  dirty = false,
  updatedAt,
  onTitleChange,
  onStatusChange,
  onObjectiveChange,
  onMethodologyChange,
  onResultsChange,
  onConclusionChange,
  onSave,
}: ExperimentEditorProps) {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 space-y-4">
          <Input
            value={title}
            placeholder="Untitled Experiment"
            onChange={(e) => onTitleChange(e.target.value)}
            className="h-auto border-none bg-transparent px-0 text-4xl font-bold shadow-none focus-visible:ring-0"
          />

          <div className="flex items-center gap-4">
            <Select
              value={status}
              onValueChange={(value) =>
                onStatusChange(value as ExperimentStatus)
              }
            >
              <SelectTrigger
                className="
      h-9 w-40
      rounded-xl
      border-[#e1dcff]
      bg-[#fbfaff]
      px-3
      text-sm
      font-semibold
      text-[#4b5875]
      shadow-sm
      transition-colors
      hover:bg-[#f4f1ff]
      focus:ring-2
      focus:ring-[#7459ff]/20
      focus:ring-offset-0
    "
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent
                className="
      w-40
      rounded-2xl
      border-[#e1dcff]
      bg-white
      p-1.5
      shadow-[0_20px_60px_rgba(72,56,178,0.14)]
    "
              >
                {EXPERIMENT_STATUSES.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className="
          rounded-lg
          px-3
          py-2
          text-sm
          font-medium
          text-[#4b5875]
          outline-none
          transition-colors
          focus:bg-[#f1efff]
          focus:text-[#4f35f2]
        "
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {updatedAt && (
              <p className="text-sm text-muted-foreground">
                Last updated {formatDateTime(updatedAt)}
              </p>
            )}
          </div>
        </div>

        <Button onClick={onSave} disabled={loading}>
          {loading ? "Saving..." : dirty ? "Save" : "Saved"}
        </Button>
      </div>

      {/* Sections */}

      <Accordion type="multiple" className="space-y-5">
        <ExperimentSection
          value="objective"
          title={
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Objective
            </div>
          }
          content={objective}
          onChange={onObjectiveChange}
        />

        <ExperimentSection
          value="methodology"
          title={
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              Methodology
            </div>
          }
          content={methodology}
          onChange={onMethodologyChange}
        />

        <ExperimentSection
          value="results"
          title={
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Results
            </div>
          }
          content={results}
          onChange={onResultsChange}
        />

        <ExperimentSection
          value="conclusion"
          title={
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Conclusion
            </div>
          }
          content={conclusion}
          onChange={onConclusionChange}
        />
      </Accordion>
    </div>
  );
}
