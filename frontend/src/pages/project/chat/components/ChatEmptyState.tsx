import { Bot } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ChatEmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

const SUGGESTED_PROMPTS = [
  "Summarize all uploaded papers.",
  "What are the main contributions of this paper?",
  "Compare the proposed methods.",
  "What future work is suggested?",
];

export default function ChatEmptyState({ onPromptClick }: ChatEmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Bot className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-2xl font-semibold">Research Assistant</h2>

      <p className="mt-3 max-w-xl text-muted-foreground">
        Ask questions about your uploaded papers, compare research, summarize
        findings, or discover important insights.
      </p>

      <div className="mt-10 flex w-full max-w-2xl flex-wrap justify-center gap-3">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            onClick={() => onPromptClick(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
