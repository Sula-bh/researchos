import { useEffect, useLayoutEffect, useRef } from "react";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({
  value,
  loading,
  onChange,
  onSend,
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    const textarea = inputRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";

    const newHeight = Math.min(textarea.scrollHeight, 160);

    textarea.style.height = `${newHeight}px`;
  }, [value]);

  return (
    <div className="border-t pt-4">
      <div className="relative">
        <Textarea
          ref={inputRef}
          value={value}
          disabled={loading}
          rows={1}
          placeholder="Ask a question about your papers..."
          className="
          max-h-40
          min-h-14
          resize-none
          overflow-y-auto
          rounded-2xl
          border-0
          bg-muted
          pr-14
          shadow-sm
          focus-visible:ring-1
          "
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend();
            }
          }}
        />

        <Button
          size="icon"
          disabled={loading || !value.trim()}
          onClick={onSend}
          className="absolute bottom-2 right-2 h-9 w-9 rounded-full"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
