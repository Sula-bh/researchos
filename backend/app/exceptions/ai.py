from app.exceptions.base import ResearchOSError


class AIError(ResearchOSError):
    """Base exception for AI-related errors."""


class AIIngestionError(AIError):
    """Raised when a document cannot be ingested."""


class AISearchError(AIError):
    """Raised when an AI search fails."""