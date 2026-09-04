import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import { SignUp } from "@clerk/react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#fbfaff]">
      <div className="flex min-h-screen">
        {/* Left branding panel */}
        <div className="hidden w-1/2 flex-col justify-between bg-[#17133b] p-10 lg:flex">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#5b3df2] text-white">
              <BrainCircuit className="h-6 w-6" />
            </span>

            <span className="text-lg font-bold tracking-tight text-white">
              ResearchOS
            </span>
          </Link>

          <div className="max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b7a9ff]">
              Start researching
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-[-0.04em] text-white">
              Build your
              <span className="block text-[#b7a9ff]">research workspace.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-[#c8c3e2]">
              Bring your papers, experiments, notes, and AI-powered research
              companion together in one place.
            </p>
          </div>

          <p className="text-sm text-[#8f89ad]">
            Start building your research knowledge base today.
          </p>
        </div>

        {/* Sign up */}
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="flex items-center justify-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#5b3df2] text-white shadow-[0_12px_24px_rgba(91,61,242,0.22)]">
                  <BrainCircuit className="h-6 w-6" />
                </span>

                <span className="text-lg font-bold tracking-tight text-[#111832]">
                  ResearchOS
                </span>
              </Link>
            </div>

            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-[#111832]">
                Create your workspace
              </h2>

              <p className="mt-2 text-sm text-[#65708c]">
                Set up your ResearchOS account to get started.
              </p>
            </div>

            <div className="flex justify-center">
              <SignUp forceRedirectUrl="/projects" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
