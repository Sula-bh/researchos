from __future__ import annotations

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any


class MemoryProvider(ABC):
    @abstractmethod
    async def ingest_document(
        self,
        *,
        dataset_name: str,
        file_path: Path,
    ) -> None:
        """Store a document inside a dataset."""

    @abstractmethod
    async def search(
        self,
        *,
        datasets: list[str],
        query: str,
    ) -> list[Any]:
        """Search one or more datasets."""

    @abstractmethod
    async def forget_dataset(
        self,
        *,
        dataset_name: str,
    ) -> None:
        """Delete a dataset."""