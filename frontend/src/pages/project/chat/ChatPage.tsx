import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { chat } from "@/api/chatApi";
import { getErrorMessage } from "@/lib/error";
import type { ChatMessage } from "@/types/chat";

export default function ChatPage() {
  const { projectId } = useParams();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  async function handleSend() {
    if (!projectId) return;

    const message = input.trim();

    if (!message) return;

    try {
      setLoading(true);

      setMessages((previous) => [
        ...previous,
        {
          role: "user",
          content: message,
        },
      ]);

      setInput("");

      const response = await chat(projectId, message);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: response.message,
          sources: response.sources,
        },
      ]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex h-full flex-col space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chat</h1>

        <p className="mt-2 text-muted-foreground">
          Ask questions about your uploaded research papers.
        </p>
      </div>

      {/* Messages */}

      <div className="flex-1 space-y-4 overflow-y-auto rounded-lg border p-4">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Start a conversation by asking a question about your papers.
          </p>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    message.role === "user"
                      ? "max-w-[80%] rounded-lg bg-primary px-4 py-2 text-primary-foreground"
                      : "max-w-[80%] rounded-lg bg-muted px-4 py-2"
                  }
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-muted px-4 py-2">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>
      {/* Input */}

      <div className="flex gap-2">
        <Input
          placeholder="Ask a question about your papers..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          disabled={loading}
        />

        <Button onClick={handleSend} disabled={loading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
