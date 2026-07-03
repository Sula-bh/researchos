import type { ChatSource } from "@/types/chat";

interface ChatSourcesProps {
  sources?: ChatSource[];
}

export default function ChatSources({ sources }: ChatSourcesProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 border-t pt-3">
      <p className="mb-2 text-xs font-medium text-muted-foreground">Sources</p>

      <div className="space-y-2">
        {sources.map((source, index) => (
          <div
            key={index}
            className="rounded-md border bg-background px-3 py-2 text-xs"
          >
            <p className="font-medium">{source.source}</p>

            <p className="text-muted-foreground">{source.dataset}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
