from __future__ import annotations

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any
from uuid import UUID


class MemoryProvider(ABC):
    @abstractmethod
    async def ingest_document(
        self,
        *,
        project_id: UUID,
        file_path: Path,
    ) -> None:
        """Store a document for a project."""

    @abstractmethod
    async def search(
        self,
        *,
        project_id: UUID,
        query: str,
    ) -> list[Any]:
        """Search a project's knowledge."""

    @abstractmethod
    async def forget_project(
        self,
        *,
        project_id: UUID,
    ) -> None:
        """Delete all knowledge belonging to a project."""