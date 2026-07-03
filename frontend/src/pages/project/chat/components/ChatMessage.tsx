import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  loading?: boolean;
}

export default function ChatMessage({
  message,
  loading = false,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}

      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
      )}

      {/* Bubble */}

      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 shadow-sm ${
          isUser ? "bg-primary text-primary-foreground" : "border bg-muted"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : loading ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Analyzing papers
            </span>

            <div className="flex items-center gap-1">
              <span
                className="h-2 w-2 animate-pulse rounded-full bg-black"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="h-2 w-2 animate-pulse rounded-full bg-black"
                style={{ animationDelay: "250ms" }}
              />
              <span
                className="h-2 w-2 animate-pulse rounded-full bg-black"
                style={{ animationDelay: "500ms" }}
              />
            </div>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,

              ul: ({ children }) => (
                <ul className="list-disc pl-5">{children}</ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal pl-5">{children}</ol>
              ),

              li: ({ children }) => <li className="mb-1">{children}</li>,

              code: ({ children }) => (
                <code className="rounded bg-background px-1 py-0.5 font-mono text-sm">
                  {children}
                </code>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>

      {/* User Avatar */}

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
