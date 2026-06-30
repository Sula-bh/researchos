from http import HTTPStatus

from app.exceptions.base import ResearchOSError


class NoteNotFoundError(ResearchOSError):
    status_code = HTTPStatus.NOT_FOUND

    message = "Note not found."