import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import { getPaper, openPaper } from "@/api/paperApi";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/error";
import type { Paper } from "@/types/paper";
import AISummaryCard from "./components/AISummaryCard";
import { AIStatus } from "@/types/ai";

export default function PaperDetailsPage() {
  const { paperId } = useParams();

  const [paper, setPaper] = useState<Paper>();

  useEffect(() => {
    if (!paperId) return;

    const id = paperId;

    async function loadPaper() {
      try {
        const data = await getPaper(id);

        setPaper(data);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }

    loadPaper();
  }, [paperId]);

  useEffect(() => {
    if (paper?.ai_status !== AIStatus.Processing) {
      return;
    }

    const interval = window.setInterval(async () => {
      if (!paperId) return;

      try {
        const updatedPaper = await getPaper(paperId);

        setPaper(updatedPaper);
      } catch {
        // Ignore polling errors.
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [paper?.ai_status, paperId]);

  if (!paper) {
    return (
      <div className="flex h-60 items-center justify-center rounded-2xl border border-[#e1dcff] bg-white text-[#65708c] shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
        Loading paper...
      </div>
    );
  }

  console.log(paper);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        to="../"
        className="inline-flex items-center gap-2 rounded-xl px-1 text-sm font-semibold text-[#65708c] transition-colors hover:text-[#4f35f2]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Papers
      </Link>

      {/* Header */}

      <div className="rounded-[18px] border border-[#e1dcff] bg-white p-6 shadow-[0_18px_50px_rgba(72,56,178,0.07)]">
        <div className="mb-4 inline-flex rounded-b-md bg-[#5b3df2] px-5 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-[0_12px_24px_rgba(91,61,242,0.22)]">
          Paper Details
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#111832]">
          {paper.title}
        </h1>

        <p className="mt-3 text-sm text-[#65708c]">
          {paper.authors ?? "Unknown author"}
        </p>
      </div>

      {/* Abstract */}

      <section className="space-y-3 rounded-[18px] border border-[#e1dcff] bg-white p-6 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
        <h2 className="text-lg font-semibold text-[#111832]">Abstract</h2>

        <div className="rounded-[14px] border border-[#eeeaff] bg-[#fbfaff] p-5">
          <p className="whitespace-pre-line leading-7 text-[#4b5875]">
            {paper.abstract || "No abstract available."}
          </p>
        </div>
      </section>

      {/* Actions */}

      <section className="space-y-3 rounded-[18px] border border-[#e1dcff] bg-white p-6 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
        <h2 className="text-lg font-semibold text-[#111832]">Actions</h2>

        <Button
          onClick={() => openPaper(paper.id)}
          className="h-11 rounded-xl bg-[#5b3df2] px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(91,61,242,0.22)] hover:bg-[#4f35f2]"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Open PDF
        </Button>
      </section>

      {/* AI Summary */}

      <AISummaryCard paper={paper} />

      {/* Notes */}

      <section className="rounded-[18px] border border-[#e1dcff] bg-white p-6 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
        <h2 className="font-semibold text-[#111832]">Notes</h2>

        <p className="mt-3 text-[#65708c]">
          Research notes for this paper will appear here.
        </p>
      </section>
    </div>
  );
}
