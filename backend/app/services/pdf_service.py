from __future__ import annotations

import fitz


def extract_metadata(path: str) -> dict:
    doc = fitz.open(path)

    metadata = doc.metadata

    return {
        "title": metadata.get("title") or "",
        "authors": metadata.get("author") or "",
        "abstract": "",
    }