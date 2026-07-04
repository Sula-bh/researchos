from __future__ import annotations

from uuid import UUID

from app.ai.services.knowledge_service import KnowledgeService
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

knowledge_service = KnowledgeService()

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
        )

        completed_papers = db.session.scalars(statement).all()

        if not completed_papers:
            raise NoProcessedPapersError()
        
        datasets = [
            knowledge_service.dataset_name(
                project_id=paper.project_id,
                paper_id=paper.id,
            )
            for paper in completed_papers
        ]

        results = await knowledge_service.search(
            datasets=datasets,
            query=message,
        )

        if not results:
            raise NoAnswerFoundError()

        message = knowledge_service.format_results(results)

        sources = [
            {
                "source": result.source,
                "dataset": result.dataset_name,
            }
            for result in results
        ]

        return {
            "message": message,
            "sources": sources,
        }