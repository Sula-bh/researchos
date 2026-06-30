import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error";

import { useEffect, useState } from "react";
import { FileText, Search } from "lucide-react";
import { useParams } from "react-router-dom";

import { getPapers, uploadPaper } from "@/api/paperApi";
import { Input } from "@/components/ui/input";
import type { Paper } from "@/types/paper";

import PaperCard from "./components/PaperCard";
import UploadPaperButton from "./components/UploadPaperButton";

export default function PapersPage() {
  const { projectId } = useParams();

  const [papers, setPapers] = useState<Paper[]>([]);
  const [uploading, setUploading] = useState(false);

  async function loadPapers(id: string) {
    try {
      const data = await getPapers(id);
      setPapers(data);
    } catch (error) {
      console.error(error);
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
      console.error(error);
      toast.error(getErrorMessage(error));
    } finally {
      setUploading(false);
    }
  }

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

          <div className="mt-6">
            <UploadPaperButton onUpload={handleUpload} loading={uploading} />
          </div>
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
