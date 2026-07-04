from __future__ import annotations

from app.ai.services.knowledge_service import KnowledgeService
from app.exceptions.ai import AISearchError
from app.models.paper import Paper

knowledge_service = KnowledgeService()


class SummaryService:
    async def generate_summary(
        self,
        *,
        paper: Paper,
    ) -> str:
        """
        Generate an AI summary for a project's uploaded papers.

        This summary is generated immediately after ingestion and stored
        in the Paper model for fast retrieval later.
        """

        prompt = f"""
You are an expert research assistant.

Summarize the following paper only.

Paper title:
"{paper.title}"

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

Keep the summary concise, factual, and based only on the paper. Do not summarize any other uploaded papers.
"""
        dataset = knowledge_service.dataset_name(
            project_id=paper.project_id,
            paper_id=paper.id,
        )

        results = await knowledge_service.search(
            datasets=[dataset],
            query=prompt,
        )

        if not results:
            raise AISearchError(
                "Failed to generate AI summary.",
            )
        
        summary = knowledge_service.format_results(results)

        return summary