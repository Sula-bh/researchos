import type { Paper } from "@/types/paper";

type Props = {
  paper: Paper;
};

export default function PaperCard({ paper }: Props) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">{paper.title}</h3>

      <p className="text-sm text-gray-500">
        {paper.authors ?? "Unknown author"}
      </p>
    </div>
  );
}
