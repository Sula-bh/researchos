import { createBrowserRouter } from "react-router-dom";

import ProjectPage from "../pages/ProjectPage";
import ProjectsPage from "../pages/ProjectsPage";

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
