from __future__ import annotations

from pathlib import Path

import fitz

from app.ai.types.document import PDFDocument


def extract_metadata(path: str | Path) -> PDFDocument:
    doc = fitz.open(path)

    metadata = doc.metadata

    return PDFDocument(
        title=metadata.get("title") or "",
        authors=metadata.get("author") or "",
        abstract="",
        metadata={
            "page_count": len(doc),
        },
    )