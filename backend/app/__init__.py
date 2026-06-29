from flask import Flask

from app.config import Config
from app.extensions import db, migrate


def register_extensions(app: Flask):
    db.init_app(app)
    migrate.init_app(app, db)


def register_models():
    import app.models


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    register_extensions(app)
    register_models()

    @app.get("/")
    def home():
        return {"message": "ResearchOS API is running!"}

    return app
