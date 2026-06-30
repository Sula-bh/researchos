import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MarkdownEditor from "./MarkdownEditor";

type NoteEditorProps = {
  title: string;
  content: string;

  loading?: boolean;

  updatedAt?: string;

  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;

  onSave: () => void;
};

export default function NoteEditor({
  title,
  content,
  loading = false,
  updatedAt,
  onTitleChange,
  onContentChange,
  onSave,
}: NoteEditorProps) {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <Input
          value={title}
          placeholder="Untitled Note"
          onChange={(e) => onTitleChange(e.target.value)}
          className="h-auto border-none bg-transparent px-0 text-4xl font-bold shadow-none focus-visible:ring-0"
        />

        <Button onClick={onSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>

      {/* Last Updated */}

      {updatedAt && (
        <p className="text-sm text-muted-foreground">
          Last updated {new Date(updatedAt).toLocaleString()}
        </p>
      )}

      {/* Markdown */}

      <MarkdownEditor
        value={content}
        onChange={onContentChange}
        placeholder="Start writing your research notes..."
      />
    </div>
  );
}
