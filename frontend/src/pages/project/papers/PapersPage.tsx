import { useEffect, useState } from "react";
import { FileText, Plus, Search } from "lucide-react";
import { useParams } from "react-router-dom";

import { getPapers } from "@/api/paperApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Papers</h1>

          <p className="mt-2 text-muted-foreground">
            Upload and manage your research papers.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Paper
        </Button>
      </div>

      {/* Search */}

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input placeholder="Search papers..." className="pl-10" />
      </div>

      {/* Paper List */}

      {papers.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed py-20">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground" />

          <h2 className="text-xl font-semibold">No papers yet</h2>

          <p className="mt-2 text-muted-foreground">
            Upload your first paper to start building your research memory.
          </p>

          <Button className="mt-6">
            <Plus className="mr-2 h-4 w-4" />
            Upload Paper
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
}
