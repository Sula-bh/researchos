import {
  ArrowRight,
  BrainCircuit,
  FileText,
  FlaskConical,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/react";

const features = [
  {
    icon: FileText,
    title: "Manage your research",
    description:
      "Keep papers, experiments, and notes organized in one focused workspace.",
  },
  {
    icon: BrainCircuit,
    title: "Build persistent AI memory",
    description:
      "Turn your research papers into a project-specific knowledge base with Cognee.",
  },
  {
    icon: MessageSquare,
    title: "Ask your Research Companion",
    description:
      "Ask questions across your processed papers and uncover connections, gaps, and insights.",
  },
  {
    icon: FlaskConical,
    title: "Track experiments",
    description:
      "Document objectives, methodology, results, and conclusions alongside your research.",
  },
];

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Navigate to="/projects" replace />;
  }
  return (
    <div className="min-h-screen bg-[#fbfaff] text-[#111832]">
      {/* Navigation */}
      <header className="border-b border-[#eeeaff] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#5b3df2] text-white shadow-[0_12px_24px_rgba(91,61,242,0.22)]">
              <BrainCircuit className="h-6 w-6" />
            </span>

            <span className="text-lg font-bold tracking-tight">ResearchOS</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#4b5875] transition-colors hover:bg-[#f5f2ff] hover:text-[#2415ac]"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-[#5b3df2] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(91,61,242,0.18)] transition-all hover:bg-[#4f35df] hover:shadow-[0_12px_28px_rgba(91,61,242,0.24)]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute left-1/2 -top-55 h-130 w-225 -translate-x-1/2 rounded-full bg-[#e9e3ff] opacity-60 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center lg:px-8 lg:pb-32 lg:pt-32">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#ded7ff] bg-white/80 px-4 py-2 text-sm font-medium text-[#5b3df2] shadow-sm backdrop-blur">
              <BrainCircuit className="h-4 w-4" />
              AI-powered research workspace
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-[-0.04em] text-[#111832] sm:text-6xl lg:text-7xl">
              Your research,
              <span className="block text-[#5b3df2]">
                intelligently connected.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#65708c] sm:text-xl">
              ResearchOS brings papers, experiments, notes, and persistent AI
              memory together in one workspace built for serious research.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#5b3df2] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(91,61,242,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#4f35df]"
              >
                Start researching
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-[#e1dcff] bg-white px-6 py-3.5 text-sm font-semibold text-[#4b5875] transition-colors hover:bg-[#f8f6ff]"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-[#eeeaff] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b3df2]">
                Everything in one place
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#111832] sm:text-4xl">
                A workspace that remembers your research
              </h2>

              <p className="mt-4 text-[#65708c]">
                Organize your work while giving AI the context it needs to
                actually help.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#eeeaff] bg-[#fbfaff] p-6 transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(72,56,178,0.08)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f1efff] text-[#5b3df2]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 font-semibold text-[#111832]">{title}</h3>

                  <p className="mt-2 text-sm leading-6 text-[#65708c]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8 lg:py-28">
          <div className="rounded-3xl bg-[#17133b] px-6 py-14 shadow-[0_24px_70px_rgba(40,30,100,0.16)] sm:px-12">
            <BrainCircuit className="mx-auto h-10 w-10 text-[#b7a9ff]" />

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Turn your research into knowledge.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[#c8c3e2]">
              Build your research workspace and let your Research Companion help
              you make sense of what you've already discovered.
            </p>

            <Link
              to="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#4f35df] transition-colors hover:bg-[#f5f2ff]"
            >
              Create your workspace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#eeeaff] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-[#5b3df2]" />
            <span className="text-sm font-semibold text-[#111832]">
              ResearchOS
            </span>
          </div>

          <p className="text-xs text-[#8a91a8]">
            AI-powered research workspace
          </p>
        </div>
      </footer>
    </div>
  );
}
