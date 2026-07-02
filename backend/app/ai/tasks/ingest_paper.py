from __future__ import annotations

import asyncio
import logging
from uuid import UUID

from app import create_app
from app.ai import knowledge_service
from app.extensions import db
from app.models.paper import Paper

logger = logging.getLogger(__name__)


def ingest_paper(
    paper_id: UUID,
) -> None:
    app = create_app()

    with app.app_context():
        asyncio.run(
            _ingest(paper_id),
        )


async def _ingest(
    paper_id: UUID,
) -> None:
    paper = db.session.get(
        Paper,
        paper_id,
    )

    if paper is None:
        logger.warning(
            "Paper %s not found.",
            paper_id,
        )
        return

    await knowledge_service.ingest_paper(
        paper,
    )