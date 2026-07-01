from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass(slots=True)
class PDFPage:
    number: int
    text: str


@dataclass(slots=True)
class PDFDocument:
    title: str
    authors: str
    abstract: str
    pages: list[PDFPage] = field(default_factory=list)
    metadata: dict[str, Any] = field(default_factory=dict)

    @property
    def text(self) -> str:
        return "\n".join(page.text for page in self.pages)