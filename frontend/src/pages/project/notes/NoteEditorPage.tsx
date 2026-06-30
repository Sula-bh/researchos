import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import NoteEditor from "./components/NoteEditor";

export default function NoteEditorPage() {
  const { projectId } = useParams();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  function handleSave() {
    console.log({
      title,
      content,
    });
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild>
        <Link to={`/projects/${projectId}/notes`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Notes
        </Link>
      </Button>

      <NoteEditor
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSave={handleSave}
      />
    </div>
  );
}
