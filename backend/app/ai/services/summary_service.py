from __future__ import annotations

from uuid import UUID

from app.ai.services.knowledge_service import KnowledgeService
from app.exceptions.ai import AISearchError

knowledge_service = KnowledgeService()


class SummaryService:
    async def generate_summary(
        self,
        *,
        project_id: UUID,
    ) -> str:
        """
        Generate an AI summary for a project's uploaded papers.

        This summary is generated immediately after ingestion and stored
        in the Paper model for fast retrieval later.
        """

        prompt = """
You are an expert research assistant.

Generate a concise markdown summary of the uploaded research paper.

Structure your response using these headings:

# Overview

A short overview of the paper.

# Key Contributions

- Bullet points

# Methodology

Describe the methods or models proposed.

# Main Findings

Summarize the important results.

# Limitations

Mention any limitations or challenges discussed.

Keep the summary concise, factual, and based only on the paper.
"""
        results = await knowledge_service.search(
            project_id=project_id, 
            query=prompt
        )

        if not results:
            raise AISearchError(
                "Failed to generate AI summary.",
            )
        
        summary = knowledge_service.format_results(results)

        return summary