import { NavLink } from "react-router-dom";
import type { Project } from "@/types/project";

type ProjectSidebarProps = {
  project?: Project;
};

export default function ProjectSidebar({ project }: ProjectSidebarProps) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">ResearchOS</h1>
      </div>

      <div className="border-b p-4">
        <button className="w-full text-left">▼ {project?.title}</button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="">Overview</NavLink>

        <NavLink to="papers">Papers</NavLink>

        <NavLink to="experiments">Experiments</NavLink>

        <NavLink to="notes">Notes</NavLink>

        <NavLink to="timeline">Timeline</NavLink>

        <NavLink to="graph">Knowledge Graph</NavLink>

        <NavLink to="chat">Chat</NavLink>
      </nav>

      <div className="border-t p-4">
        <button>Project Settings</button>
      </div>
    </aside>
  );
}
