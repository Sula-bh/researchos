from http import HTTPStatus

from app.exceptions.base import ResearchOSError


class ProjectError(ResearchOSError):
    """Base class for project related exceptions."""


class ProjectNotFoundError(ProjectError):
    status_code = HTTPStatus.NOT_FOUND
    message = "Project not found."


class DuplicateProjectError(ProjectError):
    status_code = HTTPStatus.CONFLICT
    message = "Project already exists."


class InvalidProjectError(ProjectError):
    status_code = HTTPStatus.BAD_REQUEST
    message = "Invalid project."