from __future__ import annotations

from uuid import UUID

from app.ai import knowledge_service
from app.exceptions.ai import AISearchError


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
                "Question cannot be empty."
            )

        results = await knowledge_service.search(
            project_id=project_id,
            query=message,
        )

        if not results:
            raise AISearchError(
                "No relevant information was found."
            )

        return "\n\n".join(
            result.text
            for result in results
            if hasattr(result, "text")
        )