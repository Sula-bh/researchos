import type { ReactNode } from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Card } from "@/components/ui/card";

import MarkdownEditor from "@/components/MarkdownEditor";

type ExperimentSectionProps = {
  value: string;
  title: ReactNode;
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
    <Card className="overflow-hidden py-0">
      <AccordionItem value={value} className="border-none">
        <AccordionTrigger className="px-6 py-5 text-base font-semibold hover:no-underline">
          {title}
        </AccordionTrigger>

        <AccordionContent className="border-t px-6 py-6">
          <MarkdownEditor value={content} onChange={onChange} />
        </AccordionContent>
      </AccordionItem>
    </Card>
  );
}
