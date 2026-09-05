import { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  BrainCircuit,
  FileText,
  FlaskConical,
  Home,
  FolderOpen,
  MessageSquare,
  NotebookPen,
  Settings,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import type { Project } from "@/types/project";

import { getProjects } from "@/api/projectApi";

import { UserButton, useUser } from "@clerk/react";

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
  const { user } = useUser();
  const navigate = useNavigate();
  const projectId = project?.id;

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects", error);
      }
    };

    loadProjects();
  }, []);

  const handleProjectSwitch = (newProjectId: string) => {
    navigate(`/projects/${newProjectId}`);
  };

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

      <Popover>
        <PopoverTrigger className="w-full border-b border-[#eeeaff] p-4">
          <span className="flex w-full items-center justify-between gap-3 rounded-[14px] border border-[#e1dcff] bg-[#fbfaff] px-3 py-3 transition-colors hover:bg-[#f4f1ff]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#5b3df2] shadow-sm">
              <FolderOpen className="h-5 w-5" />
            </span>

            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-sm font-semibold text-[#111832]">
                {project?.title ?? "Loading..."}
              </span>

              <span className="block text-xs text-[#65708c]">
                Current project
              </span>
            </span>

            <ChevronsUpDown className="h-4 w-4 shrink-0 text-[#65708c]" />
          </span>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-64 rounded-[18px] border border-[#e6e1ff] bg-white p-2 shadow-[0_24px_80px_rgba(72,56,178,0.16)]"
        >
          <div className="mb-2 px-2 py-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#8a91a8]">
              Switch project
            </p>
          </div>

          <div className="space-y-1">
            {projects.map((item) => (
              <button
                key={item.id}
                onClick={() => handleProjectSwitch(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${
                  item.id === projectId
                    ? "bg-[#f1efff] text-[#4f35f2]"
                    : "text-[#4b5875] hover:bg-[#f8f6ff]"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{item.title}</p>

                  {item.description && (
                    <p className="mt-0.5 truncate text-xs text-[#8a91a8]">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.id === projectId && (
                  <Check className="ml-2 h-4 w-4 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

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
      <div className="border-t border-[#eeeaff] p-3 space-y-2">
        <div className="flex items-center gap-3 rounded-2xl bg-[#f5f2ff] px-3 py-3 transition-colors hover:bg-[#eeeaff]">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-9 w-9",
              },
            }}
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {user?.fullName || user?.firstName || "User"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress || ""}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/projects/${projectId}/settings`)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#4b5875] transition-colors hover:bg-[#f8f6ff] hover:text-[#2415ac]"
        >
          <Settings className="h-4 w-4" />
          <span>Project Settings</span>
        </button>
      </div>
    </aside>
  );
}
