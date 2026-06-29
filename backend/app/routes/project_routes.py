from flask import Blueprint

project_bp = Blueprint(
    "projects",
    __name__,
    url_prefix="/api/projects",
)