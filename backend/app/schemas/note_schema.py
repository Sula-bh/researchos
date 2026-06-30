from marshmallow import Schema, fields, validate


class NoteCreateSchema(Schema):
    title = fields.String(
        required=True,
        validate=validate.Length(min=1, max=255),
    )

    content = fields.String(
        required=True,
        validate=validate.Length(min=1),
    )


class NoteUpdateSchema(Schema):
    title = fields.String(
        required=False,
        validate=validate.Length(min=1, max=255),
    )

    content = fields.String(
        required=False,
        validate=validate.Length(min=1),
    )


class NoteResponseSchema(Schema):
    id = fields.UUID()

    project_id = fields.UUID()

    title = fields.String()

    content = fields.String()

    created_at = fields.DateTime()

    updated_at = fields.DateTime()