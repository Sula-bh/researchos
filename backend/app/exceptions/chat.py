from http import HTTPStatus

from app.exceptions.base import ResearchOSError


class ChatError(ResearchOSError):
    status_code = HTTPStatus.BAD_REQUEST


class EmptyMessageError(ChatError):
    message = "Question cannot be empty."


class NoProcessedPapersError(ChatError):
    message = (
        "No processed papers are available for this project. "
        "Please wait until AI processing is complete."
    )


class NoAnswerFoundError(ChatError):
    message = (
        "I couldn't find enough information in the uploaded papers to answer your question."
    )