import { useEffect, useMemo, useState } from "react";
import { FolderOpen, Search } from "lucide-react";

import { getProjects } from "@/api/projectApi";
import { Input } from "@/components/ui/input";
import type { Project } from "@/types/project";

import CreateProjectDialog from "./components/CreateProjectDialog";
import ProjectCard from "./components/ProjectCard";

import EditProjectDialog from "./components/EditProjectDialog";
import DeleteProjectDialog from "./components/DeleteProjectDialog";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
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

  return (
    <main className="mx-auto max-w-7xl p-8">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ResearchOS</h1>

          <p className="mt-2 text-muted-foreground">
            Manage all your research projects.
          </p>
        </div>

        <CreateProjectDialog
          onCreated={(project) =>
            setProjects((previous) => [project, ...previous])
          }
        />
      </div>

      {/* Search */}

      <div className="relative mt-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content */}

      <div className="mt-8">
        {filteredProjects.length === 0 ? (
          projects.length === 0 ? (
            <div className="flex flex-col items-center rounded-xl border border-dashed py-20">
              <div className="rounded-full bg-primary/10 p-4">
                <FolderOpen className="h-10 w-10 text-primary" />
              </div>

              <h2 className="mt-6 text-xl font-semibold">No projects yet</h2>

              <p className="mt-2 max-w-md text-center text-muted-foreground">
                Create your first research project to begin organizing papers,
                experiments and notes.
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
            <div className="flex flex-col items-center rounded-xl border border-dashed py-20">
              <Search className="h-10 w-10 text-muted-foreground" />

              <h2 className="mt-6 text-xl font-semibold">
                No matching projects
              </h2>

              <p className="mt-2 text-muted-foreground">
                Try another search term.
              </p>
            </div>
          )
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
