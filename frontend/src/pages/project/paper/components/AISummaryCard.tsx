import { Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        <div className="mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="mt-6 mb-3 text-xl font-semibold">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-5 mb-2 text-lg font-semibold">{children}</h3>
              ),
              p: ({ children }) => <p className="mb-3 leading-7">{children}</p>,
              ul: ({ children }) => (
                <ul className="mb-3 list-disc pl-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-3 list-decimal pl-6">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              code: ({ children }) => (
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
                  {children}
                </code>
              ),
            }}
          >
            {paper.ai_summary ?? ""}
          </ReactMarkdown>
        </div>
      )}
    </section>
  );
}
