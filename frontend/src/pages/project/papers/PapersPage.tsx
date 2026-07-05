import { useEffect, useMemo, useState } from "react";
import { FileText, Search } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { deletePaper, getPapers, uploadPaper } from "@/api/paperApi";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/error";
import type { Paper } from "@/types/paper";

import PaperCard from "./components/PaperCard";
import UploadPaperButton from "./components/UploadPaperButton";
import DeletePaperDialog from "./components/DeletePaperDialog";

export default function PapersPage() {
  const { projectId } = useParams();

  const [papers, setPapers] = useState<Paper[]>([]);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  const [deletingPaper, setDeletingPaper] = useState<Paper | null>(null);

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

  const filteredPapers = useMemo(() => {
    const query = search.toLowerCase();

    return papers.filter((paper) => paper.title.toLowerCase().includes(query));
  }, [papers, search]);

  async function handleDelete() {
    if (!deletingPaper) return;

    try {
      await deletePaper(deletingPaper.id);

      setPapers((previous) =>
        previous.filter((paper) => paper.id !== deletingPaper.id),
      );

      toast.success("Paper deleted.");

      setDeletingPaper(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111832]">
            Papers
          </h1>

          <p className="mt-2 text-sm text-[#65708c]">
            Upload and manage your research papers.
          </p>
        </div>

        <UploadPaperButton onUpload={handleUpload} loading={uploading} />
      </div>

      {/* Search */}

      <div className="rounded-2xl border border-[#e1dcff] bg-white p-4 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#65708c]" />

          <Input
            placeholder="Search papers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 rounded-xl border-[#e1dcff] bg-[#fbfaff] pl-10 text-sm shadow-none placeholder:text-[#98a0b7] focus-visible:border-[#7459ff] focus-visible:ring-[#7459ff]/20"
          />
        </div>
      </div>

      {/* Empty States */}

      {filteredPapers.length === 0 ? (
        papers.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#cfc8ff] bg-white py-20 shadow-[0_18px_50px_rgba(72,56,178,0.05)]">
            <div className="rounded-[18px] bg-[#f1efff] p-4">
              <FileText className="h-10 w-10 text-[#5b3df2]" />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#111832]">
              No papers yet
            </h2>

            <p className="mt-2 max-w-md text-center text-[#65708c]">
              Upload your first research paper to start building your project's
              knowledge base.
            </p>

            <div className="mt-8">
              <UploadPaperButton onUpload={handleUpload} loading={uploading} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#cfc8ff] bg-white py-20 shadow-[0_18px_50px_rgba(72,56,178,0.05)]">
            <Search className="h-10 w-10 text-[#65708c]" />

            <h2 className="mt-6 text-xl font-semibold text-[#111832]">
              No matching papers
            </h2>

            <p className="mt-2 text-[#65708c]">Try a different search term.</p>
          </div>
        )
      ) : (
        <div className="space-y-3 rounded-2xl border border-[#e1dcff] bg-white p-4 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
          {filteredPapers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              onDelete={setDeletingPaper}
            />
          ))}
        </div>
      )}

      <DeletePaperDialog
        paper={deletingPaper}
        onClose={() => setDeletingPaper(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}
