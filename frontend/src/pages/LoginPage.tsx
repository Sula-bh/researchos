import { SignIn } from "@clerk/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbfaff]">
      <SignIn />
    </div>
  );
}
