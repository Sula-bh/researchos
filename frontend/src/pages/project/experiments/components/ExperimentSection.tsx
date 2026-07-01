import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import MarkdownEditor from "@/components/MarkdownEditor";

type ExperimentSectionProps = {
  value: string;

  title: string;

  content: string;

  onChange: (value: string) => void;
};

export default function ExperimentSection({
  value,
  title,
  content,
  onChange,
}: ExperimentSectionProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-lg font-semibold">
        {title}
      </AccordionTrigger>

      <AccordionContent>
        <MarkdownEditor value={content} onChange={onChange} />
      </AccordionContent>
    </AccordionItem>
  );
}
