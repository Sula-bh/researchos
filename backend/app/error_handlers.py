from flask import Flask, jsonify

from app.exceptions.base import ResearchOSError


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(ResearchOSError)
    def handle_application_error(error: ResearchOSError):
        return (
            jsonify(
                {
                    "error": {
                        "type": error.__class__.__name__,
                        "message": error.message,
                        "status": error.status_code.value,
                    }
                }
            ),
            error.status_code,
        )