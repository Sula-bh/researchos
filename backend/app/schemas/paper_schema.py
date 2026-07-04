from marshmallow import Schema, fields


class PaperResponseSchema(Schema):
    id = fields.UUID(dump_only=True)

    project_id = fields.UUID()

    title = fields.String()

    authors = fields.String(allow_none=True)

    abstract = fields.String(allow_none=True)

    file_name = fields.String()

    storage_key = fields.String()

    ai_status = fields.String()

    ai_summary = fields.String(allow_none=True)

    ai_error = fields.String(allow_none=True)

    processed_at = fields.DateTime(allow_none=True)

    created_at = fields.DateTime()