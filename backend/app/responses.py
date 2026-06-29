from http import HTTPStatus

from flask import jsonify


def success_response(
    *,
    data=None,
    message: str | None = None,
    status: HTTPStatus = HTTPStatus.OK,
):
    return (
        jsonify(
            {
                "success": True,
                "message": message,
                "data": data,
            }
        ),
        status,
    )


def error_response(
    *,
    error_type: str,
    message,
    status: HTTPStatus,
):
    return (
        jsonify(
            {
                "success": False,
                "error": {
                    "type": error_type,
                    "message": message,
                    "status": status.value,
                },
            }
        ),
        status,
    )