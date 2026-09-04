from http import HTTPStatus
from uuid import UUID

from flask import Blueprint, request

from app.auth import get_current_user
from app.responses import success_response
from app.schemas.experiment_schema import (
    ExperimentCreateSchema,
    ExperimentResponseSchema,
    ExperimentUpdateSchema,
)
from app.services import experiment_service

experiment_bp = Blueprint(
    "experiments",
    __name__,
    url_prefix="/api",
)

create_schema = ExperimentCreateSchema()
update_schema = ExperimentUpdateSchema()
response_schema = ExperimentResponseSchema()


@experiment_bp.post("/projects/<uuid:project_id>/experiments")
def create_experiment(project_id: UUID):
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    data = create_schema.load(request.get_json())

    experiment = experiment_service.create_experiment(
        project_id=project_id,
        user_id=user.id,
        title=data["title"],
        objective=data["objective"],
        methodology=data["methodology"],
        results=data["results"],
        conclusion=data["conclusion"],
        status=data["status"],
    )

    return success_response(
        data=response_schema.dump(experiment),
        message="Experiment created successfully.",
        status=HTTPStatus.CREATED,
    )


@experiment_bp.get("/projects/<uuid:project_id>/experiments")
def get_experiments(project_id: UUID):
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    experiments = experiment_service.get_experiments(
        project_id=project_id,
        user_id=user.id,
    )

    return success_response(
        data=response_schema.dump(experiments, many=True),
    )


@experiment_bp.get("/experiments/<uuid:experiment_id>")
def get_experiment(experiment_id: UUID):
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    experiment = experiment_service.get_experiment(
        experiment_id=experiment_id,
        user_id=user.id,
    )

    return success_response(
        data=response_schema.dump(experiment),
    )


@experiment_bp.patch("/experiments/<uuid:experiment_id>")
def update_experiment(experiment_id: UUID):
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    data = update_schema.load(request.get_json())

    experiment = experiment_service.update_experiment(
        experiment_id=experiment_id,
        user_id=user.id,
        title=data.get("title"),
        objective=data.get("objective"),
        methodology=data.get("methodology"),
        results=data.get("results"),
        conclusion=data.get("conclusion"),
        status=data.get("status"),
    )

    return success_response(
        data=response_schema.dump(experiment),
        message="Experiment updated successfully.",
    )


@experiment_bp.delete("/experiments/<uuid:experiment_id>")
def delete_experiment(experiment_id: UUID):
    user = get_current_user()

    if user is None:
        return {"error": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    experiment_service.delete_experiment(
        experiment_id=experiment_id,
        user_id=user.id,
    )

    return success_response(
        message="Experiment deleted successfully.",
    )