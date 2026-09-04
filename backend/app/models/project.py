from __future__ import annotations

import uuid
from typing import TYPE_CHECKING

from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.extensions import db
from app.models.mixins import TimestampMixin, UUIDMixin

if TYPE_CHECKING:
    from app.models.experiment import Experiment
    from app.models.note import Note
    from app.models.paper import Paper
    from app.models.user import User

class Project(UUIDMixin, TimestampMixin, db.Model):
    __tablename__ = "projects"

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        db.UUID(as_uuid=True),
        db.ForeignKey("users.id"),
        nullable=True,
        index=True,
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

    papers: Mapped[list[Paper]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan",
    )

    notes: Mapped[list[Note]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan",
    )

    experiments: Mapped[list[Experiment]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan",
    )

    user: Mapped[User] = relationship(
        back_populates="projects",
    )
