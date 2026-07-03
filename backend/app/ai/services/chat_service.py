from __future__ import annotations

from uuid import UUID

from app.ai import knowledge_service
from app.exceptions.chat import (
    EmptyMessageError,
    NoAnswerFoundError,
    NoProcessedPapersError,
)
from app.extensions import db
from app.models.enums import AIStatus
from app.models.paper import Paper
from app.services.project_service import get_project
from sqlalchemy import select


class ChatService:
    async def chat(
        self,
        *,
        project_id: UUID,
        message: str,
    ) -> dict:
        message = message.strip()

        if not message:
            raise EmptyMessageError()

        get_project(project_id)

        statement = (
            select(Paper)
            .where(Paper.project_id == project_id)
            .where(Paper.ai_status == AIStatus.COMPLETED)
            .limit(1)
        )

        completed_paper = db.session.scalar(
            statement,
        )

        if completed_paper is None:
            raise NoProcessedPapersError()

        results = await knowledge_service.search(
            project_id=project_id,
            query=message,
        )

        if not results:
            raise NoAnswerFoundError()

        texts = []
        sources = []

        for result in results:
            if hasattr(result, "text"):
                texts.append(result.text)

            sources.append(
                {
                    "source": result.source,
                    "dataset": result.dataset_name,
                }
            )

        return {
            "message": "\n\n".join(texts),
            "sources": sources,
        }