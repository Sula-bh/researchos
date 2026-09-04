from uuid import UUID

from sqlalchemy import select

from app.exceptions.note import NoteNotFoundError
from app.extensions import db
from app.models.note import Note
from app.models.project import Project


def create_note(
    project_id: UUID,
    user_id: UUID,
    title: str,
    content: str,
) -> Note:
    project = db.session.scalar(
        select(Project).where(
            Project.id == project_id,
            Project.user_id == user_id,
        )
    )

    if project is None:
        raise NoteNotFoundError()

    note = Note(
        project_id=project_id,
        title=title,
        content=content,
    )

    db.session.add(note)
    db.session.commit()

    return note


def get_notes(
    project_id: UUID,
    user_id: UUID,
) -> list[Note]:
    statement = (
        select(Note)
        .join(Project, Note.project_id == Project.id)
        .where(
            Note.project_id == project_id,
            Project.user_id == user_id,
        )
        .order_by(Note.updated_at.desc())
    )

    return db.session.scalars(statement).all()


def get_note(
    note_id: UUID,
    user_id: UUID,
) -> Note:
    statement = (
        select(Note)
        .join(Project, Note.project_id == Project.id)
        .where(
            Note.id == note_id,
            Project.user_id == user_id,
        )
    )

    note = db.session.scalar(statement)

    if note is None:
        raise NoteNotFoundError()

    return note


def update_note(
    note_id: UUID,
    user_id: UUID,
    title: str | None = None,
    content: str | None = None,
) -> Note:
    note = get_note(
        note_id=note_id,
        user_id=user_id,
    )

    if title is not None:
        note.title = title

    if content is not None:
        note.content = content

    db.session.commit()

    return note


def delete_note(
    note_id: UUID,
    user_id: UUID,
) -> None:
    note = get_note(
        note_id=note_id,
        user_id=user_id,
    )

    db.session.delete(note)
    db.session.commit()