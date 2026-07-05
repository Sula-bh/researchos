import {
  BrainCircuit,
  FileText,
  FlaskConical,
  Home,
  MessageSquare,
  NotebookPen,
  Settings,
  ChevronsUpDown,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

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
    label: "Research Companion",
    to: "chat",
    icon: MessageSquare,
  },
];

export default function ProjectSidebar({ project }: ProjectSidebarProps) {
  return (
    <aside className="flex h-screen w-67.5 shrink-0 flex-col border-r border-[#e6e1ff] bg-white shadow-[14px_0_45px_rgba(72,56,178,0.05)]">
      {/* Logo */}

      <Link
        to="/"
        className="flex items-center gap-3 border-b border-[#eeeaff] px-6 py-5 transition-colors hover:bg-[#fbfaff]"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#5b3df2] text-white shadow-[0_12px_24px_rgba(91,61,242,0.22)]">
          <BrainCircuit className="h-6 w-6" />
        </span>

        <span className="text-lg font-bold tracking-tight text-[#111832]">
          ResearchOS
        </span>
      </Link>

      {/* Current Project */}

      <div className="border-b border-[#eeeaff] p-4">
        <button className="flex w-full items-center justify-between gap-3 rounded-[14px] border border-[#e1dcff] bg-[#fbfaff] px-3 py-3 transition-colors hover:bg-[#f4f1ff]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#5b3df2] shadow-sm">
            <BrainCircuit className="h-5 w-5" />
          </span>

          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold text-[#111832]">
              {project?.title ?? "Loading..."}
            </p>

            <p className="text-xs text-[#65708c]">Current project</p>
          </div>

          <ChevronsUpDown className="h-4 w-4 shrink-0 text-[#65708c]" />
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-1.5 p-3">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ""}
            className={({ isActive }) =>
              `
              flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all
              ${
                isActive
                  ? "bg-[#f1efff] text-[#4f35f2]"
                  : "text-[#4b5875] hover:bg-[#f8f6ff] hover:text-[#2415ac]"
              }
              `
            }
          >
            <Icon className="h-4 w-4 shrink-0" />

            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}

      <div className="border-t border-[#eeeaff] p-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#4b5875] transition-colors hover:bg-[#f8f6ff] hover:text-[#2415ac]">
          <Settings className="h-4 w-4" />
          Project Settings
        </button>
      </div>
    </aside>
  );
}
