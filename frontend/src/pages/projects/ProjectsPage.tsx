import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  FileText,
  FlaskConical,
  FolderOpen,
  NotebookPen,
  Search,
  Sparkles,
} from "lucide-react";

import { getProjects } from "@/api/projectApi";
import { Input } from "@/components/ui/input";
import type { Project } from "@/types/project";

import CreateProjectDialog from "./components/CreateProjectDialog";
import ProjectCard from "./components/ProjectCard";

import EditProjectDialog from "./components/EditProjectDialog";
import DeleteProjectDialog from "./components/DeleteProjectDialog";
import ProjectCardSkeleton from "./components/ProjectCardSkeleton";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  async function loadProjects() {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [projects, search]);

  const stats = [
    {
      label: "Projects",
      value: projects.length,
      icon: FolderOpen,
      color: "text-[#5b3df2]",
      bg: "bg-[#f1efff]",
    },
    {
      label: "Papers",
      value: "-",
      icon: FileText,
      color: "text-[#0ea5e9]",
      bg: "bg-[#eaf7ff]",
    },
    {
      label: "Experiments",
      value: "-",
      icon: FlaskConical,
      color: "text-[#10b981]",
      bg: "bg-[#e9fbf3]",
    },
    {
      label: "Notes",
      value: "-",
      icon: NotebookPen,
      color: "text-[#f59e0b]",
      bg: "bg-[#fff7e8]",
    },
  ];

  return (
    <main className="flex min-h-screen bg-[#fbfaff] text-[#111832]">
      <section className="min-w-0 flex-1 p-5 sm:p-7">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-[#eeeaff] px-6 py-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#5b3df2] text-white shadow-[0_12px_24px_rgba(91,61,242,0.22)]">
                  <BrainCircuit className="h-6 w-6" />
                </span>

                <span className="text-lg font-bold tracking-tight">
                  ResearchOS
                </span>
              </div>

              <h1 className="text-3xl mt-4 font-bold tracking-tight">
                Good morning, Researcher
              </h1>

              <p className="mt-2 text-sm text-[#65708c]">
                Here is what is happening with your research.
              </p>
            </div>

            <CreateProjectDialog
              onCreated={(project) =>
                setProjects((previous) => [project, ...previous])
              }
            />
          </div>

          <div className="rounded-2xl border border-[#e1dcff] bg-white p-5 shadow-[0_18px_50px_rgba(72,56,178,0.07)]">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-bold">Your Projects</h2>
                <p className="mt-1 text-sm text-[#65708c]">
                  Continue working across your research spaces.
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#65708c]" />

                <Input
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 rounded-xl border-[#e1dcff] bg-[#fbfaff] pl-10 text-sm shadow-none placeholder:text-[#98a0b7] focus-visible:border-[#7459ff] focus-visible:ring-[#7459ff]/20"
                />
              </div>
            </div>

            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              projects.length === 0 ? (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#cfc8ff] bg-[#fbfaff] py-20">
                  <div className="rounded-[18px] bg-[#f1efff] p-4">
                    <FolderOpen className="h-10 w-10 text-[#5b3df2]" />
                  </div>

                  <h2 className="mt-6 text-xl font-semibold">
                    No projects yet
                  </h2>

                  <p className="mt-2 max-w-md text-center text-[#65708c]">
                    Create your first research project to begin organizing
                    papers, experiments and notes.
                  </p>

                  <div className="mt-8">
                    <CreateProjectDialog
                      onCreated={(project) =>
                        setProjects((previous) => [project, ...previous])
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#cfc8ff] bg-[#fbfaff] py-20">
                  <Search className="h-10 w-10 text-[#65708c]" />

                  <h2 className="mt-6 text-xl font-semibold">
                    No matching projects
                  </h2>

                  <p className="mt-2 text-[#65708c]">
                    Try another search term.
                  </p>
                </div>
              )
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={setEditingProject}
                    onDelete={setDeletingProject}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, icon: Icon, color, bg }) => (
              <div
                key={label}
                className="rounded-[14px] border border-[#e1dcff] bg-white p-5 shadow-[0_16px_40px_rgba(72,56,178,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#65708c]">
                    {label}
                  </p>

                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <p className="mt-2 text-2xl font-bold">{value}</p>
                <p className="mt-1 text-xs font-semibold text-[#10b981]">
                  Active workspace
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl border border-[#e1dcff] bg-white p-5 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
              <h2 className="font-bold">Recent Activity</h2>

              <div className="mt-4 space-y-3">
                {(projects.length
                  ? projects.slice(0, 3)
                  : filteredProjects
                ).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between rounded-xl bg-[#fbfaff] px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white text-[#5b3df2]">
                        <FolderOpen className="h-4 w-4" />
                      </span>

                      <p className="truncate text-sm font-medium">
                        Updated {project.title}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-[#65708c]">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}

                {projects.length === 0 && (
                  <p className="rounded-xl bg-[#fbfaff] px-4 py-3 text-sm text-[#65708c]">
                    New project activity will appear here.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[#e1dcff] bg-white p-5 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
              <div className="flex items-center gap-2 text-[#5b3df2]">
                <Sparkles className="h-5 w-5" />
                <h2 className="font-bold">AI Research Insight</h2>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#4b5875]">
                Your project workspace is ready for papers, experiments and
                notes. Open a project to continue organizing your research
                memory.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#4f35f2]">
                View Details <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditProjectDialog
        project={editingProject}
        onClose={() => setEditingProject(null)}
        onUpdated={(updatedProject) => {
          setProjects((previous) =>
            previous.map((project) =>
              project.id === updatedProject.id ? updatedProject : project,
            ),
          );
        }}
      />

      <DeleteProjectDialog
        project={deletingProject}
        onClose={() => setDeletingProject(null)}
        onDeleted={(projectId) => {
          setProjects((previous) =>
            previous.filter((project) => project.id !== projectId),
          );
        }}
      />
    </main>
  );
}
