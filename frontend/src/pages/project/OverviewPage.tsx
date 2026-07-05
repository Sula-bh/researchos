import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, FlaskConical, NotebookPen } from "lucide-react";
import { toast } from "sonner";

import { getProject } from "@/api/projectApi";
import { getPapers } from "@/api/paperApi";
import { getExperiments } from "@/api/experimentApi";
import { getNotes } from "@/api/noteApi";

import { getErrorMessage } from "@/lib/error";

import type { Project } from "@/types/project";

export default function OverviewPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project>();

  const [paperCount, setPaperCount] = useState(0);
  const [experimentCount, setExperimentCount] = useState(0);
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    if (!projectId) return;

    const id = projectId;

    async function loadData() {
      try {
        const [project, papers, experiments, notes] = await Promise.all([
          getProject(id),
          getPapers(id),
          getExperiments(id),
          getNotes(id),
        ]);

        setProject(project);

        setPaperCount(papers.length);
        setExperimentCount(experiments.length);
        setNoteCount(notes.length);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }

    loadData();
  }, [projectId]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <section className="rounded-3xl bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 p-10 text-white shadow-xl">
        <p className="mb-3 text-sm uppercase tracking-widest text-violet-100">
          {project?.title ?? "Loading..."}
        </p>

        <h1 className="text-4xl font-bold">Welcome back 👋</h1>

        <p className="mt-4 max-w-2xl text-violet-100 leading-8">
          {project?.description || "No description provided."}
        </p>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Uploaded research papers"
          value={paperCount}
          icon={<FileText className="h-6 w-6 text-violet-600" />}
        />

        <StatCard
          title="Recorded experiments"
          value={experimentCount}
          icon={<FlaskConical className="h-6 w-6 text-blue-600" />}
        />

        <StatCard
          title="Personal research notes"
          value={noteCount}
          icon={<NotebookPen className="h-6 w-6 text-emerald-600" />}
        />
      </section>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
        {icon}
      </div>

      <p className="text-sm text-muted-foreground">{title}</p>

      <h2 className="mt-2 text-4xl font-bold">{value}</h2>
    </div>
  );
}
