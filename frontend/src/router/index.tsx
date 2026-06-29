import { createBrowserRouter } from "react-router-dom";

import OverviewPage from "@/pages/project/OverviewPage";
import ProjectPage from "@/pages/project/ProjectPage";
import ProjectsPage from "@/pages/projects/ProjectsPage";
import ChatPage from "@/pages/project/ChatPage";
import PapersPage from "@/pages/project/PapersPage";
import NotesPage from "@/pages/project/NotesPage";
import TimelinePage from "@/pages/project/TimelinePage";
import ExperimentsPage from "@/pages/project/ExperimentsPage";
import KnowledgeGraphPage from "@/pages/project/KnowledgeGraphPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsPage />,
  },
  {
    path: "/projects/:projectId",
    element: <ProjectPage />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "papers",
        element: <PapersPage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "notes",
        element: <NotesPage />,
      },
      {
        path: "timeline",
        element: <TimelinePage />,
      },
      {
        path: "experiments",
        element: <ExperimentsPage />,
      },
      {
        path: "graph",
        element: <KnowledgeGraphPage />,
      },
    ],
  },
]);
