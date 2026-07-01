from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import Enum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.extensions import db
from app.models.enums import ExperimentStatus
from app.models.mixins import TimestampMixin, UUIDMixin

if TYPE_CHECKING:
    from app.models.project import Project


class Experiment(UUIDMixin, TimestampMixin, db.Model):
    __tablename__ = "experiments"

    project_id: Mapped[UUID] = mapped_column(
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    objective: Mapped[str] = mapped_column(
        Text,
        default="",
        nullable=False,
    )

    methodology: Mapped[str] = mapped_column(
        Text,
        default="",
        nullable=False,
    )

    results: Mapped[str] = mapped_column(
        Text,
        default="",
        nullable=False,
    )

    conclusion: Mapped[str] = mapped_column(
        Text,
        default="",
        nullable=False,
    )

    status: Mapped[ExperimentStatus] = mapped_column(
        Enum(ExperimentStatus),
        default=ExperimentStatus.DRAFT,
        nullable=False,
    )
    project: Mapped["Project"] = relationship(
        back_populates="experiments",
    )