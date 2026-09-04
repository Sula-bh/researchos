from http import HTTPStatus
from uuid import UUID

from flask import Blueprint, request

from app.auth import get_current_user
from app.responses import success_response
from app.schemas.project_schema import (
    ProjectCreateSchema,
    ProjectResponseSchema,
    ProjectUpdateSchema,
)
from app.services import project_service

project_bp = Blueprint(
    "projects",
    __name__,
    url_prefix="/api/projects",
)

project_create_schema = ProjectCreateSchema()
project_response_schema = ProjectResponseSchema()
project_update_schema = ProjectUpdateSchema()


@project_bp.post("")
def create_project():
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    data = project_create_schema.load(request.get_json())

    project = project_service.create_project(
        user_id=user.id,
        title=data["title"],
        description=data.get("description"),
    )

    return success_response(
        data=project_response_schema.dump(project),
        message="Project created successfully.",
        status=HTTPStatus.CREATED,
    )


@project_bp.get("")
def get_projects():
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    projects = project_service.get_projects(
        user_id=user.id,
    )

    return success_response(
        data=project_response_schema.dump(projects, many=True),
    )


@project_bp.get("/<uuid:project_id>")
def get_project(project_id: UUID):
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    project = project_service.get_project(
        project_id=project_id,
        user_id=user.id,
    )

    return success_response(
        data=project_response_schema.dump(project),
    )


@project_bp.patch("/<uuid:project_id>")
def update_project(project_id: UUID):
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    data = project_update_schema.load(request.get_json())

    project = project_service.update_project(
        project_id=project_id,
        user_id=user.id,
        title=data.get("title"),
        description=data.get("description"),
    )

    return success_response(
        data=project_response_schema.dump(project),
        message="Project updated successfully.",
    )


@project_bp.delete("/<uuid:project_id>")
def delete_project(project_id: UUID):
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    project_service.delete_project(
        project_id=project_id,
        user_id=user.id,
    )

    return success_response(
        message="Project deleted successfully.",
    )
