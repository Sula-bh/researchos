from __future__ import annotations

from pathlib import Path

import fitz

from app.ai.types.document import PDFDocument, PDFPage


def parse_pdf(path: str | Path) -> PDFDocument:
    document = fitz.open(path)

    metadata = document.metadata

    pages = [
        PDFPage(
            number=page.number + 1,
            text=page.get_text().strip(),
        )
        for page in document
    ]

    return PDFDocument(
        title=metadata.get("title") or "",
        authors=metadata.get("author") or "",
        abstract="",
        pages=pages,
        metadata={
            "page_count": len(document),
            "producer": metadata.get("producer"),
            "creator": metadata.get("creator"),
        },
    )