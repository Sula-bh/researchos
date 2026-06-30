from uuid import UUID

from flask import Blueprint

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