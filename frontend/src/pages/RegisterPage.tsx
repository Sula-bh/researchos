import { SignUp } from "@clerk/react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbfaff]">
      <SignUp forceRedirectUrl="/projects" />
    </div>
  );
}
