import os
from typing import Any, cast

from clerk_backend_api import Clerk
from clerk_backend_api.security.types import AuthenticateRequestOptions
from flask import request

clerk = Clerk(
    bearer_auth=os.getenv("CLERK_SECRET_KEY")
)


def get_current_user():
    request_state = clerk.authenticate_request(
        cast(Any, request),
        AuthenticateRequestOptions(
            authorized_parties=["http://localhost:5173"]
        )
    )

    if not request_state.is_signed_in:
        return None

    return request_state.payload