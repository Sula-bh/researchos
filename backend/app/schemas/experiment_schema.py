from app.models.enums import ExperimentStatus
from marshmallow import Schema, fields, validate


class ExperimentCreateSchema(Schema):
    title = fields.String(
        required=True,
        validate=validate.Length(min=1, max=255),
    )


class ExperimentUpdateSchema(Schema):
    title = fields.String(
        required=False,
        validate=validate.Length(min=1, max=255),
    )

    objective = fields.String(required=False)

    methodology = fields.String(required=False)

    results = fields.String(required=False)

    conclusion = fields.String(required=False)

    status = fields.String(
        required=False,
        validate=validate.OneOf(
            [status.value for status in ExperimentStatus]
        )
    )


class ExperimentResponseSchema(Schema):
    id = fields.UUID()

    project_id = fields.UUID()

    title = fields.String()

    objective = fields.String()

    methodology = fields.String()

    results = fields.String()

    conclusion = fields.String()

    status = fields.String()

    created_at = fields.DateTime()

    updated_at = fields.DateTime()