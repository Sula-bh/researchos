from __future__ import annotations

from pathlib import Path
from uuid import UUID

from app.ai.providers.cognee_provider import CogneeProvider


class KnowledgeService:
    def __init__(self) -> None:
        self.provider = CogneeProvider()

    async def ingest_paper(
        self,
        *,
        project_id: UUID,
        file_path: Path,
    ) -> None:
        await self.provider.ingest_document(
            project_id=project_id,
            file_path=file_path,
        )

    async def search(
        self,
        *,
        project_id: UUID,
        query: str,
    ):
        return await self.provider.search(
            project_id=project_id,
            query=query,
        )

    async def delete_project_knowledge(
        self,
        *,
        project_id: UUID,
    ) -> None:
        await self.provider.forget_project(
            project_id=project_id,
        )