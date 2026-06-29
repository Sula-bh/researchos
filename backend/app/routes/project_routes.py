from http import HTTPStatus

from flask import Blueprint, request

from app.responses import success_response
from app.schemas.project_schema import ProjectCreateSchema, ProjectResponseSchema
from app.services.project_service import create_project

project_bp = Blueprint(
    "projects",
    __name__,
    url_prefix="/api/projects",
)

project_create_schema = ProjectCreateSchema()
project_response_schema = ProjectResponseSchema()


@project_bp.post("")
def create():
    data = project_create_schema.load(request.get_json())

    project = create_project(
        title=data["title"],
        description=data.get("description"),
    )

    return success_response(
        data=project_response_schema.dump(project),
        message="Project created successfully.",
        status=HTTPStatus.CREATED,
    )
