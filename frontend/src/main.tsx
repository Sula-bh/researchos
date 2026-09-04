import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";

import "./index.css";
import "@mdxeditor/editor/style.css";
import App from "./App.tsx";
import ApiInterceptor from "@/components/ApiInterceptor";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkPubKey}
      signInUrl="/login"
      signUpUrl="/register"
      signInFallbackRedirectUrl="/projects"
      signUpFallbackRedirectUrl="/projects"
    >
      <ApiInterceptor />
      <App />
    </ClerkProvider>
  </StrictMode>,
);
