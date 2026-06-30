import { useEffect, useState } from "react";
import { FileText, Search } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { deletePaper, getPapers, uploadPaper } from "@/api/paperApi";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/error";
import type { Paper } from "@/types/paper";

import PaperCard from "./components/PaperCard";
import UploadPaperButton from "./components/UploadPaperButton";

export default function PapersPage() {
  const { projectId } = useParams();

  const [papers, setPapers] = useState<Paper[]>([]);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  async function loadPapers(id: string) {
    try {
      const data = await getPapers(id);
      setPapers(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  useEffect(() => {
    if (!projectId) return;

    loadPapers(projectId);
  }, [projectId]);

  async function handleUpload(file: File) {
    if (!projectId) return;

    try {
      setUploading(true);

      const paper = await uploadPaper(projectId, file);

      setPapers((previous) => [paper, ...previous]);

      toast.success("Paper uploaded successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deletePaper(id);

      setPapers((previous) => previous.filter((paper) => paper.id !== id));

      toast.success("Paper deleted.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  const filteredPapers = papers.filter((paper) =>
    paper.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Papers</h1>

          <p className="mt-2 text-muted-foreground">
            Upload and manage your research papers.
          </p>
        </div>

        <UploadPaperButton onUpload={handleUpload} loading={uploading} />
      </div>

      {/* Search */}

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search papers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Empty States */}

      {filteredPapers.length === 0 ? (
        papers.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed py-20">
            <div className="rounded-full bg-primary/10 p-4">
              <FileText className="h-10 w-10 text-primary" />
            </div>

            <h2 className="mt-6 text-xl font-semibold">No papers yet</h2>

            <p className="mt-2 max-w-md text-center text-muted-foreground">
              Upload your first research paper to start building your project's
              knowledge base.
            </p>

            <div className="mt-8">
              <UploadPaperButton onUpload={handleUpload} loading={uploading} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-xl border border-dashed py-20">
            <Search className="h-10 w-10 text-muted-foreground" />

            <h2 className="mt-6 text-xl font-semibold">No matching papers</h2>

            <p className="mt-2 text-muted-foreground">
              Try a different search term.
            </p>
          </div>
        )
      ) : (
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
