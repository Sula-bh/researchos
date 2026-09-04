from uuid import UUID

from flask import Blueprint, request

from app.ai import chat_service
from app.ai.event_loop import loop
from app.auth import get_current_user
from app.responses import success_response
from app.schemas.chat_schema import ChatRequestSchema, ChatResponseSchema

chat_bp = Blueprint(
    "chat",
    __name__,
    url_prefix="/api"
)

request_schema = ChatRequestSchema()
response_schema = ChatResponseSchema()


@chat_bp.post("/projects/<uuid:project_id>/chat")
def chat(
    project_id: UUID,
):
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, 401

    data = request_schema.load(
        request.get_json(),
    )

    response = loop.run_until_complete(
        chat_service.chat(
            project_id=project_id,
            user_id=user.id,
            message=data["message"],
        )
    )

    return success_response(
        data=response_schema.dump(response),
    )