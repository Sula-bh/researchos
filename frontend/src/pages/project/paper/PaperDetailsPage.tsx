import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import { getPaper, openPaper } from "@/api/paperApi";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/error";
import type { Paper } from "@/types/paper";

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

  if (!paper) {
    return (
      <div className="flex h-60 items-center justify-center text-muted-foreground">
        Loading paper...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Link
        to="../"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Papers
      </Link>

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">{paper.title}</h1>

        <p className="mt-2 text-muted-foreground">
          {paper.authors ?? "Unknown author"}
        </p>
      </div>

      {/* Abstract */}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Abstract</h2>

        <div className="rounded-xl border p-6">
          <p className="whitespace-pre-line leading-7 text-muted-foreground">
            {paper.abstract || "No abstract available."}
          </p>
        </div>
      </section>

      {/* Actions */}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Actions</h2>

        <Button onClick={() => openPaper(paper.id)}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Open PDF
        </Button>
      </section>

      {/* AI Summary */}

      <section className="rounded-xl border p-6">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5" />

          <h2 className="font-semibold">AI Summary</h2>
        </div>

        <p className="mt-3 text-muted-foreground">
          AI summaries will appear here after the paper has been processed.
        </p>
      </section>

      {/* Notes */}

      <section className="rounded-xl border p-6">
        <h2 className="font-semibold">Notes</h2>

        <p className="mt-3 text-muted-foreground">
          Research notes for this paper will appear here.
        </p>
      </section>
    </div>
  );
}
