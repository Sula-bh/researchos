import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  FileText,
  FlaskConical,
  NotebookPen,
  Save,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { getProject, updateProject } from "@/api/projectApi";
import { getPapers } from "@/api/paperApi";
import { getExperiments } from "@/api/experimentApi";
import { getNotes } from "@/api/noteApi";

import type { Project } from "@/types/project";

import DeleteProjectDialog from "../projects/components/DeleteProjectDialog";

export default function ProjectSettingsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const id = projectId;

  if (!id) {
    return null;
  }

  const [project, setProject] = useState<Project | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [paperCount, setPaperCount] = useState(0);
  const [experimentCount, setExperimentCount] = useState(0);
  const [noteCount, setNoteCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const id = projectId;

    async function loadProject() {
      try {
        setLoading(true);

        const [projectData, papers, experiments, notes] = await Promise.all([
          getProject(id),
          getPapers(id),
          getExperiments(id),
          getNotes(id),
        ]);

        setProject(projectData);
        setTitle(projectData.title);
        setDescription(projectData.description || "");

        setPaperCount(papers.length);
        setExperimentCount(experiments.length);
        setNoteCount(notes.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  async function handleSave() {
    if (!projectId || !title.trim()) return;

    try {
      setSaving(true);

      const updatedProject = await updateProject(projectId, {
        title: title.trim(),
        description: description.trim(),
      });

      setProject(updatedProject);

      toast.success("Project updated successfully.");

      window.dispatchEvent(
        new CustomEvent("researchos:project-updated", {
          detail: updatedProject,
        }),
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project.");
    } finally {
      setSaving(false);
    }
  }

  function handleDeleted() {
    setDeletingProject(null);
    navigate("/projects");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fbfaff] p-5 sm:p-7">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[#e1dcff] bg-white p-8 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
            <div className="h-6 w-48 animate-pulse rounded bg-[#f1efff]" />
            <div className="mt-4 h-4 w-72 animate-pulse rounded bg-[#f5f3ff]" />
            <div className="mt-8 h-32 animate-pulse rounded-xl bg-[#fbfaff]" />
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[#fbfaff] p-5 sm:p-7">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[#e1dcff] bg-white p-8 text-center shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
            <h1 className="text-xl font-bold">Project not found</h1>

            <p className="mt-2 text-sm text-[#65708c]">
              This project may have been deleted or you may not have access to
              it.
            </p>

            <button
              onClick={() => navigate("/projects")}
              className="mt-6 rounded-xl bg-[#5b3df2] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4f35dc]"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfaff] p-5 text-[#111832] sm:p-7">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={() => navigate(`/projects/${project.id}`)}
            className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-[#65708c] transition-colors hover:bg-[#f1efff] hover:text-[#4f35f2]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Project
          </button>

          <h1 className="text-3xl font-bold tracking-tight">
            Project Settings
          </h1>

          <p className="mt-2 text-sm text-[#65708c]">
            Manage your project details and project data.
          </p>
        </div>

        {/* General */}
        <section className="rounded-2xl border border-[#e1dcff] bg-white p-6 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
          <div>
            <h2 className="text-lg font-bold">General</h2>

            <p className="mt-1 text-sm text-[#65708c]">
              Update the name and description of your research project.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-semibold">Project name</label>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#e1dcff] bg-[#fbfaff] px-3 text-sm outline-none transition-colors focus:border-[#7459ff] focus:ring-2 focus:ring-[#7459ff]/20"
                placeholder="Project name"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Description</label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-[#e1dcff] bg-[#fbfaff] px-3 py-3 text-sm outline-none transition-colors focus:border-[#7459ff] focus:ring-2 focus:ring-[#7459ff]/20"
                placeholder="Describe your research project..."
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving || !title.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-[#5b3df2] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(91,61,242,0.18)] transition-colors hover:bg-[#4f35dc] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-4 w-4" />

                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </section>

        {/* Project Information */}
        <section className="rounded-2xl border border-[#e1dcff] bg-white p-6 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
          <div>
            <h2 className="text-lg font-bold">Project Information</h2>

            <p className="mt-1 text-sm text-[#65708c]">
              A quick overview of the content in this project.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#fbfaff] p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf7ff] text-[#0ea5e9]">
                  <FileText className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-semibold text-[#65708c]">Papers</p>
                  <p className="mt-0.5 text-xl font-bold">{paperCount}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#fbfaff] p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9fbf3] text-[#10b981]">
                  <FlaskConical className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-semibold text-[#65708c]">
                    Experiments
                  </p>
                  <p className="mt-0.5 text-xl font-bold">{experimentCount}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#fbfaff] p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff7e8] text-[#f59e0b]">
                  <NotebookPen className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-semibold text-[#65708c]">Notes</p>
                  <p className="mt-0.5 text-xl font-bold">{noteCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-xl bg-[#fbfaff] px-4 py-3">
              <span className="text-[#65708c]">Created</span>

              <p className="mt-1 font-semibold">
                {new Date(project.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="rounded-xl bg-[#fbfaff] px-4 py-3">
              <span className="text-[#65708c]">Last updated</span>

              <p className="mt-1 font-semibold">
                {new Date(project.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="rounded-2xl border border-red-200 bg-white p-6 shadow-[0_18px_50px_rgba(72,56,178,0.04)]">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <AlertTriangle className="h-5 w-5" />
            </span>

            <div>
              <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>

              <p className="mt-1 text-sm text-[#65708c]">
                Permanently delete this project and its associated research
                data.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 rounded-xl bg-red-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold">Delete this project</p>

              <p className="mt-1 text-xs leading-5 text-[#65708c]">
                This action cannot be undone.
              </p>
            </div>

            <button
              onClick={() => setDeletingProject(project)}
              className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              Delete Project
            </button>
          </div>
        </section>
      </div>

      <DeleteProjectDialog
        project={deletingProject}
        onClose={() => setDeletingProject(null)}
        onDeleted={handleDeleted}
      />
    </main>
  );
}
