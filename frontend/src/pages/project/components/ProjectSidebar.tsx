import {
  BrainCircuit,
  Calendar,
  FileText,
  FlaskConical,
  Home,
  MessageSquare,
  NotebookPen,
  Settings,
  ChevronsUpDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import type { Project } from "@/types/project";

type ProjectSidebarProps = {
  project?: Project;
};

const navItems = [
  {
    label: "Overview",
    to: "",
    icon: Home,
  },
  {
    label: "Papers",
    to: "papers",
    icon: FileText,
  },
  {
    label: "Experiments",
    to: "experiments",
    icon: FlaskConical,
  },
  {
    label: "Notes",
    to: "notes",
    icon: NotebookPen,
  },
  {
    label: "Timeline",
    to: "timeline",
    icon: Calendar,
  },
  {
    label: "Knowledge Graph",
    to: "graph",
    icon: BrainCircuit,
  },
  {
    label: "Chat",
    to: "chat",
    icon: MessageSquare,
  },
];

export default function ProjectSidebar({ project }: ProjectSidebarProps) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      {/* Logo */}

      <div className="border-b p-6">
        <h1 className="text-xl font-bold tracking-tight">ResearchOS</h1>
      </div>

      {/* Current Project */}

      <div className="border-b p-4">
        <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted">
          <span className="truncate">{project?.title ?? "Loading..."}</span>

          <span>
            <ChevronsUpDown className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ""}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <Icon className="h-4 w-4" />

            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}

      <div className="border-t p-3">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Settings className="h-4 w-4" />
          Project Settings
        </button>
      </div>
    </aside>
  );
}
