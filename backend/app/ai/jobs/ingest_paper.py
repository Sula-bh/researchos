from __future__ import annotations

import asyncio
import logging
import threading
from uuid import UUID

from app.ai import knowledge_service
from app.extensions import db
from app.models.paper import Paper
from flask import Flask

logger = logging.getLogger(__name__)


def submit_ingest_paper(
    app: Flask,
    paper_id: UUID,
) -> None:
    thread = threading.Thread(
        target=_run_job,
        args=(app, paper_id),
        daemon=True,
        name=f"paper-ingest-{paper_id}",
    )

    thread.start()


def _run_job(
    app: Flask,
    paper_id: UUID,
) -> None:
    with app.app_context():
        asyncio.run(_ingest_paper(paper_id))


async def _ingest_paper(
    paper_id: UUID,
) -> None:
    paper = db.session.get(Paper, paper_id)

    if paper is None:
        logger.warning(
            "Paper %s not found for ingestion.",
            paper_id,
        )
        return

    await knowledge_service.ingest_paper(paper)