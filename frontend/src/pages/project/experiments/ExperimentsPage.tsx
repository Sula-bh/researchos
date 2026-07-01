import { useEffect, useMemo, useState } from "react";
import { FlaskConical, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import { deleteExperiment, getExperiments } from "@/api/experimentApi";

import type { Experiment } from "@/types/experiment";

import { getErrorMessage } from "@/lib/error";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ExperimentCard from "./components/ExperimentCard";
import DeleteExperimentDialog from "./components/DeleteExperimentDialog";

export default function ExperimentsPage() {
  const { projectId } = useParams();

  const [experiments, setExperiments] = useState<Experiment[]>([]);

  const [search, setSearch] = useState("");

  const [deletingExperiment, setDeletingExperiment] =
    useState<Experiment | null>(null);

  async function loadExperiments() {
    if (!projectId) return;

    try {
      const data = await getExperiments(projectId);

      setExperiments(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  useEffect(() => {
    void loadExperiments();
  }, [projectId]);

  async function handleDelete() {
    if (!deletingExperiment) return;

    try {
      await deleteExperiment(deletingExperiment.id);

      setExperiments((current) =>
        current.filter((experiment) => experiment.id !== deletingExperiment.id),
      );

      toast.success("Experiment deleted.");

      setDeletingExperiment(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  const filteredExperiments = useMemo(() => {
    const query = search.toLowerCase();

    return experiments.filter((experiment) => {
      return (
        experiment.title.toLowerCase().includes(query) ||
        experiment.objective.toLowerCase().includes(query)
      );
    });
  }, [experiments, search]);

  return (
    <main className="space-y-6">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experiments</h1>

          <p className="mt-2 text-muted-foreground">
            Track your research experiments.
          </p>
        </div>

        <Button asChild>
          <Link to={`/projects/${projectId}/experiments/new`}>
            Create Experiment
          </Link>
        </Button>
      </div>

      {/* Search */}

      <div className="relative">
        <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search experiments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content */}

      {filteredExperiments.length === 0 ? (
        experiments.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed py-20">
            <div className="rounded-full bg-primary/10 p-4">
              <FlaskConical className="h-10 w-10 text-primary" />
            </div>

            <h2 className="mt-6 text-xl font-semibold">No experiments yet</h2>

            <p className="mt-2 max-w-md text-center text-muted-foreground">
              Start tracking your research ideas, hypotheses, methodologies and
              results.
            </p>

            <Button asChild className="mt-8">
              <Link to={`/projects/${projectId}/experiments/new`}>
                Create Experiment
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-xl border border-dashed py-20">
            <Search className="h-10 w-10 text-muted-foreground" />

            <h2 className="mt-6 text-xl font-semibold">
              No matching experiments
            </h2>

            <p className="mt-2 text-muted-foreground">
              Try another search term.
            </p>
          </div>
        )
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredExperiments.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              onDelete={setDeletingExperiment}
            />
          ))}
        </div>
      )}

      <DeleteExperimentDialog
        experiment={deletingExperiment}
        onClose={() => setDeletingExperiment(null)}
        onDelete={handleDelete}
      />
    </main>
  );
}
