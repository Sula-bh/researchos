import {
  MDXEditor,
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
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <MDXEditor
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
