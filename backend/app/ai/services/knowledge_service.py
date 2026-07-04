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

    @staticmethod
    def dataset_name(
        *,
        project_id: UUID,
        paper_id: UUID,
    ) -> str:
        return f"project:{project_id}:paper:{paper_id}"

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
            )

            file_path = get_file_path(
                paper.storage_key,
            )

            dataset_name = self.dataset_name(
                project_id=paper.project_id,
                paper_id=paper.id,
            )

            await self.provider.ingest_document(
                dataset_name=dataset_name,
                file_path=file_path,
            )

            from app.ai import summary_service

            summary = await summary_service.generate_summary(
                paper=paper,
            )

            paper.ai_summary = summary
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
        datasets: list[str],
        query: str,
    ):
        return await self.provider.search(
            datasets=datasets,
            query=query,
        )

    def format_results(
        self,
        results,
    ) -> str:
        text = "\n\n".join(
            result.text
            for result in results
            if hasattr(result, "text")
        )

        if "Evidence:" in text:
            text = text.split("Evidence:")[0].strip()

        return text

    async def delete_dataset(
        self,
        *,
        dataset_name: str,
    ) -> None:
        await self.provider.forget_dataset(
            dataset_name=dataset_name,
        )