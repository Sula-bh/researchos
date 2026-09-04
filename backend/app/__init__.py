from flask import Flask

from app.auth import get_current_user
from app.config import Config
from app.error_handlers import register_error_handlers
from app.extensions import cors, db, migrate
from app.routes.chat_routes import chat_bp
from app.routes.experiment_routes import experiment_bp
from app.routes.note_routes import note_bp
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
    app.register_blueprint(paper_bp)
    app.register_blueprint(note_bp)
    app.register_blueprint(experiment_bp)
    app.register_blueprint(chat_bp)

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

    @app.get("/api/auth/me")
    def auth_me():
        user = get_current_user()

        if user is None:
            return {"error": "Unauthorized"}, 401

        return {
            "message": "Authenticated successfully",
            "user_id": str(user.id),
            "clerk_user_id": user.clerk_user_id,
        }, 200

    return app
