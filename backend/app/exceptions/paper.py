from http import HTTPStatus

from app.exceptions.base import ResearchOSError


class PaperNotFoundError(ResearchOSError):
    status = HTTPStatus.NOT_FOUND
    message = "Paper not found."