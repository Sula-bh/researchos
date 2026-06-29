from marshmallow import Schema, fields, validate


class ProjectCreateSchema(Schema):
    title = fields.String(
        required=True,
        validate=validate.Length(min=1, max=255),
    )

    description = fields.String(
        required=False,
        allow_none=True,
    )


class ProjectResponseSchema(Schema):
    id = fields.UUID()

    title = fields.String()

    description = fields.String(allow_none=True)

    memory_dataset_id = fields.String(allow_none=True)
