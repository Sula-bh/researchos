from __future__ import annotations

from pathlib import Path
from uuid import UUID

import cognee

from app.ai.providers.memory_provider import MemoryProvider


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
        dataset_name = self._dataset_name(project_id)

        await cognee.remember(
            str(file_path),
            dataset_name=dataset_name,
        )

    async def search(
        self,
        *,
        project_id: UUID,
        query: str,
    ):
        dataset_name = self._dataset_name(project_id)

        return await cognee.recall(
            query_text=query,
            dataset_name=dataset_name,
        )

    async def forget_project(
        self,
        *,
        project_id: UUID,
    ) -> None:
        dataset_name = self._dataset_name(project_id)

        await cognee.forget(
            dataset=dataset_name,
        )