import asyncio
from uuid import UUID

from flask import Blueprint, request

from app.ai import chat_service
from app.responses import success_response
from app.schemas.chat_schema import ChatRequestSchema, ChatResponseSchema

chat_bp = Blueprint(
    "chat",
    __name__,
)

request_schema = ChatRequestSchema()
response_schema = ChatResponseSchema()


@chat_bp.post("/projects/<uuid:project_id>/chat")
def chat(
    project_id: UUID,
):
    data = request_schema.load(
        request.get_json(),
    )

    response = asyncio.run(
        chat_service.chat(
            project_id=project_id,
            message=data["message"],
        )
    )

    return success_response(
        response_schema.dump(response),
    )