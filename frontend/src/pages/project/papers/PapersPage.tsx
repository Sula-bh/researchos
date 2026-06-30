import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPapers } from "@/api/paperApi";
import type { Paper } from "@/types/paper";

import PaperCard from "./components/PaperCard";

export default function PapersPage() {
  const { projectId } = useParams();

  const [papers, setPapers] = useState<Paper[]>([]);

  useEffect(() => {
    if (!projectId) return;

    const id = projectId;

    async function fetchPapers() {
      try {
        const data = await getPapers(id);
        setPapers(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPapers();
  }, [projectId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Papers</h2>

        <button>Upload Paper</button>
      </div>

      {papers.map((paper) => (
        <PaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
}
