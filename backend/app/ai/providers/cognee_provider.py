from __future__ import annotations

from pathlib import Path
from uuid import UUID

import cognee

from app.ai.providers.memory_provider import MemoryProvider
from app.exceptions.ai import AIIngestionError, AISearchError


class CogneeProvider(MemoryProvider):
    @staticmethod
    def _dataset_name(project_id: UUID) -> str:
        return f"project:{project_id}"

    async def ingest_document(
        self,
        *,
        project_id: UUID,
        file_path: Path,
    ) -> None:
        try:
            await cognee.remember(
                str(file_path),
                dataset_name=self._dataset_name(project_id),
            )
        except Exception as error:
            raise AIIngestionError(
                f"Failed to ingest document: {error}"
            ) from error

    async def search(
        self,
        *,
        project_id: UUID,
        query: str,
    ):
        try:
            return await cognee.recall(
                query_text=query,
                dataset_name=self._dataset_name(project_id),
            )
        except Exception as error:
            raise AISearchError(
                f"Failed to search knowledge base: {error}"
            ) from error

    async def forget_project(
        self,
        *,
        project_id: UUID,
    ) -> None:
        dataset_name = self._dataset_name(project_id)

        await cognee.forget(
            dataset=dataset_name
        )