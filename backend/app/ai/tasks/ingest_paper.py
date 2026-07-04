from __future__ import annotations

import asyncio
import logging
from uuid import UUID

from app.ai import knowledge_service

logger = logging.getLogger(__name__)


def ingest_paper(
    paper_id: UUID,
) -> None:
    """
    Entry point for the RQ worker.
    """
    asyncio.run(
        _ingest(paper_id),
    )


async def _ingest(
    paper_id: UUID,
) -> None:
    try:
        await knowledge_service.ingest_paper(
            paper_id=paper_id,
        )

        logger.info(
            "Successfully ingested paper %s.",
            paper_id,
        )

    except Exception:
        logger.exception(
            "Failed to ingest paper %s.",
            paper_id,
        )
        raise