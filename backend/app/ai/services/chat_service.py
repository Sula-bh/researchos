from __future__ import annotations

from uuid import UUID

from app.ai import knowledge_service
from app.exceptions.ai import AISearchError
from app.exceptions.project import ProjectNotFoundError
from app.extensions import db
from app.models.enums import AIStatus
from app.models.paper import Paper
from app.models.project import Project
from sqlalchemy import select


class ChatService:
    async def chat(
        self,
        *,
        project_id: UUID,
        message: str,
    ) -> str:
        message = message.strip()

        if not message:
            raise AISearchError(
                "Question cannot be empty.",
            )

        project = db.session.get(
            Project,
            project_id,
        )

        if project is None:
            raise ProjectNotFoundError()

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
            raise AISearchError(
                "No processed papers are available for this project.",
            )

        results = await knowledge_service.search(
            project_id=project_id,
            query=message,
        )

        if not results:
            raise AISearchError(
                "No relevant information was found.",
            )

        return "\n\n".join(
            result.text
            for result in results
            if hasattr(result, "text")
        )