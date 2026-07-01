import { useEffect, useMemo, useState } from "react";
import { FlaskConical, Search } from "lucide-react";
import { useParams } from "react-router-dom";

import { getExperiments } from "@/api/experimentApi";

import type { Experiment } from "@/types/experiment";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ExperimentCard from "./components/ExperimentCard";

export default function ExperimentsPage() {
  const { projectId } = useParams();

  const [experiments, setExperiments] = useState<Experiment[]>([]);

  const [search, setSearch] = useState("");

  async function loadExperiments() {
    if (!projectId) return;

    const data = await getExperiments(projectId);

    setExperiments(data);
  }

  useEffect(() => {
    void loadExperiments();
  }, [projectId]);

  const filteredExperiments = useMemo(() => {
    return experiments.filter((experiment) =>
      experiment.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [experiments, search]);

  return (
    <main className="mx-auto max-w-7xl p-8">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experiments</h1>

          <p className="mt-2 text-muted-foreground">
            Track your research experiments.
          </p>
        </div>

        <Button>Create Experiment</Button>
      </div>

      {/* Search */}

      <div className="relative mt-8">
        <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search experiments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content */}

      <div className="mt-8">
        {filteredExperiments.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed py-20">
            <div className="rounded-full bg-primary/10 p-4">
              <FlaskConical className="h-10 w-10 text-primary" />
            </div>

            <h2 className="mt-6 text-xl font-semibold">No experiments yet</h2>

            <p className="mt-2 text-center text-muted-foreground">
              Start tracking your research ideas, hypotheses and results.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredExperiments.map((experiment) => (
              <ExperimentCard
                key={experiment.id}
                experiment={experiment}
                onDelete={(experiment) => console.log(experiment)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
