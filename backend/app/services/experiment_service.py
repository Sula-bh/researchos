from uuid import UUID

from sqlalchemy import select

from app.exceptions.experiment import ExperimentNotFoundError
from app.exceptions.project import ProjectNotFoundError
from app.extensions import db
from app.models.enums import ExperimentStatus
from app.models.experiment import Experiment
from app.models.project import Project


def create_experiment(
    project_id: UUID,
    user_id: UUID,
    title: str,
    objective: str = "",
    methodology: str = "",
    results: str = "",
    conclusion: str = "",
    status: ExperimentStatus = ExperimentStatus.DRAFT,
) -> Experiment:
    project = db.session.scalar(
        select(Project).where(
            Project.id == project_id,
            Project.user_id == user_id,
        )
    )

    if project is None:
        raise ProjectNotFoundError()

    experiment = Experiment(
        project_id=project_id,
        title=title,
        objective=objective,
        methodology=methodology,
        results=results,
        conclusion=conclusion,
        status=status,
    )

    db.session.add(experiment)
    db.session.commit()

    return experiment


def get_experiments(
    project_id: UUID,
    user_id: UUID,
) -> list[Experiment]:
    statement = (
        select(Experiment)
        .join(Project, Experiment.project_id == Project.id)
        .where(
            Experiment.project_id == project_id,
            Project.user_id == user_id,
        )
        .order_by(Experiment.updated_at.desc())
    )

    return db.session.scalars(statement).all()


def get_experiment(
    experiment_id: UUID,
    user_id: UUID,
) -> Experiment:
    statement = (
        select(Experiment)
        .join(Project, Experiment.project_id == Project.id)
        .where(
            Experiment.id == experiment_id,
            Project.user_id == user_id,
        )
    )

    experiment = db.session.scalar(statement)

    if experiment is None:
        raise ExperimentNotFoundError()

    return experiment


def update_experiment(
    experiment_id: UUID,
    user_id: UUID,
    **kwargs,
) -> Experiment:
    experiment = get_experiment(
        experiment_id=experiment_id,
        user_id=user_id,
    )

    for key, value in kwargs.items():
        if value is not None:
            setattr(experiment, key, value)

    db.session.commit()

    return experiment


def delete_experiment(
    experiment_id: UUID,
    user_id: UUID,
) -> None:
    experiment = get_experiment(
        experiment_id=experiment_id,
        user_id=user_id,
    )

    db.session.delete(experiment)
    db.session.commit()