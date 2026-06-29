import { createBrowserRouter } from "react-router-dom";

import ProjectPage from "../pages/project/ProjectPage";
import ProjectsPage from "../pages/projects/ProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsPage />,
  },
  {
    path: "/projects/:projectId",
    element: <ProjectPage />,
  },
]);
