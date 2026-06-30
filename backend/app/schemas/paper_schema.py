from marshmallow import Schema, fields


class PaperResponseSchema(Schema):
    id = fields.UUID(dump_only=True)

    project_id = fields.UUID()

    title = fields.String()

    authors = fields.String(allow_none=True)

    abstract = fields.String(allow_none=True)

    file_name = fields.String()

    storage_key = fields.String()

    created_at = fields.DateTime()