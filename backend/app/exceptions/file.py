from http import HTTPStatus

from app.exceptions.base import ResearchOSError


class InvalidFileError(ResearchOSError):
    status = HTTPStatus.BAD_REQUEST