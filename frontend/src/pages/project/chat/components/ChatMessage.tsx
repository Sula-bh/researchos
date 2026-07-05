import { Bot, Sparkles, User } from "lucide-react";
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
      className={`flex w-full items-start gap-4 ${
        isUser ? "justify-end pl-12 sm:pl-24" : "justify-start pr-0 sm:pr-8"
      }`}
    >
      {/* AI Avatar */}

      {!isUser && (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#d7d1ff] bg-[#faf9ff] text-[#5235f2] shadow-[0_10px_24px_rgba(85,63,210,0.1)]">
          <Bot className="h-7 w-7 stroke-[2.6]" />
        </div>
      )}

      {/* Bubble */}

      <div
        className={`min-h-14 rounded-[14px] border px-5 py-4 text-[#111832] shadow-[0_14px_36px_rgba(85,63,210,0.05)] ${
          isUser
            ? "max-w-[min(100%,420px)] border-[#cfc8ff] bg-[#f1edff]"
            : "w-full max-w-220 border-[#cbc4ff] bg-white"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-base leading-6">
            {message.content}
          </p>
        ) : loading ? (
          <div className="flex flex-wrap items-center gap-4">
            <Sparkles className="h-6 w-6 shrink-0 text-[#4f35f2]" />

            <span className="text-base font-semibold text-[#111832]">
              Searching my research memory...
            </span>

            <div className="ml-1 flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#68728c]"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#68728c]"
                style={{ animationDelay: "250ms" }}
              />
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#68728c]"
                style={{ animationDelay: "500ms" }}
              />
            </div>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-3 text-base leading-7 last:mb-0">{children}</p>
              ),

              ul: ({ children }) => (
                <ul className="list-disc space-y-1 pl-5">{children}</ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal space-y-1 pl-5">{children}</ol>
              ),

              li: ({ children }) => (
                <li className="text-base leading-7">{children}</li>
              ),

              code: ({ children }) => (
                <code className="rounded-md bg-[#f3f0ff] px-1.5 py-0.5 font-mono text-sm text-[#2415ac]">
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
        <div className="flex h-14 w-10 shrink-0 items-center justify-center text-[#65708c]">
          <User className="h-7 w-7 stroke-[1.8]" />
        </div>
      )}
    </div>
  );
}
