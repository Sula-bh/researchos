from http import HTTPStatus
from uuid import UUID

from flask import Blueprint, request

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
    data = project_create_schema.load(request.get_json())

    project = project_service.create_project(
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
    projects = project_service.get_projects()

    return success_response(
        data=project_response_schema.dump(projects, many=True),
    )


@project_bp.get("/<uuid:project_id>")
def get_project(project_id: UUID):
    project = project_service.get_project(project_id)

    return success_response(
        data=project_response_schema.dump(project),
    )


@project_bp.patch("/<uuid:project_id>")
def update_project(project_id: UUID):
    data = project_update_schema.load(request.get_json())

    project = project_service.update_project(
        project_id=project_id,
        title=data.get("title"),
        description=data.get("description"),
    )

    return success_response(
        data=project_response_schema.dump(project),
        message="Project updated successfully.",
    )


@project_bp.delete("/<uuid:project_id>")
def delete_project(project_id: UUID):
    project_service.delete_project(project_id)

    return success_response(
        message="Project deleted successfully.",
    )
