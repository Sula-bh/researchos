from __future__ import annotations

import logging
from datetime import UTC, datetime
from uuid import UUID

from app.ai.providers.cognee_provider import CogneeProvider
from app.exceptions.ai import AIIngestionError
from app.extensions import db
from app.models.enums import AIStatus
from app.models.paper import Paper
from app.services.storage_service import get_file_path

logger = logging.getLogger(__name__)


class KnowledgeService:
    def __init__(
        self,
        provider: CogneeProvider | None = None,
    ) -> None:
        self.provider = provider or CogneeProvider()

    async def ingest_paper(
        self,
        paper: Paper,
    ) -> None:
        paper.ai_status = AIStatus.PROCESSING
        paper.ai_error = None

        db.session.commit()

        try:
            logger.info(
                "Starting AI ingestion for paper %s",
                paper.id,
                paper.project_id
            )
            
            file_path = get_file_path(paper.storage_key)

            await self.provider.ingest_document(
                project_id=paper.project_id,
                file_path=file_path,
            )

            paper.ai_status = AIStatus.COMPLETED
            paper.processed_at = datetime.now(UTC)
            paper.ai_error = None

            db.session.commit()

            logger.info(
                "Completed AI ingestion for paper %s",
                paper.id,
            )

        except AIIngestionError as error:
            paper.ai_status = AIStatus.FAILED
            paper.ai_error = str(error)

            db.session.commit()

            logger.exception(
                "AI ingestion failed for paper %s",
                paper.id,
            )

            raise
            

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
    
    def format_results(self, results) -> str:
        text = "\n\n".join(
            result.text
            for result in results
            if hasattr(result, "text")
        )

        if "Evidence:" in text:
            text = text.split("Evidence:")[0].strip()

        return text

    async def delete_project_knowledge(
        self,
        *,
        project_id: UUID,
    ) -> None:
        await self.provider.forget_project(
            project_id=project_id,
        )