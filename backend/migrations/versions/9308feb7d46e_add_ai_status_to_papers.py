"""Add AI status to papers

Revision ID: 9308feb7d46e
Revises: ff2db3df7c42
Create Date: 2026-07-02 11:10:32.834292
"""

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "9308feb7d46e"
down_revision = "ff2db3df7c42"
branch_labels = None
depends_on = None


experiment_status = postgresql.ENUM(
    "DRAFT",
    "RUNNING",
    "COMPLETED",
    "ARCHIVED",
    name="experimentstatus",
    create_type=True,
)

ai_status = postgresql.ENUM(
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "FAILED",
    name="aistatus",
    create_type=True,
)


def upgrade():
    # Create enum types
    experiment_status.create(op.get_bind(), checkfirst=True)
    ai_status.create(op.get_bind(), checkfirst=True)

    # Convert existing experiment status column
    op.execute(
        """
        ALTER TABLE experiments
        ALTER COLUMN status
        TYPE experimentstatus
        USING status::experimentstatus
        """
    )

    # Add new columns to papers
    with op.batch_alter_table("papers") as batch_op:
        batch_op.add_column(
            sa.Column(
                "ai_status",
                ai_status,
                nullable=False,
                server_default="PENDING",
            )
        )

        batch_op.add_column(
            sa.Column(
                "processed_at",
                sa.DateTime(timezone=True),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "ai_error",
                sa.Text(),
                nullable=True,
            )
        )

    # Remove default after existing rows are populated
    op.alter_column("papers", "ai_status", server_default=None)


def downgrade():
    with op.batch_alter_table("papers") as batch_op:
        batch_op.drop_column("ai_error")
        batch_op.drop_column("processed_at")
        batch_op.drop_column("ai_status")

    op.execute(
        """
        ALTER TABLE experiments
        ALTER COLUMN status
        TYPE VARCHAR(30)
        USING status::text
        """
    )

    ai_status.drop(op.get_bind(), checkfirst=True)
    experiment_status.drop(op.get_bind(), checkfirst=True)