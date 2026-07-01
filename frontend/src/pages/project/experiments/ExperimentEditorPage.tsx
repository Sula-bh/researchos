import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  createExperiment,
  getExperiment,
  updateExperiment,
} from "@/api/experimentApi";

import { type Experiment, type ExperimentStatus } from "@/types/experiment";

import { getErrorMessage } from "@/lib/error";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { useHotkey } from "@/hooks/useHotkey";

import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";

import ExperimentEditor from "./components/ExperimentEditor";

export default function ExperimentEditorPage() {
  const { projectId, experimentId } = useParams();

  const navigate = useNavigate();

  const [experiment, setExperiment] = useState<Experiment | null>(null);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");

  const [status, setStatus] = useState<ExperimentStatus>("Draft");

  const [objective, setObjective] = useState("");

  const [methodology, setMethodology] = useState("");

  const [results, setResults] = useState("");

  const [conclusion, setConclusion] = useState("");

  const [savedExperiment, setSavedExperiment] = useState({
    title: "",
    status: "Draft" as ExperimentStatus,
    objective: "",
    methodology: "",
    results: "",
    conclusion: "",
  });

  const isDirty =
    title !== savedExperiment.title ||
    status !== savedExperiment.status ||
    objective !== savedExperiment.objective ||
    methodology !== savedExperiment.methodology ||
    results !== savedExperiment.results ||
    conclusion !== savedExperiment.conclusion;

  const { open, cancel, discard, allowNextNavigation } =
    useUnsavedChanges(isDirty);

  useEffect(() => {
    if (!experimentId) return;
    const id = experimentId;

    async function loadExperiment() {
      try {
        setLoading(true);

        const data = await getExperiment(id);

        setExperiment(data);

        setTitle(data.title);
        setStatus(data.status);

        setObjective(data.objective);
        setMethodology(data.methodology);
        setResults(data.results);
        setConclusion(data.conclusion);

        setSavedExperiment({
          title: data.title,
          status: data.status,
          objective: data.objective,
          methodology: data.methodology,
          results: data.results,
          conclusion: data.conclusion,
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

    loadExperiment();
  }, [experimentId]);

  async function handleSave(): Promise<boolean> {
    if (saving) return false;

    if (!projectId) return false;

    if (!title.trim()) {
      toast.error("Please enter a title.");
      return false;
    }

    try {
      setSaving(true);

      if (experimentId) {
        const updated = await updateExperiment(experimentId, {
          title,
          status,
          objective,
          methodology,
          results,
          conclusion,
        });

        setExperiment(updated);

        setSavedExperiment({
          title: updated.title,
          status: updated.status,
          objective: updated.objective,
          methodology: updated.methodology,
          results: updated.results,
          conclusion: updated.conclusion,
        });

        toast.success("Experiment updated.");

        return true;
      }

      const created = await createExperiment(projectId, {
        title,
      });

      allowNextNavigation();

      navigate(`/projects/${projectId}/experiments/${created.id}`, {
        replace: true,
      });

      toast.success("Experiment created.");

      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));

      return false;
    } finally {
      setSaving(false);
    }
  }

  useHotkey("mod+s", () => {
    if (isDirty && !saving) {
      void handleSave();
    }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />

        <Skeleton className="h-12 w-80" />

        <Skeleton className="h-175 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild>
        <Link to={`/projects/${projectId}/experiments`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Experiments
        </Link>
      </Button>

      <ExperimentEditor
        title={title}
        status={status}
        objective={objective}
        methodology={methodology}
        results={results}
        conclusion={conclusion}
        loading={saving}
        dirty={isDirty}
        updatedAt={experiment?.updated_at}
        onTitleChange={setTitle}
        onStatusChange={setStatus}
        onObjectiveChange={setObjective}
        onMethodologyChange={setMethodology}
        onResultsChange={setResults}
        onConclusionChange={setConclusion}
        onSave={() => {
          void handleSave();
        }}
      />

      <UnsavedChangesDialog
        open={open}
        onCancel={cancel}
        onDiscard={discard}
        onSave={async () => {
          const success = await handleSave();

          if (success) {
            allowNextNavigation();
            discard();
          }
        }}
      />
    </div>
  );
}
