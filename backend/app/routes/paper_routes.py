from http import HTTPStatus
from uuid import UUID

from flask import Blueprint, request

from app.exceptions.file import InvalidFileError
from app.responses import success_response
from app.schemas.paper_schema import PaperResponseSchema
from app.services import paper_service

paper_bp = Blueprint("papers", __name__)

paper_response_schema = PaperResponseSchema(many=True)
single_paper_schema = PaperResponseSchema()

@paper_bp.get("/projects/<uuid:project_id>/papers")
def get_papers(project_id: UUID):
    papers = paper_service.get_papers(project_id)

    return success_response(
        data=paper_response_schema.dump(papers),
    )

@paper_bp.get("/papers/<uuid:paper_id>")
def get_paper(paper_id: UUID):
    paper = paper_service.get_paper(paper_id)

    return success_response(
        data=single_paper_schema.dump(paper),
    )

@paper_bp.delete("/papers/<uuid:paper_id>")
def delete_paper(paper_id: UUID):
    paper_service.delete_paper(paper_id)

    return success_response(
        message="Paper deleted successfully.",
    )

@paper_bp.post("/projects/<uuid:project_id>/papers")
def upload_paper(project_id: UUID):

    file = request.files.get("file")

    if file is None:
        raise InvalidFileError("No file provided.")

    paper = paper_service.upload_paper(
        project_id,
        file,
    )

    return success_response(
        data=single_paper_schema.dump(paper),
        message="Paper uploaded successfully.",
        status=HTTPStatus.CREATED,
    )