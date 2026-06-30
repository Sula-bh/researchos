from flask import Flask

from app.config import Config
from app.error_handlers import register_error_handlers
from app.extensions import cors, db, migrate
from app.routes.paper_routes import paper_bp
from app.routes.project_routes import project_bp


def register_extensions(app: Flask):
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)


def register_models():
    import app.models

def register_blueprints(app: Flask):
    app.register_blueprint(project_bp)
    app.register_blueprint(paper_bp, url_prefix="/api",)


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    app.config["UPLOAD_DIR"].mkdir(
        parents=True,
        exist_ok=True,
    )

    register_models()
    register_extensions(app)
    register_error_handlers(app)
    register_blueprints(app)

    @app.get("/")
    def home():
        return {"message": "ResearchOS API is running!"}

    return app
