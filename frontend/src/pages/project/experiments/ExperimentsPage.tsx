import { useEffect, useMemo, useState } from "react";
import { FlaskConical, Plus, Search } from "lucide-react";
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
    <main className="mx-auto max-w-6xl space-y-5">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111832]">
            Experiments
          </h1>

          <p className="mt-2 text-sm text-[#65708c]">
            Track your research experiments.
          </p>
        </div>

        <Button
          asChild
          className="h-11 rounded-xl bg-[#5b3df2] px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(91,61,242,0.22)] hover:bg-[#4f35f2]"
        >
          <Link to={`/projects/${projectId}/experiments/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Create Experiment
          </Link>
        </Button>
      </div>

      {/* Search */}

      <div className="rounded-2xl border border-[#e1dcff] bg-white p-4 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#65708c]" />

          <Input
            placeholder="Search experiments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 rounded-xl border-[#e1dcff] bg-[#fbfaff] pl-10 text-sm shadow-none placeholder:text-[#98a0b7] focus-visible:border-[#7459ff] focus-visible:ring-[#7459ff]/20"
          />
        </div>
      </div>

      {/* Content */}

      {filteredExperiments.length === 0 ? (
        experiments.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#cfc8ff] bg-white py-20 shadow-[0_18px_50px_rgba(72,56,178,0.05)]">
            <div className="rounded-[18px] bg-[#e9fbf3] p-4">
              <FlaskConical className="h-10 w-10 text-[#10b981]" />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#111832]">
              No experiments yet
            </h2>

            <p className="mt-2 max-w-md text-center text-[#65708c]">
              Start tracking your research ideas, hypotheses, methodologies and
              results.
            </p>

            <Button
              asChild
              className="mt-8 h-11 rounded-xl bg-[#5b3df2] px-4 text-sm font-semibold text-white hover:bg-[#4f35f2]"
            >
              <Link to={`/projects/${projectId}/experiments/new`}>
                Create Experiment
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#cfc8ff] bg-white py-20 shadow-[0_18px_50px_rgba(72,56,178,0.05)]">
            <Search className="h-10 w-10 text-[#65708c]" />

            <h2 className="mt-6 text-xl font-semibold text-[#111832]">
              No matching experiments
            </h2>

            <p className="mt-2 text-[#65708c]">Try another search term.</p>
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
