from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import Enum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.extensions import db
from app.models.enums import AIStatus
from app.models.mixins import TimestampMixin, UUIDMixin

if TYPE_CHECKING:
    from app.models.project import Project


class Paper(UUIDMixin, TimestampMixin, db.Model):
    __tablename__ = "papers"

    project_id: Mapped[UUID] = mapped_column(
        ForeignKey("projects.id"),
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    authors: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    abstract: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    storage_key: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    project: Mapped[Project] = relationship(
        back_populates="papers",
    )

    ai_status: Mapped[AIStatus] = mapped_column(
        Enum(AIStatus),
        default=AIStatus.PENDING,
        nullable=False,
    )

    processed_at: Mapped[datetime | None] = mapped_column(
        db.DateTime(timezone=True),
        nullable=True,
    )

    ai_error: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )