import { FileText, MoreVertical } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { Paper } from "@/types/paper";

type Props = {
  paper: Paper;
};

export default function PaperCard({ paper }: Props) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex items-start justify-between p-6">
        <div className="flex gap-4">
          <FileText className="mt-1 h-6 w-6 text-primary" />

          <div>
            <h3 className="font-semibold">{paper.title}</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {paper.authors ?? "Unknown author"}
            </p>
          </div>
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
