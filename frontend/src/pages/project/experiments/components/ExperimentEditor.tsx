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
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {EXPERIMENT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
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

      <Accordion
        type="single"
        collapsible
        defaultValue="objective"
        className="w-full"
      >
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
