from uuid import UUID

from sqlalchemy import select

from app.exceptions.project import ProjectNotFoundError
from app.extensions import db
from app.models.project import Project


def create_project(
    user_id: UUID,
    title: str,
    description: str | None = None,
) -> Project:
    project = Project(
        user_id=user_id,
        title=title,
        description=description,
    )

    db.session.add(project)
    db.session.commit()

    return project


def get_projects(user_id: UUID) -> list[Project]:
    statement = (
        select(Project)
        .where(Project.user_id == user_id)
        .order_by(Project.created_at.desc())
    )

    return db.session.scalars(statement).all()


def get_project(
    project_id: UUID,
    user_id: UUID,
) -> Project:
    statement = select(Project).where(
        Project.id == project_id,
        Project.user_id == user_id,
    )

    project = db.session.scalar(statement)

    if project is None:
        raise ProjectNotFoundError()

    return project


def update_project(
    project_id: UUID,
    user_id: UUID,
    title: str | None = None,
    description: str | None = None,
) -> Project:
    project = get_project(
        project_id=project_id,
        user_id=user_id,
    )

    if title is not None:
        project.title = title

    if description is not None:
        project.description = description

    db.session.commit()

    return project


def delete_project(
    project_id: UUID,
    user_id: UUID,
) -> None:
    project = get_project(
        project_id=project_id,
        user_id=user_id,
    )

    db.session.delete(project)
    db.session.commit()