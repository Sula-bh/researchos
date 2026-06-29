from flask import Flask
from sqlalchemy import text

from app import models
from app.config import Config
from app.extensions import db, migrate


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        db.session.execute(text("SELECT 1"))

    @app.get("/")
    def home():
        return {"message": "ResearchOS API is running!"}

    return app
