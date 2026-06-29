from uuid import UUID

from sqlalchemy import select

from app.exceptions.project import ProjectNotFoundError
from app.extensions import db
from app.models.project import Project


def create_project(title: str, description: str | None = None) -> Project:
    project = Project(
        title=title,
        description=description,
    )

    db.session.add(project)
    db.session.commit()

    return project


def get_projects() -> list[Project]:
    statement = select(Project).order_by(Project.created_at.desc())

    return db.session.scalars(statement).all()


def get_project(project_id: UUID) -> Project:
    project = db.session.get(Project, project_id)

    if project is None:
        raise ProjectNotFoundError()

    return project


def update_project(
    project_id: UUID, title: str | None = None, description: str | None = None
) -> Project:
    project = db.session.get(Project, project_id)

    if project is None:
        raise ProjectNotFoundError()

    if title is not None:
        project.title = title

    if description is not None:
        project.description = description

    db.session.commit()

    return project
