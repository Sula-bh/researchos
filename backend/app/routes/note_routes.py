from http import HTTPStatus
from uuid import UUID

from flask import Blueprint, request

from app.responses import success_response
from app.schemas.note_schema import (
    NoteCreateSchema,
    NoteResponseSchema,
    NoteUpdateSchema,
)
from app.services import note_service

note_bp = Blueprint(
    "notes",
    __name__,
    url_prefix="/api",
)

create_schema = NoteCreateSchema()
update_schema = NoteUpdateSchema()
response_schema = NoteResponseSchema()


@note_bp.post("/projects/<uuid:project_id>/notes")
def create_note(project_id: UUID):
    data = create_schema.load(request.get_json())

    note = note_service.create_note(
        project_id=project_id,
        title=data["title"],
        content=data["content"],
    )

    return success_response(
        data=response_schema.dump(note),
        message="Note created successfully.",
        status=HTTPStatus.CREATED,
    )


@note_bp.get("/projects/<uuid:project_id>/notes")
def get_notes(project_id: UUID):
    notes = note_service.get_notes(project_id)

    return success_response(
        data=response_schema.dump(notes, many=True),
    )


@note_bp.get("/notes/<uuid:note_id>")
def get_note(note_id: UUID):
    note = note_service.get_note(note_id)

    return success_response(
        data=response_schema.dump(note),
    )


@note_bp.patch("/notes/<uuid:note_id>")
def update_note(note_id: UUID):
    data = update_schema.load(request.get_json())

    note = note_service.update_note(
        note_id=note_id,
        title=data.get("title"),
        content=data.get("content"),
    )

    return success_response(
        data=response_schema.dump(note),
        message="Note updated successfully.",
    )


@note_bp.delete("/notes/<uuid:note_id>")
def delete_note(note_id: UUID):
    note_service.delete_note(note_id)

    return success_response(
        message="Note deleted successfully.",
    )