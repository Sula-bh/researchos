from http import HTTPStatus

from app.exceptions.base import ResearchOSError


class ExperimentNotFoundError(ResearchOSError):
    status_code = HTTPStatus.NOT_FOUND

    message = "Experiment not found."