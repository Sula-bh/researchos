import asyncio
import logging
from uuid import UUID

from flask import send_file
from sqlalchemy import select
from werkzeug.datastructures import FileStorage

from app.ai import knowledge_service
from app.ai.tasks.ingest_paper import ingest_paper
from app.exceptions.file import InvalidFileError
from app.exceptions.paper import PaperNotFoundError
from app.extensions import db
from app.models.paper import Paper
from app.queue import default_queue
from app.services.pdf_service import parse_pdf
from app.services.storage_service import (
    delete_file,
    file_exists,
    get_file_path,
    save_pdf,
)

logger = logging.getLogger(__name__)


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


def upload_paper(project_id: UUID, file: FileStorage) -> Paper:
    storage_key, file_name = save_pdf(
        str(project_id),
        file,
    )

    document = parse_pdf(storage_key)

    paper = Paper(
        project_id=project_id,
        title=document.title or file_name,
        authors=document.authors or None,
        abstract=document.abstract or None,
        file_name=file_name,
        storage_key=storage_key,
    )

    db.session.add(paper)
    db.session.commit()

    default_queue.enqueue(
        ingest_paper,
        paper.id,
        job_timeout="15m",
    )

    return paper


def delete_paper(paper_id: UUID) -> None:
    paper = get_paper(paper_id)

    dataset_name = knowledge_service.dataset_name(
        project_id=paper.project_id,
        paper_id=paper.id,
    )

    try:
        asyncio.run(
            knowledge_service.delete_dataset(
                dataset_name=dataset_name,
            )
        )
    except Exception:
        logger.exception(
            "Failed to delete Cognee dataset %s",
            dataset_name,
        )

    delete_file(paper.storage_key)

    db.session.delete(paper)
    db.session.commit()


def download_paper(paper_id: UUID):
    paper = get_paper(paper_id)

    if not file_exists(paper.storage_key):
        raise InvalidFileError("Paper file not found.")

    return send_file(
        get_file_path(paper.storage_key),
        mimetype="application/pdf",
        download_name=paper.file_name,
        as_attachment=False,
    )