class ResearchOSError(Exception):
    """Base exception for all application errors."""

    status_code = 500

    message = "An unexpected error occurred."

    def __init__(self, message: str | None = None):
        if message:
            self.message = message

        super().__init__(self.message)