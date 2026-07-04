import { Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import type { Paper } from "@/types/paper";
import { AIStatus } from "@/types/ai";

interface AISummaryCardProps {
  paper: Paper;
}

export default function AISummaryCard({ paper }: AISummaryCardProps) {
  return (
    <section className="rounded-xl border p-6">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-primary" />

        <h2 className="font-semibold">AI Summary</h2>
      </div>

      {/* Pending */}

      {paper.ai_status === AIStatus.Pending && (
        <p className="mt-4 text-muted-foreground">
          This paper is waiting to be processed.
        </p>
      )}

      {/* Processing */}

      {paper.ai_status === AIStatus.Processing && (
        <div className="mt-4 flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />

          <span>
            AI is analyzing this paper and generating a summary. The summary
            will appear automatically when it's ready.
          </span>
        </div>
      )}

      {/* Failed */}

      {paper.ai_status === AIStatus.Failed && (
        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <p className="font-medium text-destructive">AI processing failed.</p>

          {paper.ai_error && (
            <p className="mt-2 text-sm text-muted-foreground">
              {paper.ai_error}
            </p>
          )}
        </div>
      )}

      {/* Completed */}

      {paper.ai_status === AIStatus.Completed && (
        <>
          <div className="prose prose-sm mt-6 max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {paper.ai_summary ?? ""}
            </ReactMarkdown>
          </div>

          <div className="mt-6">
            <Button>Generate AI Note</Button>
          </div>
        </>
      )}
    </section>
  );
}
