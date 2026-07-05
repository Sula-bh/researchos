import { useRef } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type UploadPaperButtonProps = {
  onUpload: (file: File) => Promise<void>;
  loading?: boolean;
};

export default function UploadPaperButton({
  onUpload,
  loading,
}: UploadPaperButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.click();
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    console.log("Button: file selected", file.name);

    await onUpload(file);

    console.log("Button: upload finished");

    // Allow uploading the same file again
    event.target.value = "";
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleChange}
      />

      <Button
        onClick={handleClick}
        disabled={loading}
        className="h-11 rounded-[12px] bg-[#5b3df2] px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(91,61,242,0.22)] hover:bg-[#4f35f2]"
      >
        <Plus className="mr-2 h-4 w-4" />

        {loading ? "Uploading..." : "Upload Paper"}
      </Button>
    </>
  );
}
