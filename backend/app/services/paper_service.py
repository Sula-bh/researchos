from uuid import UUID

from sqlalchemy import select
from werkzeug.datastructures import FileStorage

from app.exceptions.paper import PaperNotFoundError
from app.extensions import db
from app.models.paper import Paper
from app.services.pdf_service import extract_metadata
from app.services.storage_service import save_pdf


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


def upload_paper(project_id: UUID, file: FileStorage) -> Paper:

    storage_key, file_name = save_pdf(
        str(project_id),
        file,
    )

    metadata = extract_metadata(storage_key)

    paper = Paper(
        project_id=project_id,
        title=metadata["title"] or file_name,
        authors=metadata["authors"] or None,
        abstract=None,
        file_name=file_name,
        storage_key=storage_key,
    )

    db.session.add(paper)
    db.session.commit()

    return paper
