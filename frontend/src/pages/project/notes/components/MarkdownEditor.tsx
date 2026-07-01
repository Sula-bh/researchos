import { useEffect, useRef } from "react";

import {
  MDXEditor,
  type MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  ListsToggle,
  UndoRedo,
} from "@mdxeditor/editor";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Start writing...",
}: MarkdownEditorProps) {
  const editorRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    const editor = editorRef.current;

    if (!editor) return;

    if (editor.getMarkdown() !== value) {
      editor.setMarkdown(value);
    }
  }, [value]);

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <MDXEditor
        ref={editorRef}
        markdown={value}
        onChange={onChange}
        placeholder={placeholder}
        contentEditableClassName="
          prose
          prose-neutral
          dark:prose-invert
          max-w-none
          min-h-[450px]
          px-6
          py-5
          focus:outline-none
        "
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarClassName: "border-b bg-muted/40",
            toolbarContents: () => (
              <>
                <UndoRedo />

                <div className="mx-2 h-6 w-px bg-border" />

                <BlockTypeSelect />

                <div className="mx-2 h-6 w-px bg-border" />

                <BoldItalicUnderlineToggles />

                <div className="mx-2 h-6 w-px bg-border" />

                <ListsToggle />

                <CreateLink />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}
