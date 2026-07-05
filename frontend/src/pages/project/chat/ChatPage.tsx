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
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[18px] border border-[#cdc8ff] bg-white text-[#121832] shadow-[0_26px_80px_rgba(72,56,178,0.1)]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white">
        <section className="relative overflow-hidden border-b border-[#ded9ff] bg-[radial-gradient(circle_at_18%_18%,rgba(116,89,255,0.09),transparent_12rem),radial-gradient(circle_at_82%_24%,rgba(116,89,255,0.08),transparent_13rem),linear-gradient(180deg,#fff_0%,#fbfaff_100%)]">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setShowDeleteDialog(true)}
              className="absolute right-6 top-6 z-20 h-12 rounded-[14px] border border-[#d7d1ff] bg-white/70 px-5 text-base font-medium text-[#2415ac] shadow-sm backdrop-blur hover:bg-white hover:text-[#4f35f2] max-sm:right-4 max-sm:top-4 max-sm:size-11 max-sm:px-0"
            >
              <Trash2 className="h-5 w-5 sm:mr-2" />
              <span className="max-sm:hidden">Clear Conversation</span>
            </Button>
          )}

          <ChatEmptyState onPromptClick={handlePromptClick} />
        </section>

        {(messages.length > 0 || loading) && (
          <section className="min-h-70 border-b border-[#e1dcff] bg-white px-6 py-7 sm:px-10 sm:py-8">
            <div className="space-y-8">
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
          </section>
        )}
      </div>

      <div className="bg-white px-6 py-6 sm:px-8">
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
