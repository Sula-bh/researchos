from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.extensions import db
from backend.app.models.mixins import TimestampMixin, UUIDMixin


class Project(UUIDMixin, TimestampMixin, db.Model):
    __tablename__ = "projects"

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    memory_dataset_id: Mapped[str | None] = mapped_column(
        String(255),
        unique=True,
        nullable=True,
    )
