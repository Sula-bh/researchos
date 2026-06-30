from uuid import UUID

from sqlalchemy import select

from app.exceptions.paper import PaperNotFoundError
from app.extensions import db
from app.models.paper import Paper


def get_papers(project_id: UUID) -> list[Paper]:
    statement = (
        select(Paper)
        .where(Paper.project_id == project_id)
        .order_by(Paper.created_at.desc())
    )

    return db.session.scalars(statement).all()


def get_paper(paper_id: UUID) -> Paper:
    paper = db.session.get(Paper, paper_id)

    if paper is None:
        raise PaperNotFoundError()

    return paper


def delete_paper(paper_id: UUID) -> None:
    paper = get_paper(paper_id)

    db.session.delete(paper)
    db.session.commit()