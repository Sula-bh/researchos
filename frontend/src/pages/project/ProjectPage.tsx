import ProjectSidebar from "./components/ProjectSidebar";

export default function ProjectPage() {
  return (
    <main className="flex h-screen">
      <ProjectSidebar />

      <section className="flex-1 p-8">
        <h1>Project</h1>
      </section>
    </main>
  );
}
