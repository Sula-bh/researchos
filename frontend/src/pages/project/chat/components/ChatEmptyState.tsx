import { Bot, FileText, Search, Sparkles, TriangleAlert } from "lucide-react";

interface ChatEmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

const SUGGESTED_PROMPTS = [
  {
    text: "Compare the uploaded papers.",
    icon: FileText,
  },
  {
    text: "What research gaps have you identified?",
    icon: Search,
  },
  {
    text: "What contradictions exist across these papers?",
    icon: TriangleAlert,
  },
  {
    text: "What should I investigate next?",
    icon: Sparkles,
  },
];

export default function ChatEmptyState({ onPromptClick }: ChatEmptyStateProps) {
  return (
    <div className="relative flex min-h-107.5 w-full items-center justify-center overflow-hidden px-4 py-8 sm:min-h-121.25 sm:px-8">
      <div className="pointer-events-none absolute inset-0 text-[#dcd5ff]">
        <svg
          className="absolute -left-30 top-27.5 h-60 w-130"
          viewBox="0 0 520 240"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 20C88 34 134 80 214 112C300 146 390 136 520 84"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M0 82C98 102 142 152 226 180C314 208 410 188 520 124"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.75"
          />
          <path
            d="M18 144C118 174 168 218 260 226C352 234 420 196 520 152"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.45"
          />
        </svg>

        <svg
          className="absolute -right-30 top-30 h-60 w-130`"
          viewBox="0 0 520 240"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 152C108 108 162 58 256 48C350 38 422 66 520 20"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M0 188C116 126 178 84 270 74C360 64 432 96 520 52"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.75"
          />
          <path
            d="M0 224C110 164 180 122 276 112C370 102 444 132 520 84"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.45"
          />
        </svg>

        <span className="absolute left-[8%] top-[24%] h-2 w-2 rounded-full bg-[#dcd5ff]" />
        <span className="absolute left-[18%] top-[15%] h-3 w-3 rounded-full bg-[#ded8ff]" />
        <span className="absolute left-[20%] top-[34%] h-4 w-4 rounded-full bg-[#e4defe]" />
        <span className="absolute left-[14%] top-[50%] h-2 w-2 rounded-full bg-white" />
        <span className="absolute left-[24%] top-[50%] h-2.5 w-2.5 rounded-full bg-[#e4defe]" />
        <span className="absolute left-[17%] top-[45%] h-3.5 w-3.5 rounded-full bg-white" />
        <span className="absolute left-[15%] top-[38%] h-2 w-2 rounded-full bg-[#e5dfff]" />
        <span className="absolute left-[22%] top-[23%] h-1.5 w-1.5 rounded-full bg-[#ffe4a8]" />
        <span className="absolute right-[24%] top-[20%] h-3 w-3 rounded-full bg-[#e6e0ff]" />
        <span className="absolute right-[17%] top-[34%] h-3 w-3 rounded-full bg-[#e7e1ff]" />
        <span className="absolute right-[20%] top-[45%] h-2 w-2 rounded-full bg-[#e7e1ff]" />
        <span className="absolute right-[10%] top-[34%] h-3 w-3 rounded-full bg-[#e2dbff]" />
        <span className="absolute right-[8%] top-[50%] h-2 w-2 rounded-full bg-white" />
        <span className="absolute right-[4%] top-[48%] h-3 w-3 rounded-full bg-white" />
        <span className="absolute right-[3%] top-[40%] h-1.5 w-1.5 rounded-full bg-[#ffe4a8]" />
      </div>

      <div className="relative z-10 flex w-full max-w-225 flex-col items-center">
        <div className="flex h-22 w-22 items-center justify-center rounded-3xl border border-[#d8d1ff] bg-white/80 shadow-[0_20px_34px_rgba(86,63,220,0.17)] backdrop-blur">
          <div className="flex h-14 w-14 items-center justify-center text-[#5a3cf2]">
            <Bot className="h-12 w-12 stroke-[2.6]" />
          </div>
        </div>

        <h2 className="mt-11 text-center text-3xl font-bold leading-tight text-[#111832] sm:text-[34px]">
          Meet your Research Companion
        </h2>

        <p className="mt-6 max-w-180 text-center text-lg leading-8 text-[#505b79]">
          Your AI companion builds a long-term memory of every processed paper
          in this project. Ask questions, compare findings, identify trends, and
          explore your research without starting from scratch.
        </p>

        <div className="mt-11 grid w-full max-w-202.5 grid-cols-1 gap-3 sm:grid-cols-2">
          {SUGGESTED_PROMPTS.map(({ text, icon: Icon }) => (
            <button
              key={text}
              onClick={() => onPromptClick(text)}
              className="group flex min-h-14 items-center gap-4 rounded-[14px] border border-[#cbc4ff] bg-white/72 px-5 py-3 text-left text-base text-[#111832] shadow-[0_10px_28px_rgba(85,63,210,0.05)] backdrop-blur transition-all hover:border-[#8876ff] hover:bg-white hover:shadow-[0_14px_32px_rgba(85,63,210,0.12)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#8f7cff]/30"
            >
              <Icon className="h-6 w-6 shrink-0 text-[#4f35f2] transition-transform group-hover:scale-105" />
              <span className="leading-6">{text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
