import { Bot } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ChatEmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

const SUGGESTED_PROMPTS = [
  "Compare the uploaded papers.",
  "What research gaps have you identified?",
  "What contradictions exist across these papers?",
  "What should I investigate next?",
];

export default function ChatEmptyState({ onPromptClick }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Bot className="h-10 w-10 text-primary" />
      </div>

      <h2 className="text-2xl font-semibold">Meet your Research Companion</h2>

      <p className="mt-3 max-w-xl text-muted-foreground">
        Your AI companion builds a long-term memory of every processed paper in
        this project. Ask questions, compare findings, identify trends, and
        explore your research without starting from scratch.
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
