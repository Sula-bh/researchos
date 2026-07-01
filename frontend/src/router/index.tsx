import { createBrowserRouter } from "react-router-dom";

import OverviewPage from "@/pages/project/OverviewPage";
import ProjectPage from "@/pages/project/ProjectPage";
import ProjectsPage from "@/pages/projects/ProjectsPage";
import ChatPage from "@/pages/project/ChatPage";
import PapersPage from "@/pages/project/papers/PapersPage";
import NotesPage from "@/pages/project/notes/NotesPage";
import NoteEditorPage from "@/pages/project/notes/NoteEditorPage";
import TimelinePage from "@/pages/project/TimelinePage";
import ExperimentsPage from "@/pages/project/experiments/ExperimentsPage";
import ExperimentEditorPage from "@/pages/project/experiments/ExperimentEditorPage";
import KnowledgeGraphPage from "@/pages/project/KnowledgeGraphPage";
import PaperDetailsPage from "@/pages/project/paper/PaperDetailsPage";

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
        children: [
          {
            index: true,
            element: <PapersPage />,
          },
          {
            path: ":paperId",
            element: <PaperDetailsPage />,
          },
        ],
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
        path: "notes/new",
        element: <NoteEditorPage />,
      },
      {
        path: "notes/:noteId",
        element: <NoteEditorPage />,
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
        path: "experiments/new",
        element: <ExperimentEditorPage />,
      },
      {
        path: "experiments/:experimentId",
        element: <ExperimentEditorPage />,
      },
      {
        path: "graph",
        element: <KnowledgeGraphPage />,
      },
    ],
  },
]);
