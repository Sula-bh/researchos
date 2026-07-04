from __future__ import annotations

from pathlib import Path

import cognee

from app.ai.providers.memory_provider import MemoryProvider
from app.exceptions.ai import AIIngestionError, AISearchError


class CogneeProvider(MemoryProvider):
    async def ingest_document(
        self,
        *,
        dataset_name: str,
        file_path: Path,
    ) -> None:
        try:
            await cognee.remember(
                str(file_path),
                dataset_name=dataset_name,
                self_improvement=False
            )
        except Exception as error:
            raise AIIngestionError(
                f"Failed to ingest document: {error}"
            ) from error

    async def search(
        self,
        *,
        datasets: list[str],
        query: str,
    ):
        try:
            return await cognee.recall(
                query_text=query,
                datasets=datasets,
                include_references=True,
            )
        except Exception as error:
            raise AISearchError(
                f"Failed to search knowledge base: {error}"
            ) from error

    async def forget_dataset(
        self,
        *,
        dataset_name: str,
    ) -> None:
        await cognee.forget(
            dataset=dataset_name
        )