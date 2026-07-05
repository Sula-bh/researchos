import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { chat } from "@/api/chatApi";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/error";
import type { ChatMessageType } from "@/types/chat";

import ChatEmptyState from "./components/ChatEmptyState";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";
import DeleteChatDialog from "./components/DeleteChatDialog";

const QUICK_PROMPTS = [
  "Compare the uploaded papers.",
  "What research gaps have you identified?",
  "What contradictions exist across these papers?",
  "What should I investigate next?",
];

export default function ChatPage() {
  const { projectId } = useParams();

  const storageKey = projectId ? `researchos-chat-${projectId}` : "";

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
    if (!projectId) return;

    const savedMessages = localStorage.getItem(storageKey);

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    setInitialized(true);
  }, [projectId, storageKey]);

  useEffect(() => {
    if (!initialized || !projectId) return;

    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, initialized, projectId, storageKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  function handlePromptClick(prompt: string) {
    setInput(prompt);
  }

  function handleClearChat() {
    localStorage.removeItem(storageKey);

    setMessages([]);

    setShowDeleteDialog(false);

    toast.success("Conversation cleared.");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto rounded-xl border bg-background">
        {/* Toolbar */}

        <div className="sticky top-0 z-10 flex justify-end border-b bg-background/95 px-6 py-3 backdrop-blur">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        <div className="p-6">
          {messages.length === 0 ? (
            <ChatEmptyState onPromptClick={handlePromptClick} />
          ) : (
            <>
              {/* Compact prompt bar */}

              <div className="mb-8">
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  Continue exploring
                </p>

                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => handlePromptClick(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Conversation */}

              <div className="space-y-6">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}

                {loading && (
                  <ChatMessage
                    loading
                    message={{
                      role: "assistant",
                      content: "",
                    }}
                  />
                )}

                <div ref={bottomRef} />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-4">
        <ChatInput
          value={input}
          loading={loading}
          onChange={setInput}
          onSend={handleSend}
        />
      </div>

      <DeleteChatDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onDelete={handleClearChat}
      />
    </div>
  );
}
