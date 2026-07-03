import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessageType } from "@/types/chat";

import ChatSources from "./ChatSources";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
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
        ) : (
          <>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),

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

            <ChatSources sources={message.sources} />
          </>
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
