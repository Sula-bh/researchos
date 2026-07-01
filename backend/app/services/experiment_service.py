from uuid import UUID

from sqlalchemy import select

from app.exceptions.experiment import ExperimentNotFoundError
from app.exceptions.project import ProjectNotFoundError
from app.extensions import db
from app.models.experiment import Experiment
from app.models.project import Project


def create_experiment(
    project_id: UUID,
    title: str,
) -> Experiment:
    project = db.session.get(Project, project_id)

    if project is None:
        raise ProjectNotFoundError()

    experiment = Experiment(
        project_id=project_id,
        title=title,
    )

    db.session.add(experiment)
    db.session.commit()

    return experiment


def get_experiments(project_id: UUID) -> list[Experiment]:
    statement = (
        select(Experiment)
        .where(Experiment.project_id == project_id)
        .order_by(Experiment.updated_at.desc())
    )

    return db.session.scalars(statement).all()


def get_experiment(experiment_id: UUID) -> Experiment:
    experiment = db.session.get(Experiment, experiment_id)

    if experiment is None:
        raise ExperimentNotFoundError()

    return experiment


def update_experiment(
    experiment_id: UUID,
    **kwargs,
) -> Experiment:
    experiment = db.session.get(
        Experiment,
        experiment_id,
    )

    if experiment is None:
        raise ExperimentNotFoundError()

    for key, value in kwargs.items():
        if value is not None:
            setattr(experiment, key, value)

    db.session.commit()

    return experiment


def delete_experiment(
    experiment_id: UUID,
) -> None:
    experiment = db.session.get(
        Experiment,
        experiment_id,
    )

    if experiment is None:
        raise ExperimentNotFoundError()

    db.session.delete(experiment)
    db.session.commit()