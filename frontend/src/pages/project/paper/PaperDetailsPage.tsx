import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function PaperDetailsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Link
        to="../"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Papers
      </Link>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Loading...</h1>

        <p className="mt-2 text-muted-foreground">Authors</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Abstract</h2>

        <p className="text-muted-foreground">No abstract available.</p>
      </div>

      <div className="flex gap-3">
        <Button>
          <ExternalLink className="mr-2 h-4 w-4" />
          Open PDF
        </Button>
      </div>

      <div className="rounded-xl border p-6">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5" />

          <h2 className="font-semibold">AI Summary</h2>
        </div>

        <p className="mt-3 text-muted-foreground">Coming soon.</p>
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="font-semibold">Notes</h2>

        <p className="mt-3 text-muted-foreground">Coming soon.</p>
      </div>
    </div>
  );
}
