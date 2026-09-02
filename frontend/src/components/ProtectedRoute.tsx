import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/react";

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  // Wait for Clerk to finish loading the session
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfaff]">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Not signed in → login
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Signed in → render requested route
  return <Outlet />;
}
