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
    return Project.query.order_by(Project.created_at.desc()).all()