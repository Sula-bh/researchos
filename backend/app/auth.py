import os
from typing import Any, cast

from clerk_backend_api import Clerk
from clerk_backend_api.security.types import AuthenticateRequestOptions
from flask import request

from app.extensions import db
from app.models.user import User

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

    payload = cast(dict[str, Any], request_state.payload)
    clerk_user_id = payload.get("sub")

    if not clerk_user_id:
        return None

    user = User.query.filter_by(
        clerk_user_id=clerk_user_id
    ).first()

    if user is None:
        user = User()
        user.clerk_user_id = clerk_user_id

        db.session.add(user)
        db.session.commit()

    return user