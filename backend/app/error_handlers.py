from http import HTTPStatus

from flask import Flask
from marshmallow import ValidationError

from app.exceptions.base import ResearchOSError
from app.responses import error_response


def register_error_handlers(app: Flask) -> None:

    @app.errorhandler(ResearchOSError)
    def handle_application_error(error: ResearchOSError):
        return error_response(
            error_type=error.__class__.__name__,
            message=error.message,
            status=error.status_code,
        )

    @app.errorhandler(ValidationError)
    def handle_validation_error(error: ValidationError):
        return error_response(
            error_type="ValidationError",
            message=error.messages,
            status=HTTPStatus.BAD_REQUEST,
        )