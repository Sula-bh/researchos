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
    <div className="flex">
      <div className="relative flex-1">
        <Textarea
          ref={inputRef}
          value={value}
          disabled={loading}
          rows={1}
          placeholder="Ask your research companion..."
          className="
          max-h-40
          min-h-19.5
          resize-none
          overflow-y-auto
          rounded-[18px]
          border
          border-[#c7bcff]
          bg-white
          px-7
          py-6
          pr-24
          text-lg
          leading-7
          text-[#111832]
          shadow-[0_14px_34px_rgba(86,63,220,0.13)]
          focus-visible:border-[#8f7cff]
          focus-visible:ring-3
          focus-visible:ring-[#8f7cff]/30
          placeholder:text-[#65708c]
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
          className="absolute right-4 top-1/2 h-14 w-14 -translate-y-1/2 rounded-[14px] bg-[#5a37f2] text-white shadow-[0_12px_24px_rgba(78,52,231,0.28)] hover:bg-[#4d2be8] disabled:bg-[#5a37f2] disabled:opacity-55"
        >
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Send className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
}
