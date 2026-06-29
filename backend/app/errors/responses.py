from http import HTTPStatus

from flask import jsonify


def error_response(
    *,
    error_type: str,
    message: str | dict | list,
    status: HTTPStatus,
):
    return (
        jsonify(
            {
                "error": {
                    "type": error_type,
                    "message": message,
                    "status": status.value,
                }
            }
        ),
        status,
    )